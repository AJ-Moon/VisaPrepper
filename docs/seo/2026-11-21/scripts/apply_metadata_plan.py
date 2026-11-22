"""Apply phase-1 metadata-plan rows to the working clone (not the owner's local copy).

Usage: python3 -I apply_metadata_plan.py <plan_json> <repo_dir>
- Applies every status=change row with phase 1 (titles, descriptions, metaTitle,
  metaDescription, practice-market titles, blog seoTitle/seoDescription).
- Skips M011 (phase 2: /features title, held while /features ranks for the brand query),
  C12 (lastmod change: owner said no date changes) and C09 (hold).
- Code rows C01-C06 were applied by hand earlier; this script applies C04 (preview-only
  robots), C07, C08, C10 and C17 and asserts each edit matched exactly once.
"""
import json
import os
import re
import sys

plan = json.load(open(sys.argv[1]))["rows"]
root = sys.argv[2]
assert "/Downloads/visaprepper" not in root, "never edit the owner's local clone"


def rd(p):
    return open(os.path.join(root, p), encoding="utf-8").read()


def wr(p, s):
    open(os.path.join(root, p), "w", encoding="utf-8").write(s)


def replace_once(p, old, new):
    s = rd(p)
    n = s.count(old)
    assert n == 1, (p, old[:80], n)
    wr(p, s.replace(old, new))


def yaml_str(v):
    return json.dumps(v, ensure_ascii=False)  # double-quoted, escapes quotes safely


applied = []
for r in plan:
    if r["status"] != "change" or r["id"].startswith(("C", "H")) or r.get("phase") != "1":
        continue
    f = r["file"]
    if f.startswith("content/blog/"):
        s = rd(f)
        _, head, body = s.split("---", 2)
        if r["field"].startswith("seoTitle"):
            if re.search(r"^seoTitle:", head, re.M):
                head, n = re.subn(r"^seoTitle: .*$", "seoTitle: " + yaml_str(r["proposed"]), head, count=1, flags=re.M)
            else:
                head, n = re.subn(r"^(title: .*)$", lambda m: m.group(1) + "\nseoTitle: " + yaml_str(r["proposed"]), head, count=1, flags=re.M)
        elif r["field"].startswith("seoDescription"):
            assert not re.search(r"^seoDescription:", head, re.M), f
            head, n = re.subn(r"^(description: .*)$", lambda m: m.group(1) + "\nseoDescription: " + yaml_str(r["proposed"]), head, count=1, flags=re.M)
        else:
            raise SystemExit(f"unexpected blog field {r['id']} {r['field']}")
        assert n == 1, (r["id"], f)
        wr(f, "---" + head + "---" + body)
    else:
        replace_once(f, '"' + r["current"] + '"', '"' + r["proposed"] + '"')
    applied.append(r["id"])

# C04: preview-only robots directives (replaces the earlier index/follow + googleBot variant)
s = rd("app/layout.tsx")
old = s[s.index("  robots: {"):s.index("};", s.index("  robots: {"))]
replace_once("app/layout.tsx", old, '  robots: {\n    "max-image-preview": "large",\n    "max-snippet": -1,\n    "max-video-preview": -1,\n  },\n')
# C07: trailing-slash url on Organization and SoftwareApplication
replace_once("lib/seo/json-ld.tsx", "    url: SITE_URL,\n    \"@id\": `${SITE_URL}/#organization`,", "    url: `${SITE_URL}/`,\n    \"@id\": `${SITE_URL}/#organization`,")
replace_once("lib/seo/json-ld.tsx", "    url: SITE_URL,\n    inLanguage: [\"en\", \"ur\", \"hi\"],", "    url: `${SITE_URL}/`,\n    inLanguage: [\"en\", \"ur\", \"hi\"],")
# C08: Service @id on /document-checks
replace_once("app/document-checks/page.tsx", '"@type": "Service", name: "VisaPrepper application',
             '"@type": "Service", "@id": `${SITE_URL}/document-checks#service`, name: "VisaPrepper application')
# C10: article:author as a profile URL rather than plain text
replace_once("app/blog/[slug]/page.tsx", "      authors: [post.author],", "      authors: [`${SITE_URL}/about`],")
# C17: site checker expects the new homepage title
replace_once("scripts/verify-site.mjs", r"<title>VisaPrepper \| U.S. Visa Interview Practice &amp; Document Checks<\/title>",
             r"<title>VisaPrepper \(Visa Prepper\): AI U.S. Visa Interview Practice<\/title>")
print(f"applied {len(applied)} metadata rows: {', '.join(applied)}")
