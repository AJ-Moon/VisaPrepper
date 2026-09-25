import { createHash } from "node:crypto";
import { partnerApplicationSchema } from "@/lib/partners/validation";
import { sendPartnerApplicationEmail } from "@/lib/partners/email";
export const runtime="nodejs";
const requests=new Map<string,{count:number;until:number}>();
const headers={"Cache-Control":"no-store"};
export async function POST(request:Request) {
 if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({error:"Please use the form on this website."},{status:403,headers});
 if (!request.headers.get("content-type")?.startsWith("application/json")) return Response.json({error:"Invalid form format."},{status:415,headers});
 // Best-effort per-instance protection; shared backend rate limits remain a release requirement.
 const key=createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown").digest("hex");
 const now=Date.now(); for(const [id,value]of requests)if(value.until<now)requests.delete(id);
 const entry=requests.get(key)??{count:0,until:now+60000};
 entry.count++;requests.set(key,entry);
 if(entry.count>10) return Response.json({error:"Please wait a minute before trying again."},{status:429,headers:{...headers,"Retry-After":"60"}});
 try {
  const reader=request.body?.getReader();if(!reader)return Response.json({error:"Form is empty."},{status:400,headers});
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();return Response.json({error:"Your application is too long."},{status:413,headers});}chunks.push(value);}
  let payload:unknown;
  try { payload=JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { return Response.json({error:"Invalid form format."},{status:400,headers}); }
  const parsed=partnerApplicationSchema.safeParse(payload);
  if(!parsed.success)return Response.json({error:"Please check the highlighted answers.",fields:parsed.error.flatten().fieldErrors},{status:400,headers});
  const sent=await sendPartnerApplicationEmail(parsed.data);
  return Response.json({id:sent.id,message:"Your application has been sent. We will review it and contact you by email."},{status:201,headers});
 }catch{
  // Never log application payloads, auth tokens or backend response bodies.
  return Response.json({error:"We could not submit your application. Your answers are still here. Please try again."},{status:503,headers});
 }
}
