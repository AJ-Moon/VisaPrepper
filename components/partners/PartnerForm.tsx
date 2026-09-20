"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { AUDIENCE_COUNTRIES, AUDIENCE_RANGES, PARTNER_TYPES } from "@/lib/partners/validation";
export function PartnerForm({configured}:{configured:boolean}) {
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[fields,setFields]=useState<Record<string,string[]>>({}),[success,setSuccess]=useState("");
 const request=useRef({signature:"",id:""});
 async function submit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();setError("");setFields({});setBusy(true);
  const data=new FormData(event.currentTarget);
  const values={fullName:data.get("fullName"),email:data.get("email"),businessName:data.get("businessName"),country:data.get("country"),partnerType:data.get("partnerType"),profileUrl:data.get("profileUrl"),phone:data.get("phone"),audienceCountries:data.getAll("audienceCountries"),audienceRange:data.get("audienceRange"),introduction:data.get("introduction"),experience:data.get("experience"),privacy:data.get("privacy")==="on",marketing:data.get("marketing")==="on",website:data.get("website")};
  const signature=JSON.stringify(values);
  if(request.current.signature!==signature)request.current={signature,id:crypto.randomUUID()};
  try {
   const response=await fetch("/api/partners",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...values,requestId:request.current.id})});
   const result=await response.json();
   if(!response.ok){setFields(result.fields??{});throw new Error(result.error??"We could not submit your application. Your answers are still here. Please try again.");}
   if(!result.id)throw new Error("We could not confirm your application. Your answers are still here.");
   setSuccess(result.id);
  }catch(e){setError(e instanceof Error?e.message:"We could not submit your application. Your answers are still here. Please try again.");}
  finally{setBusy(false);}
 }
 const inputClass="mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-base";
 function errorFor(name:string){return fields[name]?.length?<p id={name+"-error"} className="mt-2 text-sm text-danger">{fields[name][0]}</p>:null;}
 function input(name:string,label:string,type="text",required=true,maxLength=150){return <div><label htmlFor={name} className="font-medium">{label}{!required?" (optional)":""}</label><input id={name} name={name} type={type} required={required} maxLength={maxLength} aria-invalid={!!fields[name]} aria-describedby={fields[name]?name+"-error":undefined} className={inputClass}/>{errorFor(name)}</div>;}
 if(success)return <div role="status" className="rounded-2xl border bg-sage-soft p-7"><h2 className="text-2xl font-semibold">We have received your application.</h2><p className="mt-4">We will review it and contact you by email.</p><p className="mt-3 break-all text-sm">Application reference: {success}</p></div>;
 return <form onSubmit={submit} className="mt-8 space-y-6" aria-busy={busy}>
  {!configured&&<p role="status" className="rounded-xl border bg-sage-soft p-4">Applications are not open yet. This form is being connected to private storage. Please do not enter personal details until submissions are enabled.</p>}
  <fieldset disabled={!configured||busy} className="space-y-6 disabled:opacity-70">
   <div className="grid gap-6 sm:grid-cols-2">{input("fullName","Full name")}{input("email","Email","email",true,254)}{input("businessName","Business or creator name")}{input("country","Country")}</div>
   <div><label htmlFor="partnerType" className="font-medium">Partner type</label><select id="partnerType" name="partnerType" required className={inputClass} defaultValue=""><option value="" disabled>Choose one</option>{PARTNER_TYPES.map(t=><option key={t}>{t}</option>)}</select>{errorFor("partnerType")}</div>
   {input("profileUrl","Website or social profile URL","url",true,500)}
   {input("phone","WhatsApp or phone, including country code","tel",false,30)}
   <fieldset><legend className="font-medium">Applicant or audience countries (choose at least one)</legend><div className="mt-3 flex flex-wrap gap-5">{AUDIENCE_COUNTRIES.map(country=><label key={country} className="flex min-h-11 items-center gap-3"><input name="audienceCountries" value={country} type="checkbox" className="h-5 w-5"/>{country}</label>)}</div>{errorFor("audienceCountries")}</fieldset>
   <div><label htmlFor="audienceRange" className="font-medium">Monthly applicants or audience</label><select id="audienceRange" name="audienceRange" required className={inputClass} defaultValue="Not sure yet">{AUDIENCE_RANGES.map(r=><option key={r}>{r}</option>)}</select></div>
   <div><label htmlFor="introduction" className="font-medium">How will you introduce Visa Prepper?</label><p className="mt-1 text-sm text-muted-foreground">20–1,500 characters. Do not include any applicant’s private information.</p><textarea id="introduction" name="introduction" required minLength={20} maxLength={1500} rows={4} className={inputClass} aria-invalid={!!fields.introduction}/>{errorFor("introduction")}</div>
   <div><label htmlFor="experience" className="font-medium">Experience helping visa applicants (optional)</label><textarea id="experience" name="experience" maxLength={1500} rows={3} className={inputClass}/>{errorFor("experience")}</div>
   <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <label className="flex items-start gap-3"><input name="privacy" type="checkbox" required className="mt-1 h-5 w-5 shrink-0"/><span>I have read the <Link href="/privacy" className="underline">Privacy Policy</Link>. My details may be used to review and respond to this application.</span></label>
   <label className="flex items-start gap-3"><input name="marketing" type="checkbox" className="mt-1 h-5 w-5 shrink-0"/><span>Send me marketing updates (optional).</span></label>
   <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy?"Submitting…":"Submit My Application"}</button>
  </fieldset>
  {error&&<p role="alert" className="rounded-xl border border-danger bg-surface p-4 text-danger">{error}</p>}
 </form>;
}
