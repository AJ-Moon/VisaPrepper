import { z } from "zod";
const text = (min:number,max:number) => z.string().trim().min(min).max(max).refine(v=>!/[\u0000-\u0008\u000b\u000c\u000e-\u001f<>]/.test(v),"Use plain text without HTML.");
export const PARTNER_TYPES = ["Visa consultant","Education adviser","Travel business","Individual creator","Other"] as const;
export const AUDIENCE_COUNTRIES = ["Pakistan","India","Bangladesh","Other"] as const;
export const AUDIENCE_RANGES = ["Not sure yet","Under 100","100–999","1,000–9,999","10,000+"] as const;
const publicUrl = z.string().trim().max(500).url().refine(v=>{try {const u=new URL(v);return ["https:","http:"].includes(u.protocol)&&!u.username&&!u.password&&u.hostname.includes(".")&&!/^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(u.hostname);}catch{return false;}},"Use a public website or social profile URL.");
export const partnerApplicationSchema = z.object({
 requestId:z.uuid(), fullName:text(2,100), email:z.email().trim().toLowerCase().max(254),
 businessName:text(2,150), country:text(2,80), partnerType:z.enum(PARTNER_TYPES),
 profileUrl:publicUrl, phone:z.string().trim().max(30).refine(v=>!v || /^\+[1-9][0-9 ()-]{6,25}$/.test(v),"Include a country code, such as +92."),
 audienceCountries:z.array(z.enum(AUDIENCE_COUNTRIES)).min(1).max(4).transform(v=>[...new Set(v)]),
 audienceRange:z.enum(AUDIENCE_RANGES), introduction:text(20,1500), experience:text(0,1500),
 privacy:z.literal(true), marketing:z.boolean(), website:z.literal(""),
}).strict();
export type PartnerApplication = z.infer<typeof partnerApplicationSchema>;
