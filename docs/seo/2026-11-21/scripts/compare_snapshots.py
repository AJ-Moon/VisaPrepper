"""Compare before/after snapshots: visible text must be unchanged on existing pages.

Usage: python compare_snapshots.py before.json after.json report.md
Reports: visible-text differences per existing path (expected: none, except
blog index/related-post cards that list the new posts), head metadata changes,
JSON-LD @type changes, and new paths.
"""
import difflib
import json
import sys

before = json.load(open(sys.argv[1]))
after = json.load(open(sys.argv[2]))
out = open(sys.argv[3], "w")


def w(s=""):
    out.write(s + "\n")


w("# Before/after snapshot comparison")
w()
w(f"Paths before: {len(before)}; after: {len(after)}")
new_paths = sorted(set(after) - set(before))
gone = sorted(set(before) - set(after))
w(f"New paths: {new_paths}")
w(f"Missing paths: {gone}")
w()
w("## Visible text (body without scripts/styles)")
changed_visible = []
for p in sorted(set(before) & set(after)):
    a, b = before[p].get("visible_text", ""), after[p].get("visible_text", "")
    if a != b:
        changed_visible.append(p)
        sm = difflib.SequenceMatcher(None, a.split(), b.split())
        ops = [op for op in sm.get_opcodes() if op[0] != "equal"]
        w(f"### {p} — {len(ops)} change block(s)")
        for tag, i1, i2, j1, j2 in ops[:12]:
            w(f"- {tag}: `{' '.join(a.split()[i1:i2])[:300]}` → `{' '.join(b.split()[j1:j2])[:300]}`")
w()
w(f"Existing paths with visible-text changes: {len(changed_visible)} {changed_visible}")
w()
w("## Head metadata changes (title, description, robots, canonical, og)")
for p in sorted(set(before) & set(after)):
    hb, ha = before[p].get("head", {}), after[p].get("head", {})
    diffs = []
    if hb.get("title") != ha.get("title"):
        diffs.append(f"title: `{hb.get('title')}` → `{ha.get('title')}`")
    for k in sorted(set(hb.get("meta", {})) | set(ha.get("meta", {}))):
        if hb.get("meta", {}).get(k) != ha.get("meta", {}).get(k):
            diffs.append(f"{k}: `{hb.get('meta', {}).get(k)}` → `{ha.get('meta', {}).get(k)}`")
    if hb.get("links") != ha.get("links"):
        diffs.append(f"links: `{hb.get('links')}` → `{ha.get('links')}`")
    tb = sorted(json.dumps(x.get("@type")) for x in hb.get("jsonld", []))
    ta = sorted(json.dumps(x.get("@type")) for x in ha.get("jsonld", []))
    if tb != ta:
        diffs.append(f"jsonld types: {tb} → {ta}")
    elif json.dumps(hb.get("jsonld"), sort_keys=True) != json.dumps(ha.get("jsonld"), sort_keys=True):
        diffs.append("jsonld content changed (same types)")
    if diffs:
        w(f"### {p}")
        for d in diffs:
            w(f"- {d}")
out.close()
print(f"visible-text changes on existing paths: {len(changed_visible)} -> {changed_visible}")
print(f"new paths: {len(new_paths)}")
