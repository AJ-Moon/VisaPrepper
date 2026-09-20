import { z } from "zod";
import type { PartnerApplication } from "./validation";
const savedSchema = z.object({id:z.uuid(),created_at:z.iso.datetime({offset:true}),status:z.literal("pending"),stored:z.literal(true)});
export class PartnerUnavailable extends Error {}
/** Backend must commit a private, idempotent record before returning this acknowledgement. */
export async function savePartnerApplication(data:PartnerApplication, transport:typeof fetch=fetch, env:NodeJS.ProcessEnv=process.env) {
 const endpoint=env.PARTNER_SUBMISSION_URL, token=env.PARTNER_SUBMISSION_TOKEN;
 if (!endpoint || !token || new URL(endpoint).protocol !== "https:") throw new PartnerUnavailable("Partner storage is not configured.");
 const response=await transport(endpoint,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`,"Idempotency-Key":data.requestId},body:JSON.stringify({...data,privacyVersion:"2026-09-20"}),signal:AbortSignal.timeout(8000),redirect:"error",cache:"no-store"});
 if (!response.ok) throw new PartnerUnavailable("Partner storage did not confirm the application.");
 return savedSchema.parse(await response.json());
}
