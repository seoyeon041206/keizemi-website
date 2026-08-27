import re, json, html

SRC = '/mnt/user-data/uploads/keizemi_WordPress_2026-08-27.xml'
content = open(SRC, encoding='utf-8').read()
items = re.findall(r'<item>.*?</item>', content, re.DOTALL)

def get(pattern, text, default=''):
    m = re.search(pattern, text, re.DOTALL)
    return m.group(1) if m else default

def get_all_postmeta(text):
    metas = re.findall(r'<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[(.*?)\]\]></wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(.*?)\]\]></wp:meta_value>\s*</wp:postmeta>', text, re.DOTALL)
    d = {}
    for k, v in metas:
        d[k] = v
    return d

def clean(s):
    return html.unescape(s).strip()

# Parse attachments -> id:url map
attachments = {}
for it in items:
    if '<wp:post_type><![CDATA[attachment]]></wp:post_type>' in it:
        pid = get(r'<wp:post_id>(\d+)</wp:post_id>', it)
        url = get(r'<wp:attachment_url><!\[CDATA\[(.*?)\]\]></wp:attachment_url>', it)
        attachments[pid] = url

# Parse seminars
seminars = []
for it in items:
    if '<wp:post_type><![CDATA[seminar]]></wp:post_type>' in it:
        pid = get(r'<wp:post_id>(\d+)</wp:post_id>', it)
        title = clean(get(r'<title><!\[CDATA\[(.*?)\]\]></title>', it))
        link = get(r'<link>(.*?)</link>', it)
        slug = get(r'<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>', it)
        status = get(r'<wp:status><!\[CDATA\[(.*?)\]\]></wp:status>', it)
        content_body = clean(get(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', it))
        meta = get_all_postmeta(it)
        prof_img_id = meta.get('seminar_professor_img','')
        seminars.append({
            'id': pid,
            'title': title,
            'slug': slug,
            'link': link,
            'status': status,
            'intro': content_body,
            'category': clean(meta.get('seminar_category','')),
            'recruit_status': clean(meta.get('seminar_status','')),
            'professor_name': clean(meta.get('seminar_professor_name','')),
            'professor_name_alpha': clean(meta.get('seminar_professor_name_alpha','')),
            'professor_desc': clean(meta.get('seminar_professor_desc','')),
            'professor_link': clean(meta.get('seminar_professor_link','')),
            'professor_img_id': prof_img_id,
            'professor_img_url': attachments.get(prof_img_id, ''),
            'twitter': clean(meta.get('seminar_twitter','')),
            'instagram': clean(meta.get('seminar_instagram','')),
            'facebook': clean(meta.get('seminar_facebook','')),
            'website': clean(meta.get('seminar_website','')),
            'gallery_image_id': meta.get('seminar_gallery_image',''),
            'gallery_image_url': attachments.get(meta.get('seminar_gallery_image',''), ''),
        })

# Parse pearl-seminar (english data), linked via related_posts_japanese -> seminar post id
pearl_by_jp_id = {}
for it in items:
    if '<wp:post_type><![CDATA[pearl-seminar]]></wp:post_type>' in it:
        meta = get_all_postmeta(it)
        jp_id = meta.get('related_posts_japanese','')
        title_en = clean(get(r'<title><!\[CDATA\[(.*?)\]\]></title>', it))
        content_en = clean(get(r'<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>', it))
        pearl_by_jp_id[jp_id] = {
            'title_en': title_en,
            'intro_en': content_en,
            'category_en': clean(meta.get('seminar_category_english','')),
            'professor_desc_en': clean(meta.get('seminar_professor_desc_english','')),
            'professor_link_en': clean(meta.get('seminar_professor_link_english','')),
        }

for s in seminars:
    if s['id'] in pearl_by_jp_id:
        s['pearl'] = pearl_by_jp_id[s['id']]
    else:
        s['pearl'] = None

print("Seminars parsed:", len(seminars))
print("With PEARL/English data:", sum(1 for s in seminars if s['pearl']))
print("Statuses:", set(s['status'] for s in seminars))
print("Categories:", set(s['category'] for s in seminars))
print("Recruit statuses:", set(s['recruit_status'] for s in seminars))

with open('/home/claude/site/data/seminars.json', 'w', encoding='utf-8') as f:
    json.dump(seminars, f, ensure_ascii=False, indent=2)
with open('/home/claude/site/data/attachments.json', 'w', encoding='utf-8') as f:
    json.dump(attachments, f, ensure_ascii=False, indent=2)

print("Sample:", json.dumps(seminars[0], ensure_ascii=False, indent=2)[:1500])
