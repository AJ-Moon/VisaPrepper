"""Snapshot visible text and head metadata for every sitemap URL of a local build.

Usage: python snapshot.py <base_url> <out_json>
Visible text = <body> text with <script>, <style>, <noscript>, <template> removed.
Head = title, meta description, robots, canonical, og/twitter tags, JSON-LD blocks.
"""
import json
import re
import sys
import urllib.request

from bs4 import BeautifulSoup

base = sys.argv[1].rstrip("/")
out = sys.argv[2]


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (snapshot)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.status, r.read().decode("utf-8", "replace")


status, sm = get(base + "/sitemap.xml")
locs = re.findall(r"<loc>([^<]+)</loc>", sm)
paths = sorted({re.sub(r"^https://visaprepper\.com", "", u) or "/" for u in locs} | {"/start"})
data = {}
for p in paths:
    try:
        st, html = get(base + p)
    except Exception as e:  # noqa: BLE001
        data[p] = {"error": str(e)}
        continue
    soup = BeautifulSoup(html, "lxml")
    head = {
        "title": soup.title.get_text() if soup.title else None,
        "meta": {},
        "links": {},
        "jsonld": [],
    }
    for m in soup.find_all("meta"):
        k = m.get("name") or m.get("property")
        if k and (k in ("description", "robots", "keywords") or k.startswith(("og:", "twitter:", "article:"))):
            head["meta"].setdefault(k, []).append(m.get("content"))
    for link in soup.find_all("link"):
        rel = " ".join(link.get("rel", []))
        if rel in ("canonical", "alternate"):
            head["links"].setdefault(rel, []).append({"href": link.get("href"), "hreflang": link.get("hreflang")})
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            head["jsonld"].append(json.loads(s.string or ""))
        except Exception:  # noqa: BLE001
            head["jsonld"].append({"_parse_error": (s.string or "")[:200]})
    body = soup.body
    for t in body.find_all(["script", "style", "noscript", "template"]):
        t.decompose()
    text = re.sub(r"\s+", " ", body.get_text(" ")).strip()
    data[p] = {"status": st, "head": head, "visible_text": text}
json.dump(data, open(out, "w"), indent=1, ensure_ascii=False)
print(f"snapshotted {len(data)} paths -> {out}")
