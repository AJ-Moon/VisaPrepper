"use client";
import { useState } from "react";
import Link from "next/link";
import { PARTNER_EMAIL } from "@/lib/config/site";
import { AUDIENCE_COUNTRIES, AUDIENCE_RANGES, PARTNER_TYPES, partnerApplicationSchema } from "@/lib/partners/validation";
export function PartnerForm() {
 const [fields,setFields]=useState<Record<string,string[] | undefined>>({}),[opened,setOpened]=useState(false);
 function submit(event:React.FormEvent<HTMLFormElement>) {
  event.preventDefault();setFields({});setOpened(false);
  const data=new FormData(event.currentTarget);
  const values={requestId:crypto.randomUUID(),fullName:data.get("fullName"),email:data.get("email"),businessName:data.get("businessName"),country:data.get("country"),partnerType:data.get("partnerType"),profileUrl:data.get("profileUrl"),phone:data.get("phone"),audienceCountries:data.getAll("audienceCountries"),audienceRange:data.get("audienceRange"),introduction:data.get("introduction"),experience:data.get("experience"),privacy:data.get("privacy")==="on",marketing:data.get("marketing")==="on",website:data.get("website")};
  const parsed=partnerApplicationSchema.safeParse(values);
  if(!parsed.success){setFields(parsed.error.flatten().fieldErrors);return;}
  const application=parsed.data;
  const body=[
   "Visa Prepper Partner Application",
   "",
   `Name: ${application.fullName}`,
   `Email: ${application.email}`,
   `WhatsApp or phone: ${application.phone || "Not provided"}`,
   `Business or creator name: ${application.businessName}`,
   `Country: ${application.country}`,
   `Partner type: ${application.partnerType}`,
   `Website or social profile: ${application.profileUrl}`,
   `Audience countries: ${application.audienceCountries.join(", ")}`,
   `Monthly applicants or audience: ${application.audienceRange}`,
   "",
   "How I will introduce Visa Prepper:",
   application.introduction,
   "",
   "Experience helping visa applicants:",
   application.experience || "Not provided",
   "",
   `Marketing updates: ${application.marketing ? "Yes" : "No"}`,
  ].join("\n");
  setOpened(true);
  window.location.href=`mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent("Visa Prepper Partner Application")}&body=${encodeURIComponent(body)}`;
 }
 const inputClass="mt-2 w-full rounded-xl border bg-surface px-4 py-3 text-base";
 function errorFor(name:string){return fields[name]?.length?<p id={name+"-error"} className="mt-2 text-sm text-danger">{fields[name][0]}</p>:null;}
 function input(name:string,label:string,type="text",required=true,maxLength=150){return <div><label htmlFor={name} className="font-medium">{label}{!required?" (optional)":""}</label><input id={name} name={name} type={type} required={required} maxLength={maxLength} aria-invalid={!!fields[name]} aria-describedby={fields[name]?name+"-error":undefined} className={inputClass}/>{errorFor(name)}</div>;}
 return <form onSubmit={submit} className="mt-8 space-y-6">
  <p className="rounded-xl border bg-sage-soft p-4">Fill in the form and select <strong>Send Application</strong>. Your email app will open with the application ready; review it and press send there.</p>
  <fieldset className="space-y-6">
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
   <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Send Application</button>
  </fieldset>
  {opened&&<p role="status" className="rounded-xl border bg-sage-soft p-4">Your email app should now be open. Review the application and press send to complete it.</p>}
 </form>;
}
