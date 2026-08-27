import json

with open('/home/claude/site/data/pages_meta.json', encoding='utf-8') as f:
    pages_meta = json.load(f)

def group_records(meta):
    records = []
    cur = {}
    for k, v in meta:
        if k in cur:
            records.append(cur)
            cur = {}
        cur[k] = v
    if cur:
        records.append(cur)
    return records

grouped = {}
for pid, d in pages_meta.items():
    grouped[pid] = {'slug': d['slug'], 'records': group_records(d['meta'])}

with open('/home/claude/site/data/pages_grouped.json', 'w', encoding='utf-8') as f:
    json.dump(grouped, f, ensure_ascii=False, indent=2)

for pid, d in grouped.items():
    if d['records']:
        print(pid, d['slug'], len(d['records']), 'records, e.g.:', d['records'][0])
