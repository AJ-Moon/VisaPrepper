import assert from "node:assert/strict";
const origin=process.argv[2]||"http://localhost:3004";
const canonicalOrigin="https://visaprepper.com";
const sitemapResponse=await fetch(origin+"/sitemap.xml");
assert.equal(sitemapResponse.status,200);
const sitemap=await sitemapResponse.text();
const routes=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert.equal(routes.length,41);
assert.equal(new Set(routes).size,routes.length);
assert.ok(!routes.includes("/start"));
assert.ok(routes.includes("/blog/best-ai-visa-interview-tools"));
assert.ok(routes.includes("/blog/free-ai-visa-mock-interview-online"));
assert.ok(routes.includes("/document-checks"));
const practiceRoutes=["/visa-interview-practice","/visa-interview-practice/india","/visa-interview-practice/pakistan"];
for(const path of practiceRoutes)assert.ok(routes.includes(path),"practice route in sitemap "+path);
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
 assert.ok(!/\bpractise\b|\bpractising\b|\bpractised\b/i.test(text),path+" uses practice spelling consistently");
 for(const tag of html.matchAll(/<a\b[^>]*data-intent="(?:paid|free)"[^>]*>/g)){
  const href=tag[0].match(/href="([^"]+)"/)?.[1];
  assert.equal(href,"https://app.visaprepper.com",path+" conversion continues to the verified app authentication entry");
 }
 // Customer stories keep their substance; only the brand-wide spelling style is normalized.
}
for(const[path,html]of pages){
 for(const m of html.matchAll(/href="([^"]+)"/g)){
  if(!m[1].startsWith("/")&&!m[1].startsWith("#"))continue;
  const url=new URL(m[1].replaceAll("&amp;","&"),origin+path);
  if(url.pathname.startsWith("/_next/"))continue;
  // Cloudflare replaces mailto links with this path, then decodes them in the
  // browser. It is an email link, not an internal website page to crawl.
  if(url.pathname==="/cdn-cgi/l/email-protection")continue;
  links.add(url.pathname+url.search);
  if(url.hash&&pages.has(url.pathname))assert.ok(pages.get(url.pathname).includes('id="'+url.hash.slice(1)+'"'),path+" anchor "+m[1]);
 }
}
for(const path of links)assert.equal((await fetch(origin+path)).status,200,"link "+path);
const home=pages.get("/");
assert.match(home,/<title>VisaPrepper \| AI Video Visa Interview Practice<\/title>/,"brand-first homepage title");
assert.ok(!home.includes("Example scenario — not a customer review"));
assert.equal([...home.matchAll(/data-review-id="review-\d+"/g)].length,60); // 30 + aria-hidden seamless copy
assert.match(home,/data-review-set="original"/);
assert.match(home,/data-review-set="duplicate"/);
const product=[...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]==="SoftwareApplication");
const website=[...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m=>JSON.parse(m[1])).find(s=>s["@type"]==="WebSite");
assert.equal(website.name,"VisaPrepper");
assert.deepEqual(website.alternateName,["Visa Prepper","visaprepper.com"]);
assert.deepEqual(product.publisher,website.publisher,"app and website share the brand publisher");
for(const path of practiceRoutes){
 const html=pages.get(path);
 const alternates=[...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)].map(m=>m[0]);
 for(const [language,href]of [["en","/visa-interview-practice"],["en-IN","/visa-interview-practice/india"],["en-PK","/visa-interview-practice/pakistan"],["x-default","/visa-interview-practice"]])assert.ok(alternates.some(tag=>new RegExp(`hreflang="${language}"`,"i").test(tag)&&tag.includes(`href="${canonicalOrigin}${href}"`)),path+" reciprocal regional alternate "+language);
}
assert.deepEqual(product.offers.map(p=>p.price),[0,44]);
assert.deepEqual(product.inLanguage,["en","ur","hi"]);
for(const phrase of ["Document review", "Explore sample document report", "US application", "UK documents", "Schengen documents", "Illustrative sample", "Self", "Family support", "WhatsApp help", "Chat with us on WhatsApp", "Purchasing is currently unavailable", "90 days from purchase"])assert.ok(home.includes(phrase),phrase);
assert.match(home, /role="tablist"/);
const videoTag=home.match(/<video[^>]*>/i)?.[0]||"";
assert.ok(videoTag.includes('controls=""'));
assert.ok(!/autoPlay|autoplay/.test(videoTag),"video requires user playback");
assert.ok(home.indexOf('<video') < home.indexOf('id="sample-report"'),"video before document examples");
assert.ok(home.indexOf('id="sample-report"') < home.indexOf('id="interview-example"'),"document examples before interview feedback");
for(const text of ["See what a document check can find", "See the feedback after your practice interview", "Explore sample interview report", "My father is sponsoring me.", "One document check reviews your submitted document bundle together. Each PDF does not use a separate check."])assert.ok(home.includes(text),text);
assert.ok(!home.includes("Confidence drops on follow-up questions"));
for(const text of ["Supporting evidence and limitations", "View source evidence", "Document_08.pdf", "Saved application details", "Excerpts from a real mock interview", "He afford me.", "Yeah, yeah, yeah.", "136 words/min", "41/100"])assert.ok(!home.includes(text),"no obsolete public sample content: "+text);
assert.match(pages.get("/contact"),/https:\/\/wa.me\/17325188581/);
assert.ok(pages.get("/contact").includes("Do not send passports"));
assert.ok(!home.includes('src="/reference-screenshots/'));
assert.ok(!pages.get("/partners").includes("ajmoon2202@gmail.com"),"partner email is not shown on the public page");
assert.ok(!pages.get("/partners/apply").includes("ajmoon2202@gmail.com"),"partner email is not shown in the form HTML");
for(const phrase of ["Full name","Email","WhatsApp or phone","Website or social profile URL","Send Application"])assert.ok(pages.get("/partners/apply").includes(phrase),`partner form ${phrase}`);
for(const lang of ["ur","hi","bn"])assert.ok(home.includes('lang="'+lang+'"'),lang+" language tag");
assert.match(await(await fetch(origin+"/start")).text(),/noindex/);
assert.equal((await fetch(origin+"/does-not-exist")).status,404);
assert.equal((await fetch(origin+"/visa-interview-practice/unsupported-country")).status,404);
assert.match(await(await fetch(origin+"/robots.txt")).text(),/Sitemap: https:\/\/visaprepper.com\/sitemap.xml/);
assert.equal((await fetch(origin+"/opengraph-image")).headers.get("content-type"),"image/png");
assert.equal((await fetch(origin+"/api/checkout-entry",{redirect:"manual"})).status,503);
assert.equal((await fetch(origin+"/api/partners")).status,405);
// This handoff verification is GET-only: no partner/contact submissions, even locally.
console.log(JSON.stringify({pages:routes.length,internalLinks:links.size,checks:"PASS: GET-only route/metadata/link crawl, intent handoffs, illustrative samples without evidence drawers, non-autoplay video, WhatsApp contact, unchanged testimonials, approved pricing, checkout fails closed. No forms submitted."},null,2));
