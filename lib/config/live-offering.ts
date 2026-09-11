import {PLANS} from './offering';
export type PublicPlan={id:string;name:string;price:number;description:string;interviews:number;checks:number|null;personalized:boolean};
/** Public, credential-free API. Both pricing and structured data use this snapshot. */
export async function getPublicPlans():Promise<PublicPlan[]> {
 try{
  const response=await fetch('https://app.visaprepper.com/api/public/offering',{next:{revalidate:15},signal:AbortSignal.timeout(2500)});
  if(!response.ok) return [...PLANS];
  const data=await response.json();
  const paid=['starter','plus'].flatMap(id=>{
   const p=data.packages?.[id];
   if(!p?.enabled||typeof p.label!=='string'||!Number.isInteger(p.price_cents)||!Number.isInteger(p.interviews)||(p.documents!==null&&!Number.isInteger(p.documents)))return [];
   return [{id:id==='plus'?'complete':id,name:p.label,price:p.price_cents/100,description:'One realistic interview format, with feedback afterward.',interviews:p.interviews,checks:p.documents,personalized:true}];
  });
  return [{...PLANS[0]},...paid];
 }catch{return [...PLANS];}
}
