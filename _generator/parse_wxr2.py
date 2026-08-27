import re, json, html

SRC = '/mnt/user-data/uploads/keizemi_WordPress_2026-08-27.xml'
content = open(SRC, encoding='utf-8').read()
items = re.findall(r'<item>.*?</item>', content, re.DOTALL)

def get(pattern, text, default=''):
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1) if m else default

def clean(s):
    return html.unescape(s).strip()

# Pages
pages = []
for it in items:
    if '<wp:post_type><![CDATA[page]]></wp:post_type>' in it:
        status = get(r'<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>', it)
        if status != 'publish':
            continue
        pid = get(r'<wp:post_id>(\d+)</wp:post_id>', it)
        title = clean(get(r'<title><!\[CDATA\[(.*?)\]\]></title>', it))
        link = get(r'<link>(.*?)</link>', it)
        slug = get(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', it)
        parent = get(r'<wp:post_parent>(\d+)</wp:post_parent>', it)
        content_body = clean(get(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', it))
        pages.append({'id': pid, 'title': title, 'link': link, 'slug': slug, 'parent': parent, 'content': content_body})

with open('/home/claude/site/data/pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)
print("Pages:", len(pages))
for p in pages:
    print(p['id'], p['slug'], '|', p['title'], '| len=', len(p['content']))

# Notices (post)
notices = []
for it in items:
    if '<wp:post_type><![CDATA[post]]></wp:post_type>' in it:
        status = get(r'<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>', it)
        if status != 'publish':
            continue
        pid = get(r'<wp:post_id>(\d+)</wp:post_id>', it)
        title = clean(get(r'<title><!\[CDATA\[(.*?)\]\]></title>', it))
        link = get(r'<link>(.*?)</link>', it)
        slug = get(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', it)
        pub_date = get(r'<wp:post_date><!\[CDATA\[(.*?)\]\]></wp:post_date>', it)
        content_body = clean(get(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', it))
        cats = re.findall(r'<category domain="category" nicename="(.*?)"><!\[CDATA\[(.*?)\]\]></category>', it)
        notices.append({'id': pid, 'title': title, 'link': link, 'slug': slug, 'date': pub_date, 'content': content_body, 'categories': cats})

notices.sort(key=lambda x: x['date'], reverse=True)
with open('/home/claude/site/data/notices.json', 'w', encoding='utf-8') as f:
    json.dump(notices, f, ensure_ascii=False, indent=2)
print("\nNotices:", len(notices))
