"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AUDIENCE_COUNTRIES, AUDIENCE_RANGES, PARTNER_TYPES } from "@/lib/partners/validation";
import { preparePartnerAttempt, readPartnerAttempt, savePartnerAttempt, type PartnerAttempt } from "@/lib/partners/client-submission";
export function PartnerForm() {
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[fields,setFields]=useState<Record<string,string[] | undefined>>({}),[success,setSuccess]=useState(false);
 const [reference,setReference]=useState(""),[canRetry,setCanRetry]=useState(true);
 const inFlight=useRef(false),attempt=useRef<PartnerAttempt | null>(null),errorElement=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(error)errorElement.current?.focus();},[error]);
 async function submit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if(inFlight.current || success || !canRetry)return;
  inFlight.current=true;setError("");setFields({});setBusy(true);
  const form=event.currentTarget;
  try {
   const data=new FormData(form);
   const values={fullName:String(data.get("fullName")??"").trim(),email:String(data.get("email")??"").trim().toLowerCase(),businessName:String(data.get("businessName")??"").trim(),country:String(data.get("country")??"").trim(),partnerType:data.get("partnerType"),profileUrl:String(data.get("profileUrl")??"").trim(),phone:String(data.get("phone")??"").trim(),audienceCountries:data.getAll("audienceCountries"),audienceRange:data.get("audienceRange"),introduction:String(data.get("introduction")??"").trim(),experience:String(data.get("experience")??"").trim(),privacy:data.get("privacy")==="on",marketing:data.get("marketing")==="on",website:data.get("website")};
   attempt.current=await preparePartnerAttempt(values,attempt.current??readPartnerAttempt());
   savePartnerAttempt(attempt.current);setReference(attempt.current.reference??attempt.current.id);
   if(attempt.current.accepted){setSuccess(true);form.reset();return;}
   if(attempt.current.blocked){setCanRetry(false);setError("We could not confirm delivery for this submission. Your answers are still here. Please contact visaprepper@gmail.com with the reference below before submitting again.");return;}
   let response:Response;
   let result:{id?:string;reference?:string;status?:string;error?:string;retryable?:boolean;fields?:Record<string,string[]>};
   try {
    response=await fetch("/api/partners",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:attempt.current.id,...values})});
    const body:unknown=await response.json();
    if(!body || typeof body!=="object" || Array.isArray(body))throw new Error("Invalid delivery response");
    result=body;
   }catch{
    attempt.current.blocked=true;savePartnerAttempt(attempt.current);setCanRetry(false);
    setError("The connection ended before we could confirm delivery. Your answers are still here. Please contact visaprepper@gmail.com with this reference before submitting again.");return;
   }
   setReference(result.reference??attempt.current.id);
   if(!response.ok){
    setFields(result.fields??{});
    if(result.retryable===false){attempt.current.blocked=true;savePartnerAttempt(attempt.current);setCanRetry(false);}
    setError(result.error??"We could not send your application. Your answers are still here. Please try again later.");return;
   }
   if(result.status!=="accepted" || result.id!==attempt.current.id){
    attempt.current.blocked=true;savePartnerAttempt(attempt.current);setCanRetry(false);
    setError("We could not confirm delivery. Your answers are still here. Please contact visaprepper@gmail.com with this reference before submitting again.");return;
   }
   attempt.current.accepted=true;attempt.current.reference=result.reference??attempt.current.id;savePartnerAttempt(attempt.current);
   setSuccess(true);form.reset();
  }catch{setError("We could not prepare your submission. Your answers are still here. Please try again or email visaprepper@gmail.com.");}
  finally{inFlight.current=false;setBusy(false);}
 }
 const inputClass="mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-base";
 function errorFor(name:string){return fields[name]?.length?<p id={name+"-error"} className="mt-2 text-sm text-danger">{fields[name][0]}</p>:null;}
 function input(name:string,label:string,type="text",required=true,maxLength=150){return <div><label htmlFor={name} className="font-medium">{label}{!required?" (optional)":""}</label><input id={name} name={name} type={type} required={required} maxLength={maxLength} aria-invalid={!!fields[name]} aria-describedby={fields[name]?name+"-error":undefined} className={inputClass}/>{errorFor(name)}</div>;}
 if(success)return <div role="status" className="mt-8 rounded-2xl border bg-sage-soft p-7"><h2 className="text-2xl font-semibold">Application sent.</h2><p className="mt-4">Our email service accepted your application. Thank you—we will review your details and contact you by email.</p><p className="mt-3 break-all text-sm">Reference: {reference}</p><button type="button" onClick={()=>{attempt.current=null;savePartnerAttempt(null);setReference("");setCanRetry(true);setSuccess(false);}} className="mt-5 font-semibold underline">Send another application</button></div>;
 return <form onSubmit={submit} aria-busy={busy} className="mt-8 space-y-6">
  <p className="rounded-xl border bg-sage-soft p-4">Fill in the form and select <strong>Send Application</strong>. Your application will be sent directly to the Visa Prepper team.</p>
  <fieldset disabled={busy} className="space-y-6 disabled:opacity-70">
   <div className="grid gap-6 sm:grid-cols-2">{input("fullName","Full name","text",true,100)}{input("email","Email","email",true,254)}{input("businessName","Business or creator name")}{input("country","Country","text",true,80)}</div>
   <div><label htmlFor="partnerType" className="font-medium">Partner type</label><select id="partnerType" name="partnerType" required aria-invalid={!!fields.partnerType} aria-describedby={fields.partnerType?"partnerType-error":undefined} className={inputClass} defaultValue=""><option value="" disabled>Choose one</option>{PARTNER_TYPES.map(t=><option key={t}>{t}</option>)}</select>{errorFor("partnerType")}</div>
   {input("profileUrl","Website or social profile URL","url",true,500)}
   {input("phone","WhatsApp or phone, including country code","tel",false,30)}
   <fieldset aria-invalid={!!fields.audienceCountries} aria-describedby={fields.audienceCountries?"audienceCountries-error":undefined}><legend className="font-medium">Applicant or audience countries (choose at least one)</legend><div className="mt-3 flex flex-wrap gap-5">{AUDIENCE_COUNTRIES.map(country=><label key={country} className="flex min-h-11 items-center gap-3"><input name="audienceCountries" value={country} type="checkbox" className="h-5 w-5"/>{country}</label>)}</div>{errorFor("audienceCountries")}</fieldset>
   <div><label htmlFor="audienceRange" className="font-medium">Monthly applicants or audience</label><select id="audienceRange" name="audienceRange" required className={inputClass} defaultValue="Not sure yet">{AUDIENCE_RANGES.map(r=><option key={r}>{r}</option>)}</select></div>
   <div><label htmlFor="introduction" className="font-medium">How will you introduce Visa Prepper?</label><p className="mt-1 text-sm text-muted-foreground">20–1,500 characters. Do not include any applicant’s private information.</p><textarea id="introduction" name="introduction" required minLength={20} maxLength={1500} rows={4} className={inputClass} aria-invalid={!!fields.introduction} aria-describedby={fields.introduction?"introduction-error":undefined}/>{errorFor("introduction")}</div>
   <div><label htmlFor="experience" className="font-medium">Experience helping visa applicants (optional)</label><textarea id="experience" name="experience" maxLength={1500} rows={3} className={inputClass}/>{errorFor("experience")}</div>
   <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="flex items-start gap-3"><input name="privacy" type="checkbox" required className="mt-1 h-5 w-5 shrink-0"/><span>I have read the <Link href="/privacy" className="underline">Privacy Policy</Link>. My details may be used to review and respond to this application.</span></label>
   <label className="flex items-start gap-3"><input name="marketing" type="checkbox" className="mt-1 h-5 w-5 shrink-0"/><span>Send me marketing updates (optional).</span></label>
   <button type="submit" disabled={busy||!canRetry} className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy?"Sending…":!canRetry?"Submission needs confirmation":"Send Application"}</button>
  </fieldset>
  {error&&<div role="alert" ref={errorElement} tabIndex={-1} className="rounded-xl border border-danger bg-surface p-4 text-danger"><p>{error}</p>{reference&&<p className="mt-2 break-all text-sm">Reference: {reference}</p>}<a href="mailto:visaprepper@gmail.com" className="mt-3 inline-block font-medium underline">Email the partner team</a></div>}
 </form>;
}
