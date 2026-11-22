import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createPartnerHandler } from "../lib/partners/handler";
import { PartnerEmailUnavailable, PARTNER_NOTIFICATION_RECIPIENT } from "../lib/partners/email";
import { preparePartnerAttempt } from "../lib/partners/client-submission";
import type { PartnerApplication } from "../lib/partners/validation";

const values: PartnerApplication = {
 requestId:randomUUID(),fullName:"QA Applicant",email:"qa@example.test",businessName:"QA Creator",
 country:"Pakistan",partnerType:"Individual creator",profileUrl:"https://example.test/profile",phone:"",
 audienceCountries:["Pakistan","India"],audienceRange:"Not sure yet",introduction:"I share useful guides for applicants.",experience:"",
 privacy:true,marketing:false,website:"",
};
const request=(data:unknown=values,ip="192.0.2.1",origin="https://visaprepper.com")=>new Request("https://visaprepper.com/api/partners",{
 method:"POST",headers:{Origin:origin,"Content-Type":"application/json","x-forwarded-for":ip},body:JSON.stringify(data),
});
const quiet=()=>{};

test("recipient remains the required Gmail inbox independent of the authenticated sender",()=>{
 assert.equal(PARTNER_NOTIFICATION_RECIPIENT,"visaprepper@gmail.com");
});
test("simultaneous requests and repeat clicks send once, with accepted receipts only after the provider resolves",async()=>{
 let accept!:()=>void;const wait=new Promise<void>(r=>{accept=r;});let sends=0;
 const handler=createPartnerHandler({configure:quiet,log:quiet,send:async data=>{sends++;await wait;return{id:data.requestId,sent:true};}});
 const first=handler(request());
 // Let request parsing reserve the send before issuing the competing POST.
 while(sends===0)await new Promise(r=>setImmediate(r));
 const duplicate=await handler(request({...values,requestId:randomUUID()}));
 assert.equal(duplicate.status,409);assert.equal((await duplicate.json()).retryable,true);assert.equal(sends,1);
 accept();const result=await first;assert.equal(result.status,201);assert.equal((await result.json()).status,"accepted");
 const replay=await handler(request());assert.equal(replay.status,200);const receipt=await replay.json();
 assert.equal(receipt.status,"accepted");assert.ok(!Number.isNaN(Date.parse(receipt.acceptedAt)));assert.equal(sends,1);
 const sameContentNewId=await handler(request({...values,requestId:randomUUID(),audienceCountries:["India","Pakistan"]}));
 assert.equal(sameContentNewId.status,200);assert.equal(sends,1);
});
test("a reused reference cannot silently send different answers",async()=>{
 let sends=0;const handler=createPartnerHandler({configure:quiet,log:quiet,send:async data=>{sends++;return{id:data.requestId,sent:true};}});
 await handler(request());const conflict=await handler(request({...values,businessName:"Different business"}));
 assert.equal(conflict.status,409);assert.equal((await conflict.json()).retryable,false);assert.equal(sends,1);
});
test("explicit SMTP rejection can be retried; uncertain acceptance never automatically resends",async()=>{
 for(const safeToRetry of [true,false]){
  let sends=0;const logs:unknown[]=[];
  const handler=createPartnerHandler({configure:quiet,log:r=>logs.push(r),send:async data=>{
   sends++;if(sends===1)throw new PartnerEmailUnavailable(safeToRetry?"gmail_rejected":"gmail_timeout",safeToRetry,450);
   return{id:data.requestId,sent:true};
  }});
  const first=await handler(request());assert.equal(first.status,503);assert.equal((await first.json()).retryable,safeToRetry);
  const second=await handler(request());assert.equal(second.status,safeToRetry?201:409);assert.equal(sends,safeToRetry?2:1);
  const serialized=JSON.stringify(logs);for(const privateValue of [values.fullName,values.email,values.introduction])assert.ok(!serialized.includes(privateValue));
 }
});
test("validation, honeypot, origin, size and rate guards prevent mail calls",async()=>{
 let sends=0;const handler=createPartnerHandler({configure:quiet,log:quiet,send:async data=>{sends++;return{id:data.requestId,sent:true};}});
 assert.equal((await handler(request(values,"192.0.2.1","https://unrelated.example"))).status,403);
 for(const data of [{...values,privacy:false},{...values,website:"spam"},{...values,email:"invalid"}])assert.equal((await handler(request(data))).status,400);
 assert.equal((await handler(request({...values,introduction:"x".repeat(17000)}))).status,413);
 for(let i=0;i<6;i++)await handler(request({...values,website:"spam"}));
 assert.equal((await handler(request())).status,429);assert.equal(sends,0);
});
test("unconfigured Gmail never claims provider acceptance or logs credentials",async()=>{
 const records:unknown[]=[];let sends=0;
 const handler=createPartnerHandler({configure:()=>{throw new PartnerEmailUnavailable("gmail_configuration_missing",true);},log:r=>records.push(r),send:async()=>{sends++;throw new Error("Should never send");}});
 const response=await handler(request());assert.equal(response.status,503);const body=await response.json();
 assert.equal(body.retryable,true);assert.ok(!("status" in body));assert.equal(sends,0);
 assert.ok(JSON.stringify(records).includes("gmail_configuration_missing"));
});
test("browser retries reuse a submission ID while changes create a new attempt; uncertain attempts stay blocked",async()=>{
 const first=await preparePartnerAttempt({email:values.email,introduction:values.introduction},null);
 assert.equal((await preparePartnerAttempt({email:values.email,introduction:values.introduction},first)).id,first.id);
 first.blocked=true;assert.equal((await preparePartnerAttempt({email:values.email,introduction:values.introduction},first)).blocked,true);
 const changed=await preparePartnerAttempt({email:values.email,introduction:"A changed application"},first);
 assert.notEqual(changed.id,first.id);assert.equal(changed.blocked,undefined);
 assert.ok(!JSON.stringify(first).includes(values.email));
});

test("accepted browser receipts survive retry identity without storing application answers",async()=>{
 const first=await preparePartnerAttempt({email:values.email},null);
 first.accepted=true;first.reference=values.requestId;
 const again=await preparePartnerAttempt({email:values.email},first);
 assert.equal(again.accepted,true);assert.equal(again.reference,values.requestId);
 assert.ok(!JSON.stringify(again).includes(values.email));
});

test("accepted content aliases stay bound to the original payload",async()=>{
 let sends=0;const handler=createPartnerHandler({configure:quiet,log:quiet,send:async data=>{sends++;return{id:data.requestId,sent:true};}});
 await handler(request());const alias={...values,requestId:randomUUID()};
 assert.equal((await handler(request(alias))).status,200);
 assert.equal((await handler(request({...alias,businessName:"Changed"}))).status,409);
 assert.equal(sends,1);
});

test("same-origin local requests survive internal routing, while mismatched or insecure public origins are rejected",async()=>{
 const handler=createPartnerHandler({configure:quiet,log:quiet});
 const call=(origin:string,host:string)=>handler(new Request("http://localhost:3016/api/partners",{method:"POST",headers:{Origin:origin,Host:host,"Content-Type":"application/json"},body:"{}"}));
 assert.equal((await call("http://127.0.0.1:3016","127.0.0.1:3016")).status,400);
 assert.equal((await call("https://visaprepper.com","visaprepper.com")).status,400);
 assert.equal((await call("https://unrelated.example","visaprepper.com")).status,403);
 assert.equal((await call("http://visaprepper.com","visaprepper.com")).status,403);
 assert.equal((await call("null","visaprepper.com")).status,403);
});
