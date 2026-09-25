import test from "node:test";
import assert from "node:assert/strict";
import { matchesCompleteOffer, getCheckoutReady } from "../lib/config/live-offering";
import { COMPLETE_OFFER } from "../lib/config/offer";
import { PLANS } from "../lib/config/offering";
import { APPROVED_TESTIMONIALS, PREPARATION_SURVEY } from "../lib/content/testimonials";
import { partnerApplicationSchema } from "../lib/partners/validation";
import { sendPartnerApplicationEmail } from "../lib/partners/email";

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
test("partner email adapter sends validated contact and social details",async()=>{
 const data=partnerApplicationSchema.parse(valid);
 const accepted={success:"true",message:"accepted"};
 let observedUrl:unknown;
 let observed:RequestInit|undefined;
 const transport=(async(url:unknown,init?:RequestInit)=>{observedUrl=url;observed=init;return Response.json(accepted);})as typeof fetch;
 assert.deepEqual(await sendPartnerApplicationEmail(data,transport),{id:valid.requestId,sent:true});
 assert.match(String(observedUrl),/^https:\/\/formsubmit\.co\/ajax\//);
 const payload=JSON.parse(String(observed?.body));
 assert.equal(payload.email,valid.email);
 assert.equal(payload.socialProfile,valid.profileUrl);
 assert.equal(payload.phone,valid.phone);
 assert.equal(payload.audienceCountries,"Pakistan, India");
 assert.equal(payload._replyto,valid.email);
 assert.equal(new Headers(observed?.headers).get("Origin"),"https://visaprepper.com");
 assert.equal(new Headers(observed?.headers).get("Referer"),"https://visaprepper.com/partners/apply");
 for(const response of [Response.json({}, {status:200}),Response.json({success:false},{status:200}),Response.json({success:true},{status:503})]){
  await assert.rejects(()=>sendPartnerApplicationEmail(data,(async()=>response)as typeof fetch));
 }
});
