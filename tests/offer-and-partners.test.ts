import test, { type TestContext } from "node:test";
import nodemailer, { type SendMailOptions } from "nodemailer";
import assert from "node:assert/strict";
import { matchesCompleteOffer, getCheckoutReady } from "../lib/config/live-offering";
import { COMPLETE_OFFER } from "../lib/config/offer";
import { PLANS } from "../lib/config/offering";
import { APPROVED_TESTIMONIALS, PREPARATION_SURVEY } from "../lib/content/testimonials";
import { partnerApplicationSchema } from "../lib/partners/validation";
import { sendPartnerApplicationEmail } from "../lib/partners/email";
import { createPartnerHandler } from "../lib/partners/handler";

const offer = {checkout_available:true,packages:{[COMPLETE_OFFER.id]:{enabled:true,price_cents:4400,interviews:6,documents:10,validity_days:90,currency:"USD"}}};
const valid = {requestId:"fdf23d7a-716e-49cb-a061-2323ab56cf80",fullName:"Test Applicant",email:"test@example.test",businessName:"Test Creator",country:"Pakistan",partnerType:"Individual creator",profileUrl:"https://example.test/profile",phone:"+92 300 1234567",audienceCountries:["Pakistan","India"],audienceRange:"Not sure yet",introduction:"I share original preparation guides for applicants.",experience:"",privacy:true,marketing:false,website:""};

test("only the approved free and complete package are advertised",()=>{
 assert.deepEqual(PLANS.map(p=>[p.price,p.interviews,p.checks]),[[0,0,1],[44,6,10]]);
 assert.equal(COMPLETE_OFFER.validityDays,90);
});
test("checkout requires every confirmed entitlement, currency and availability",()=>{
 assert.equal(matchesCompleteOffer(offer),true);
 for(const [key,value] of Object.entries({price_cents:3500,interviews:8,documents:null,validity_days:undefined,currency:"PKR",enabled:false})){
  assert.equal(matchesCompleteOffer({...offer,packages:{[COMPLETE_OFFER.id]:{...offer.packages[COMPLETE_OFFER.id],[key]:value}}}),false,key);
 }
 for(const data of [null,[],{},{"checkout_available":true,packages:{plus:{enabled:true,price_cents:3500}}},{...offer,checkout_available:false}])assert.equal(matchesCompleteOffer(data),false);
});
test("checkout is off without an explicit release switch",async()=>{
 const before=process.env.COMPLETE_OFFER_CHECKOUT_ENABLED;
 delete process.env.COMPLETE_OFFER_CHECKOUT_ENABLED;
 try{assert.equal(await getCheckoutReady(),false);}finally{if(before!==undefined)process.env.COMPLETE_OFFER_CHECKOUT_ENABLED=before;}
});
test("30 owner-confirmed testimonials alternate destinations across the loop",()=>{
 assert.equal(APPROVED_TESTIMONIALS.length,30);
 assert.equal(new Set(APPROVED_TESTIMONIALS.map(s=>s.id)).size,30);
 assert.equal(new Set(APPROVED_TESTIMONIALS.map(s=>s.destination)).size,5);
 assert.equal(new Set(APPROVED_TESTIMONIALS.map(s=>s.country)).size,3);
 APPROVED_TESTIMONIALS.forEach((review,index)=>assert.notEqual(review.destination,APPROVED_TESTIMONIALS[(index+1)%30].destination));
 assert.ok(APPROVED_TESTIMONIALS.every(s=>s.quote.length>40&&!('rating' in s)));
 assert.equal(PREPARATION_SURVEY,null);
});
test("partner fields accept a creator, optional phone/experience and unsure audience",()=>{
 assert.equal(partnerApplicationSchema.safeParse(valid).success,true);
 assert.equal(partnerApplicationSchema.safeParse({...valid,phone:"",experience:""}).success,true);
 assert.equal(partnerApplicationSchema.parse({...valid,email:"TEST@example.test"}).email,"test@example.test");
});
test("invalid partner inputs reject without throwing or accepting HTML",()=>{
 const cases = {email:"invalid",fullName:"<script>bad</script>",profileUrl:"not-a-url",privacy:false,audienceCountries:[],introduction:"short",phone:"03001234567",website:"spam",requestId:"bad",experience:"x".repeat(1501)};
 for(const [key,value]of Object.entries(cases))assert.equal(partnerApplicationSchema.safeParse({...valid,[key]:value}).success,false,key);
 for(const profileUrl of ["javascript:alert(1)","http://127.0.0.1","http://192.168.1.1","http://172.16.0.1","https://user:pass@example.test"])assert.equal(partnerApplicationSchema.safeParse({...valid,profileUrl}).success,false,profileUrl);
 assert.equal(partnerApplicationSchema.safeParse({...valid,role:"admin"}).success,false);
});
function useTestGmail(t: TestContext) {
  const previousUser = process.env.GMAIL_USER;
  const previousPassword = process.env.GMAIL_APP_PASSWORD;
  process.env.GMAIL_USER = "sender@gmail.com";
  process.env.GMAIL_APP_PASSWORD = "test app password only";
  t.after(() => {
    if (previousUser === undefined) delete process.env.GMAIL_USER;
    else process.env.GMAIL_USER = previousUser;
    if (previousPassword === undefined) delete process.env.GMAIL_APP_PASSWORD;
    else process.env.GMAIL_APP_PASSWORD = previousPassword;
  });
}

test("Gmail sends the full partner application to the fixed owner inbox with a safe reply address", async (t) => {
  useTestGmail(t);
  let observedMessage: SendMailOptions | undefined;
  let observedOptions: unknown;
  t.mock.method(nodemailer, "createTransport", (options: unknown) => {
    observedOptions = options;
    return {
      sendMail: async (message: SendMailOptions) => {
        observedMessage = message;
        return { accepted: ["visaprepper@gmail.com"], rejected: [] };
      },
    } as unknown as ReturnType<typeof nodemailer.createTransport>;
  });

  const data = partnerApplicationSchema.parse(valid);
  assert.deepEqual(await sendPartnerApplicationEmail(data, "2026-11-17T10:00:00.000Z"), { id: valid.requestId, sent: true });
  assert.equal(observedMessage?.messageId, `<partner-${valid.requestId}@visaprepper.com>`);
  assert.deepEqual(observedMessage?.from, { name: "VisaPrepper", address: "sender@gmail.com" });
  assert.equal(observedMessage?.to, "visaprepper@gmail.com");
  assert.deepEqual(observedMessage?.replyTo, { name: valid.fullName, address: valid.email });
  const body = String(observedMessage?.text);
  for (const value of [
    valid.requestId, valid.fullName, valid.email, valid.businessName, valid.country,
    valid.partnerType, valid.profileUrl, valid.phone, "Pakistan, India",
    valid.audienceRange, valid.introduction, "Not provided",
    "Privacy acknowledgement: Yes", "Marketing updates: No", "Submitted at (UTC): 2026-11-17T10:00:00.000Z",
  ]) assert.ok(body.includes(value), value);
  assert.equal(observedMessage?.html, undefined);
  assert.deepEqual(observedOptions, {
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: "sender@gmail.com", pass: "testapppasswordonly" },
    connectionTimeout: 8_000, greetingTimeout: 8_000, socketTimeout: 15_000, dnsTimeout: 5_000,
    tls: { minVersion: "TLSv1.2", servername: "smtp.gmail.com" },
    disableFileAccess: true, disableUrlAccess: true,
  });
});

test("Gmail configuration fails safely before SMTP when credentials are missing", async (t) => {
  useTestGmail(t);
  let connected = false;
  t.mock.method(nodemailer, "createTransport", () => {
    connected = true;
    throw new Error("Unexpected SMTP connection");
  });
  const data = partnerApplicationSchema.parse(valid);
  for (const [user, password] of [["", ""], ["sender@gmail.com", ""], ["", "test-only"]]) {
    process.env.GMAIL_USER = user;
    process.env.GMAIL_APP_PASSWORD = password;
    await assert.rejects(sendPartnerApplicationEmail(data), /gmail_configuration_missing/);
  }
  assert.equal(connected, false);
});

test("partner endpoint confirms only Gmail acceptance and logs no private payload or credentials", async (t) => {
  useTestGmail(t);
  let outcome: "accepted" | "rejected" | "auth" | "timeout" = "accepted";
  let sends = 0;
  t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async () => {
      sends++;
      if (outcome === "auth" || outcome === "timeout") {
        throw Object.assign(new Error("Private SMTP response with testapppasswordonly"), {
          code: outcome === "auth" ? "EAUTH" : "ETIMEDOUT",
        });
      }
      return { accepted: outcome === "accepted" ? ["visaprepper@gmail.com"] : [] };
    },
  }) as unknown as ReturnType<typeof nodemailer.createTransport>);
  const warnings: unknown[][] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => warnings.push(args));
  const request = (origin = "https://visaprepper.com") => new Request("https://visaprepper.com/api/partners", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(valid),
  });

  const accepted = await createPartnerHandler()(request());
  assert.equal(accepted.status, 201);
  assert.equal((await accepted.json()).id, valid.requestId);
  assert.equal(accepted.headers.get("Cache-Control"), "no-store");

  for (const failure of ["rejected", "auth", "timeout"] as const) {
    outcome = failure;
    const rejected = await createPartnerHandler()(request());
    assert.equal(rejected.status, 503);
    assert.match((await rejected.json()).error, /Your answers are still here/);
  }
  const failures = warnings.map(w => w[1] as {event:string;code:string}).filter(w => w.event === "partner_email_failed");
  assert.equal(failures.length, 3);
  assert.deepEqual(failures.map(w => w.code), ["gmail_recipient_not_accepted", "gmail_authentication_failed", "gmail_timeout"]);
  const logText = JSON.stringify(warnings);
  for (const privateValue of [valid.email, valid.fullName, valid.introduction, "testapppasswordonly"]) {
    assert.ok(!logText.includes(privateValue));
  }

  const before = sends;
  assert.equal((await createPartnerHandler()(request("https://example.test"))).status, 403);
  assert.equal(sends, before);
});
