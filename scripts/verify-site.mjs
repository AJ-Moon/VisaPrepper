import assert from "node:assert/strict";
const origin=process.argv[2]||"http://localhost:3004";
const localOnly=["localhost","127.0.0.1","[::1]"].includes(new URL(origin).hostname);
const canonicalOrigin="https://visaprepper.com";
const sitemapResponse=await fetch(origin+"/sitemap.xml");
assert.equal(sitemapResponse.status,200);
const sitemap=await sitemapResponse.text();
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.equal(routes.length,34);
assert.equal(new Set(routes).size,routes.length);
assert.ok(!routes.includes("/start"));
const pages=new Map(),titles=new Set(),descriptions=new Set(),links=new Set();
for(const path of routes){
 const response=await fetch(origin+path);assert.equal(response.status,200,path);
 const html=await response.text();pages.set(path,html);
 assert.ok(!/noindex/i.test(response.headers.get("x-robots-tag")||""),path);
 assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,path+" one h1");
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
 assert.ok(title&&!titles.has(title),path+" unique title");titles.add(title);
 const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
 assert.ok(description&&!descriptions.has(description),path+" unique description");descriptions.add(description);
 assert.equal(new URL(html.match(/rel="canonical" href="([^"]+)"/)?.[1]).href,new URL(path,canonicalOrigin).href,path+" canonical");
 assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html),path+" indexable");
 assert.match(html,/<meta property="og:image" content="[^"]+"/,path+" social image");
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){
  const schema=JSON.parse(m[1]);
  assert.ok(!JSON.stringify(schema).includes('"aggregateRating"'),path+" no invented ratings");
 }
 const text=html.replace(/<script\b[^>]*>.*?<\/script>/gs,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
 assert.ok(!/\$(15|35)\b|Unlimited document checks|3 realistic interviews|5 practice interviews/.test(text),path+" no superseded offers");
 // Customer quotes are preserved verbatim, including their own word choices.
}
for(const[path,html]of pages){
 for(const m of html.matchAll(/href="([^"]+)"/g)){
  if(!m[1].startsWith("/")&&!m[1].startsWith("#"))continue;
  const url=new URL(m[1].replaceAll("&amp;","&"),origin+path);
  if(url.pathname.startsWith("/_next/"))continue;
  links.add(url.pathname+url.search);
  if(url.hash&&pages.has(url.pathname))assert.ok(pages.get(url.pathname).includes('id="'+url.hash.slice(1)+'"'),path+" anchor "+m[1]);
 }
}
for(const path of links)assert.equal((await fetch(origin+path)).status,200,"link "+path);
const home=pages.get("/");
assert.ok(!home.includes("Example scenario — not a customer review"));
assert.equal([...home.matchAll(/data-review-id="review-\d+"/g)].length,60); // 30 + aria-hidden seamless copy
assert.match(home,/data-review-set="original"/);
assert.match(home,/data-review-set="duplicate"/);
const product=[...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]==="SoftwareApplication");
assert.deepEqual(product.offers.map(p=>p.price),[0,44]);
assert.deepEqual(product.inLanguage,["en","ur"]);
for(const phrase of ["6 complete AI practice interviews","10 document checks, including revised documents","90 days from purchase","France","Italy","United Kingdom","Germany","Coming soon","The direct Google Play link will be added here."])assert.ok(home.includes(phrase),phrase);
for(const lang of ["ur","hi","bn"])assert.ok(home.includes('lang="'+lang+'"'),lang+" language tag");
assert.match(await(await fetch(origin+"/start")).text(),/noindex/);
assert.equal((await fetch(origin+"/does-not-exist")).status,404);
assert.match(await(await fetch(origin+"/robots.txt")).text(),/Sitemap: https:\/\/visaprepper.com\/sitemap.xml/);
assert.equal((await fetch(origin+"/opengraph-image")).headers.get("content-type"),"image/png");
assert.equal((await fetch(origin+"/api/checkout-entry",{redirect:"manual"})).status,503);
assert.equal((await fetch(origin+"/api/partners")).status,405);
// Never submit synthetic applications against the live site.
if(localOnly){
const fixture={requestId:"fdf23d7a-716e-49cb-a061-2323ab56cf80",fullName:"Test Applicant",email:"test@example.test",businessName:"Test Creator",country:"Pakistan",partnerType:"Individual creator",profileUrl:"https://example.test/profile",phone:"",audienceCountries:["Pakistan"],audienceRange:"Not sure yet",introduction:"I share original preparation guides for applicants.",experience:"",privacy:true,marketing:false,website:""};
const post=(body,headers={})=>fetch(origin+"/api/partners",{method:"POST",headers:{"Content-Type":"application/json",Origin:origin,"X-Forwarded-For":"192.0.2.37",...headers},body});
assert.equal((await post(JSON.stringify(fixture),{Origin:"https://example.invalid"})).status,403);
assert.equal((await post("bad",{"Content-Type":"text/plain"})).status,415);
assert.equal((await post("{")).status,400);
assert.equal((await post("{}")).status,400);
assert.equal((await post("x".repeat(17000))).status,413);
const result=await post(JSON.stringify(fixture));assert.equal(result.status,503);
assert.equal((await result.json()).id,undefined);
}
console.log(JSON.stringify({pages:routes.length,internalLinks:links.size,checks:"PASS: indexability, unique metadata, H1, canonicals, structured data, all internal links/anchors, approved pricing, 30 supplied reviews plus hidden loop copy, languages, sitemap, robots, 404, social image, checkout fail-closed, partner read-only route check. POST validation/failure tests run only on localhost."},null,2));
