import re, json, html

SRC = '/mnt/user-data/uploads/keizemi_WordPress_2026-08-27.xml'
content = open(SRC, encoding='utf-8').read()
items = re.findall(r'<item>.*?</item>', content, re.DOTALL)

IGNORE_PREFIXES = ('_edit', 'use_page_builder', 'page_builder', 'post_views_count', '_wp_page_template',
    'catch_', 'page_catch', 'page_title_font', 'profile_headline', '_custom_css', '_oembed', '_wp_oembed',
    '_elementor', '_wp_old', 'past_seminar_calendar')

def clean(s):
    return html.unescape(s).strip()

def get(pattern, text, default=''):
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1) if m else default

def ordered_postmeta(text):
    return re.findall(r'<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]></wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>\s*</wp:postmeta>', text, re.DOTALL)

pages_meta = {}
for it in items:
    if '<wp:post_type><![CDATA[page]]></wp:post_type>' not in it:
        continue
    status = get(r'<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>', it)
    if status != 'publish':
        continue
    pid = get(r'<wp:post_id>(\d+)</wp:post_id>', it)
    slug = get(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', it)
    metas = ordered_postmeta(it)
    filtered = [(k, clean(v)) for k, v in metas if not any(k.startswith(p) for p in IGNORE_PREFIXES) and clean(v)]
    pages_meta[pid] = {'slug': slug, 'meta': filtered}

with open('/home/claude/site/data/pages_meta.json', 'w', encoding='utf-8') as f:
    json.dump(pages_meta, f, ensure_ascii=False, indent=2)

for pid, d in pages_meta.items():
    if d['meta']:
        print(pid, d['slug'], '->', len(d['meta']), 'fields:', [k for k,v in d['meta'][:8]])
