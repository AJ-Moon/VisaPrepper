import test from "node:test";
import assert from "node:assert/strict";
import { matchesCompleteOffer, getCheckoutReady } from "../lib/config/live-offering";
import { COMPLETE_OFFER } from "../lib/config/offer";
import { PLANS } from "../lib/config/offering";
import { APPROVED_TESTIMONIALS, PREPARATION_SURVEY } from "../lib/content/testimonials";
import { partnerApplicationSchema } from "../lib/partners/validation";
import { savePartnerApplication } from "../lib/partners/service";

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
test("unconfigured partner storage never reports success or sends a request",async()=>{
 let calls=0;
 const transport=(async()=>{calls++;throw new Error("Should not call");}) as typeof fetch;
 await assert.rejects(()=>savePartnerApplication(partnerApplicationSchema.parse(valid),transport,{} as NodeJS.ProcessEnv));
 assert.equal(calls,0);
});
test("partner adapter requires persisted ID, timestamp, pending status and stored=true",async()=>{
 const data=partnerApplicationSchema.parse(valid);
 const env:NodeJS.ProcessEnv={NODE_ENV:"test",PARTNER_SUBMISSION_URL:"https://example.invalid/partners",PARTNER_SUBMISSION_TOKEN:"synthetic-test-token"};
 const saved={id:valid.requestId,created_at:"2026-09-20T00:00:00Z",status:"pending",stored:true};
 let observed:RequestInit|undefined;
 const transport=(async(_url:unknown,init?:RequestInit)=>{observed=init;return Response.json(saved);})as typeof fetch;
 assert.deepEqual(await savePartnerApplication(data,transport,env),saved);
 assert.equal(new Headers(observed?.headers).get("Idempotency-Key"),valid.requestId);
 assert.equal(JSON.parse(String(observed?.body)).privacyVersion,"2026-09-20");
 // A repeated request uses the same key; durable deduplication belongs to the backend.
 await savePartnerApplication(data,transport,env);
 assert.equal(new Headers(observed?.headers).get("Idempotency-Key"),valid.requestId);
 for(const payload of [{}, {...saved,stored:false},{...saved,status:"approved"},{...saved,id:"not-an-id"},{...saved,created_at:"today"}]){
  await assert.rejects(()=>savePartnerApplication(data,(async()=>Response.json(payload))as typeof fetch,env));
 }
 await assert.rejects(()=>savePartnerApplication(data,(async()=>Response.json({},{status:503}))as typeof fetch,env));
});
