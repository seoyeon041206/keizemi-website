import json, os, re, html as htmlmod

BASE = '/home/claude/site'
DIST = BASE + '/dist'
D = BASE + '/data'

def load(name):
    with open(f'{D}/{name}', encoding='utf-8') as f:
        return json.load(f)

seminars = load('seminars.json')
attachments = load('attachments.json')
pages = {p['id']: p for p in load('pages.json')}
pages_grouped = load('pages_grouped.json')
notices = load('notices.json')

OLD = 'https://keizemi-keio.info'

def img(id_or_url):
    if not id_or_url:
        return ''
    if id_or_url.startswith('http'):
        return id_or_url
    return attachments.get(id_or_url, '')

NAV = [
    ("委員会", "/about/", [
        ("経済学部ゼミナール委員会とは？", "/about/"),
        ("常任委員紹介", "/about/committee/"),
        ("新規委員募集", "/about/new-members/"),
        ("新規委員エントリー", "/about/entry/"),
    ]),
    ("研究会", "/seminar/", []),
    ("試験・行事", "/about-seminar/schedule/", [
        ("入ゼミスケジュール・行事の流れ", "/about-seminar/schedule/"),
        ("入ゼミ行事開催情報", "/about-seminar/session/"),
        ("試験情報", "/about-seminar/examination/"),
        ("配布資料", "/about-seminar/handout/"),
        ("参考：過去の試験情報", "/about-seminar/previous/"),
        ("研究会（ゼミ）とは？", "/about-seminar/"),
    ]),
    ("ゼミ活動", "/activity/seasonal-events/", [
        ("春季・秋季イベント交流会", "/activity/seasonal-events/"),
        ("三田祭論文", "/activity/mitasai/"),
        ("講演会", "/activity/lecture/"),
    ]),
    ("PEARL/DD", "/pearl/", [
        ("Seminars for PEARL/DD", "/pearl/pearl-seminar/"),
        ("Schedule", "/pearl/schedule/"),
        ("Examination", "/pearl/examination/"),
        ("Previous Year Results", "/pearl/previous/"),
        ("Handout", "/pearl/handout/"),
        ("Event meeting", "/pearl/event-meeting/"),
    ]),
    ("お問い合わせ/Contact", "/contact/", []),
    ("アーカイブ", "/archive/past-activity/", [
        ("入ゼミ・ゼミ活動", "/archive/past-activity/"),
        ("講演会ポスター", "/archive/poster/"),
        ("財務報告資料", "/archive/financial-report/"),
    ]),
]

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap');
:root{
  --navy:#0d2b52; --navy-dark:#081b35; --maroon:#7d1128; --maroon-dark:#5c0c1d;
  --gold:#c9a24b; --bg:#f6f5f1; --text:#242220; --muted:#6b6660;
  --card:#fff; --border:#e6e1d8; --serif:'Noto Serif JP',serif; --sans:'Noto Sans JP',-apple-system,sans-serif;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;font-family:var(--sans);color:var(--text);background:var(--bg);line-height:1.8;}
a{color:var(--maroon);text-decoration:none;}
a:hover{text-decoration:underline;}

/* top identity bar */
.topbar{background:var(--navy-dark);color:#cdd6e3;font-size:0.72rem;padding:5px 20px;text-align:right;letter-spacing:.03em;}
.topbar .wrap{max-width:1100px;margin:0 auto;}

header.site-header{background:var(--navy);color:#fff;border-bottom:4px solid var(--maroon);}
.header-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:18px 20px 14px;}
.crest{width:40px;height:40px;flex:none;border-radius:50%;background:var(--maroon);display:flex;align-items:center;justify-content:center;
  font-family:var(--serif);font-weight:700;color:var(--gold);font-size:1.1rem;border:2px solid var(--gold);}
.brand{font-weight:700;color:#fff;font-size:1.05rem;font-family:var(--serif);line-height:1.4;}
.brand small{display:block;font-family:var(--sans);font-weight:400;font-size:0.68rem;color:#a9b8cf;letter-spacing:.04em;margin-top:2px;}

nav.mainnav{background:var(--navy-dark);}
nav.mainnav .navwrap{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;}
nav.mainnav details{position:relative;border-right:1px solid rgba(255,255,255,.08);}
nav.mainnav summary{list-style:none;cursor:pointer;padding:13px 18px;color:#e8ecf3;font-size:0.86rem;display:block;font-weight:500;transition:background .15s;}
nav.mainnav summary::-webkit-details-marker{display:none;}
nav.mainnav summary:hover{background:var(--maroon);color:#fff;}
nav.mainnav details[open] summary{background:var(--maroon);color:#fff;}
nav.mainnav .submenu{position:absolute;left:0;top:100%;background:#fff;border-top:3px solid var(--maroon);min-width:250px;box-shadow:0 10px 26px rgba(0,0,0,.18);z-index:20;}
nav.mainnav .submenu a{display:block;padding:11px 16px;color:var(--text);font-size:0.85rem;border-bottom:1px solid #f0ede6;}
nav.mainnav .submenu a:hover{background:#faf6ee;text-decoration:none;color:var(--maroon);}

main{max-width:1000px;margin:0 auto;padding:36px 20px 70px;}
.breadcrumb{font-size:0.8rem;color:var(--muted);margin-bottom:20px;}
.breadcrumb a{color:var(--muted);}
h1.page-title{font-family:var(--serif);font-size:1.65rem;color:var(--navy);border-left:6px solid var(--maroon);padding-left:16px;margin:0 0 28px;}
h2{font-family:var(--serif);font-size:1.3rem;color:var(--navy);margin-top:2.4em;padding-bottom:9px;border-bottom:2px solid var(--gold);}
h3{font-size:1.05rem;color:var(--maroon);font-weight:700;}

.hero{background:linear-gradient(155deg,var(--navy) 0%,var(--navy-dark) 60%,var(--maroon-dark) 130%);color:#fff;padding:64px 20px;text-align:center;position:relative;overflow:hidden;}
.hero::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(135deg,rgba(255,255,255,.03) 0 2px,transparent 2px 40px);}
.hero h1{position:relative;font-family:var(--serif);font-size:1.9rem;border:none;color:#fff;margin-bottom:14px;letter-spacing:.02em;}
.hero p{position:relative;max-width:680px;margin:0 auto;color:#dbe1ec;font-size:0.95rem;}
.hero .links{position:relative;}
.hero .links a{display:inline-block;margin:18px 6px 0;padding:11px 20px;background:var(--gold);color:#2b2200;border-radius:2px;font-size:0.83rem;font-weight:700;letter-spacing:.02em;transition:transform .15s;}
.hero .links a:hover{transform:translateY(-2px);text-decoration:none;background:#dab55c;}

.card{background:var(--card);border:1px solid var(--border);border-top:3px solid var(--navy);border-radius:2px;padding:20px;margin-bottom:14px;transition:box-shadow .15s;}
.card:hover{box-shadow:0 6px 18px rgba(13,43,82,.08);}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;}

.tag{display:inline-block;font-size:0.7rem;padding:2px 9px;border-radius:2px;background:#e9edf3;color:var(--navy);margin-right:4px;font-weight:600;letter-spacing:.02em;}
.tag.pearl{background:var(--gold);color:#2b2200;}
.tag.dd{background:#e5f0e8;color:#1e5c3a;}
.tag.stop{background:#f4e2e5;color:var(--maroon-dark);}
.tag.new{background:#dce9f5;color:#134a80;}

.seminar-list{list-style:none;padding:0;margin:0;}
.seminar-list li{padding:9px 0;border-bottom:1px dashed var(--border);}
.seminar-list a{font-weight:700;color:var(--navy);}
.seminar-list a:hover{color:var(--maroon);}
.category-block h2::before{content:'／ ';color:var(--maroon);}

.notice-item{display:flex;gap:14px;align-items:baseline;padding:13px 0;border-bottom:1px solid var(--border);}
.notice-date{color:var(--muted);white-space:nowrap;font-size:0.82rem;font-variant-numeric:tabular-nums;}
.notice-cat{font-size:0.68rem;background:var(--navy);color:#fff;padding:2px 7px;border-radius:2px;white-space:nowrap;}

table{border-collapse:collapse;width:100%;margin:1em 0;font-size:0.92rem;}
table td,table th{border:1px solid var(--border);padding:9px 12px;text-align:left;}
table th{background:#f0ece2;}
img{max-width:100%;height:auto;border-radius:2px;}

.prof-card{display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start;background:#faf8f3;border:1px solid var(--border);padding:20px;border-radius:2px;}
.prof-card img{width:150px;border-radius:2px;border:3px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.12);}

footer{background:var(--navy-dark);color:#aebbce;padding:40px 20px 24px;font-size:0.85rem;border-top:4px solid var(--maroon);}
footer .footer-inner{max-width:1100px;margin:0 auto;display:flex;justify-content:space-between;flex-wrap:wrap;gap:22px;}
footer a{color:#cdd7e6;}
footer strong{color:#fff;font-family:var(--serif);}

.sns a{margin-right:10px;}
.filterbar{margin-bottom:18px;font-size:0.85rem;color:var(--muted);border-left:3px solid var(--gold);padding-left:10px;}
.migration-note{background:#fdf6e5;border:1px solid #ecd58c;padding:10px 14px;font-size:0.78rem;border-radius:2px;margin-bottom:20px;color:#7a5c00;}
@media (max-width:640px){
  .header-inner{padding:14px 16px 10px;}
  nav.mainnav summary{padding:10px 12px;font-size:0.8rem;}
  .hero{padding:44px 16px;}
}
"""

def render_nav():
    out = ['<nav class="mainnav"><div class="navwrap">']
    for label, href, subs in NAV:
        if subs:
            out.append(f'<details><summary>{label}</summary><div class="submenu">')
            for slabel, shref in subs:
                out.append(f'<a href="{shref}">{slabel}</a>')
            out.append('</div></details>')
        else:
            out.append(f'<details><summary><a style="color:inherit" href="{href}">{label}</a></summary></details>')
    out.append('</div></nav>')
    return ''.join(out)

def base_page(title, body, breadcrumb='', depth=0):
    prefix = '../' * depth if depth else './'
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} | 慶應義塾大学経済学部ゼミナール委員会 KEIZEMI</title>
<style>{CSS}</style>
</head>
<body>
<div class="topbar"><div class="wrap">慶應義塾大学 経済学部ゼミナール委員会 Official Website</div></div>
<header class="site-header">
  <div class="header-inner">
    <div class="crest">慶</div>
    <a class="brand" href="{prefix}index.html">慶應義塾大学経済学部ゼミナール委員会<small>KEIZEMI — Keio University Economics Seminar Committee</small></a>
  </div>
  {render_nav()}
</header>
<main>
{f'<div class="breadcrumb">{breadcrumb}</div>' if breadcrumb else ''}
{body}
</main>
<footer>
  <div class="footer-inner">
    <div>
      <strong>慶應義塾大学経済学部ゼミナール委員会 KEIZEMI</strong><br>
      <a href="https://twitter.com/keizemi_offical">Twitter</a> ・
      <a href="https://www.instagram.com/keizemi_official/">Instagram</a>
    </div>
    <div>
      <a href="{prefix}about/index.html">委員会について</a><br>
      <a href="{prefix}seminar/index.html">研究会紹介</a><br>
      <a href="{prefix}about-seminar/index.html">入ゼミ</a><br>
      <a href="{prefix}activity/seasonal-events/index.html">ゼミ活動</a>
    </div>
    <div>
      <a href="{prefix}info/index.html">お知らせ/News</a><br>
      <a href="{prefix}link/index.html">関連リンク</a><br>
      <a href="{prefix}privacy-policy/index.html">プライバシーポリシー</a><br>
      <a href="{prefix}contact/index.html">お問い合わせ/Contact Us</a>
    </div>
  </div>
  <p style="margin-top:20px;opacity:.6">© 慶應義塾大学 経済学部ゼミナール委員会</p>
</footer>
</body>
</html>"""

def write(path, content):
    full = os.path.join(DIST, path.lstrip('/'))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, 'w', encoding='utf-8') as f:
        f.write(content)

print("Generator loaded OK")

# ---------- HOME ----------
recent = notices[:6]
notice_items = ''.join(
    f'<div class="notice-item"><span class="notice-date">{n["date"][:10]}</span>'
    f'<span class="notice-cat">{n["categories"][0][1] if n["categories"] else ""}</span>'
    f'<a href="/info/{n["slug"] or n["id"]}/index.html">{n["title"]}</a></div>' for n in recent
)
home_body = f"""
<div class="hero">
<h1>よりよいゼミ選びとゼミ生活を</h1>
<p>経済学部の各研究会間の親睦を図り、慶應義塾の興隆に寄与してまいります。<br>We will contribute to the unity of each research group in the major of economics.</p>
<div class="links">
<a href="/about-seminar/schedule/index.html">入ゼミスケジュール・行事の流れ</a>
<a href="/about-seminar/handout/index.html">入ゼミ関連配布資料</a>
<a href="/pearl/index.html">PEARL/DD</a>
</div>
</div>
<h2>新着情報</h2>
{notice_items}
<p><a href="/info/index.html">すべてのお知らせ →</a></p>
<h2>関連コンテンツ</h2>
<div class="grid">
<div class="card"><a href="/about-seminar/handout/index.html">入ゼミ配布資料</a><p>今年度の入ゼミに関する配布資料はこちら</p></div>
<div class="card"><a href="/seminar/index.html">研究会一覧</a><p>経済学部の全研究会をカテゴリー別に紹介しています</p></div>
<div class="card"><a href="/about-seminar/schedule/index.html">入ゼミの流れ</a><p>入ゼミスケジュール・行事の流れについて紹介しています</p></div>
<div class="card"><a href="/activity/seasonal-events/index.html">ゼミ活動</a><p>委員会企画のもと様々なゼミ活動を実施しています</p></div>
</div>
"""
write('/index.html', base_page('ホーム', home_body, depth=0))

# ---------- ABOUT pages ----------
about_p = pages['71']
about_body = f"""
<h1 class="page-title">委員会について</h1>
<h2>経済学部ゼミナール委員会とは</h2>
<p>経済学部ゼミナール委員会は、慶應義塾大学経済学部に設置されている各研究会に所属する学生全員により構成される学生団体です。<br>
経済学部の各研究会間の親睦を図り、慶應義塾の興隆に寄与することを以てその目的としています。</p>
<h3>組織理念</h3>
<p><strong>経済学部にいることに誇りをもって学ぶ学生を増やす</strong></p>
<h3>構成</h3>
<ul>
<li>会長： 駒形 哲哉 教授</li>
<li>構成員：経済学部研究会に所属する学生全員</li>
<li>代表者委員会：経済学部各研究会の代表者</li>
<li>常任委員会：構成員から選出された15名</li>
</ul>
<p><a href="/about/committee/index.html">常任委員の紹介</a></p>
<h3>活動内容</h3>
<ul>
<li>入ゼミ（説明会の実施、資料作成、オープンゼミなどの実施、試験の管理）</li>
<li>三田祭論文コンクール（各研究会の論文発表の場所確保、運営）</li>
<li>講演会（各種講演会の企画、運営）</li>
<li>ゼミ交流（ソフトボール大会など）</li>
</ul>
<h3>意義</h3>
<ul>
<li>経済学部として慶應義塾大学の興隆に寄与する</li>
<li>経済学部の研究会相互間の親睦を図る</li>
<li>研究会の広報活動や、入会手続きを補助する</li>
<li>必要に応じ、常任委員会での集会や、常任委員会が代表者委員会を招集し開催する総会を開く</li>
</ul>
<h3>組織文化</h3>
<ul><li>グループで楽しく</li><li>協力意識</li><li>リーダーシップ</li><li>誠実</li><li>責任感強く</li><li>貢献欲高く</li></ul>
<h3>財務報告</h3>
<p>経済学部ゼミナール委員会では、経済学部の研究会に所属する3年生から、経ゼミ費として毎年1人2,000円程度を徴収させていただいております。
経ゼミ費の主な用途は、春季・秋季ゼミ対抗球技大会の運営、三田祭・三田論発表会の運営、入ゼミ説明会・三田論発表会にて配布するパンフレットの印刷などです。</p>
<p><a href="/archive/financial-report/index.html">財務報告資料</a></p>
"""
write('/about/index.html', base_page('委員会について', about_body, '<a href="/index.html">ホーム</a> &raquo; 委員会について'))

committee_records = pages_grouped['584']['records']
committee_cards = ''
for r in committee_records:
    if not r.get('committee_position') and not r.get('committee_seminar'):
        continue
    committee_cards += f"""<div class="card">
<h3>{r.get('committee_position','')}</h3>
<p style="color:var(--muted)">{r.get('committee_seminar','').replace(chr(10),'<br>')}</p>
{r.get('committee_desc','')}
</div>"""
committee_body = f"""
<h1 class="page-title">常任委員紹介</h1>
<h2>2025年度常任委員の紹介</h2>
<div class="grid">{committee_cards}</div>
"""
write('/about/committee/index.html', base_page('常任委員紹介', committee_body, '<a href="/index.html">ホーム</a> &raquo; <a href="/about/index.html">委員会について</a> &raquo; 常任委員紹介'))

new_members_body = f"""
<h1 class="page-title">新規委員募集</h1>
{pages['707']['content']}
"""
write('/about/new-members/index.html', base_page('新規委員募集', new_members_body, '<a href="/index.html">ホーム</a> &raquo; <a href="/about/index.html">委員会について</a> &raquo; 新規委員募集'))

entry_body = f"""
<h1 class="page-title">新規委員エントリー</h1>
{pages['843']['content']}
"""
write('/about/entry/index.html', base_page('新規委員エントリー', entry_body, '<a href="/index.html">ホーム</a> &raquo; <a href="/about/index.html">委員会について</a> &raquo; 新規委員エントリー'))

print("About pages done")

# ---------- SEMINAR directory + detail pages ----------
CATEGORY_ORDER = ['経済理論','計量・統計','学史・思想史','経済史','産業・労働','制度・政策','現代経済','国際経済','環境関連','社会関連','その他']

published_seminars = [s for s in seminars if s['status'] == 'publish']

by_cat = {c: [] for c in CATEGORY_ORDER}
for s in published_seminars:
    by_cat.setdefault(s['category'], []).append(s)

def seminar_tags(s):
    tags = []
    if s['pearl']:
        tags.append('<span class="tag pearl">PEARL</span>')
    if s['recruit_status'] == '募集停止':
        tags.append('<span class="tag stop">募集停止</span>')
    elif s['recruit_status'] == '新規募集':
        tags.append('<span class="tag new">新規募集</span>')
    return ''.join(tags)

cat_blocks = ''
for cat in CATEGORY_ORDER:
    items = by_cat.get(cat, [])
    if not items:
        continue
    lis = ''.join(f'<li><a href="/seminar/{s["slug"]}/index.html">{s["title"]}</a> {seminar_tags(s)}</li>' for s in items)
    cat_blocks += f'<div class="category-block"><h2>{cat} <span style="font-size:.7rem;font-weight:400;color:var(--muted)">（{len(items)}）</span></h2><ul class="seminar-list">{lis}</ul></div>'

seminar_index_body = f"""
<h1 class="page-title">研究会一覧</h1>
<p class="filterbar">(P)：PEARL生の受け入れ有り　全{len(published_seminars)}研究会</p>
{cat_blocks}
"""
write('/seminar/index.html', base_page('研究会一覧', seminar_index_body, '<a href="/index.html">ホーム</a> &raquo; 研究会一覧'))

for s in published_seminars:
    sns = []
    if s['twitter']: sns.append(f'<a href="{s["twitter"]}">Twitter</a>')
    if s['instagram']: sns.append(f'<a href="{s["instagram"]}">Instagram</a>')
    if s['facebook']: sns.append(f'<a href="{s["facebook"]}">Facebook</a>')
    if s['website']: sns.append(f'<a href="{s["website"]}">研究会公式サイト</a>')
    sns_html = ' / '.join(sns)
    prof_img = img(s['professor_img_id'])
    gallery_img = img(s['gallery_image_id'])
    en_block = ''
    if s['pearl']:
        en_block = f"""
<h2>English / For PEARL・DD students</h2>
<p><strong>Category:</strong> {s['pearl']['category_en']}</p>
<p>{s['pearl']['professor_desc_en'].replace(chr(10),'<br>')}</p>
{f'<p><a href="{s["pearl"]["professor_link_en"]}">Professor profile (English)</a></p>' if s['pearl']['professor_link_en'] else ''}
"""
    body = f"""
<h1 class="page-title">{s['title']} {seminar_tags(s)}</h1>
<p><span class="tag">{s['category']}</span></p>
<div class="prof-card">
{f'<img src="{prof_img}" alt="{s["professor_name"]}">' if prof_img else ''}
<div>
<h3>{s['professor_name']} <span style="font-weight:400;color:var(--muted)">{s['professor_name_alpha']}</span></h3>
<p>{s['professor_desc'].replace(chr(10),'<br>')}</p>
{f'<p><a href="{s["professor_link"]}">教授プロフィール</a></p>' if s['professor_link'] else ''}
</div>
</div>
<h2>研究会紹介</h2>
<p>{s['intro'].replace(chr(10),'<br>')}</p>
{f'<img src="{gallery_img}" alt="{s["title"]}">' if gallery_img else ''}
<h2>SNS・関連リンク</h2>
<p>{sns_html if sns_html else 'なし'}</p>
{en_block}
"""
    write(f'/seminar/{s["slug"]}/index.html', base_page(s['title'], body, f'<a href="/index.html">ホーム</a> &raquo; <a href="/seminar/index.html">研究会一覧</a> &raquo; {s["title"]}', depth=2))

print("Seminar pages done:", len(published_seminars))

# ---------- ABOUT-SEMINAR (入ゼミ) ----------
write('/about-seminar/index.html', base_page('研究会（ゼミ）とは？',
    f'<h1 class="page-title">研究会（ゼミ）とは？</h1>{pages["73"]["content"] or "<p>研究会（ゼミ）とは、三田キャンパスにおける学生生活の中心となる、専門分野に特化した少人数制の授業形式です。指導教員のサポートのもと、学生自体が主体となってグループワークや討論などを通して専門的な知識を深めます。</p>"}',
    '<a href="/index.html">ホーム</a> &raquo; 入ゼミ'))

schedule_records = pages_grouped['1058']['records']
flow_items = ''
for r in schedule_records:
    if not r.get('flow_title'):
        continue
    fimg = img(r.get('flow_img',''))
    flow_items += f"""<div class="card">
<h3>{r.get('flow_timing','')} — {r.get('flow_title','')}</h3>
{f'<img src="{fimg}" style="max-width:320px">' if fimg else ''}
{r.get('flow_desc','')}
</div>"""
write('/about-seminar/schedule/index.html', base_page('入ゼミスケジュール・行事の流れ',
    f'<h1 class="page-title">入ゼミスケジュール・行事の流れ</h1>{flow_items}',
    '<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/index.html">入ゼミ</a> &raquo; スケジュール'))

session_records = pages_grouped['1491']['records']
session_items = ''.join(
    f'<div class="notice-item"><span class="notice-date">{r.get("update_info_date","")}</span>'
    f'<a href="{r.get("update_info_link","#")}">{r.get("update_info_title","")}</a></div>'
    for r in session_records if r.get('update_info_title')
)
write('/about-seminar/session/index.html', base_page('入ゼミ行事開催情報',
    f'<h1 class="page-title">入ゼミ行事開催情報</h1><h2>更新情報</h2>{session_items}',
    '<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/index.html">入ゼミ</a> &raquo; 行事開催情報'))

write('/about-seminar/examination/index.html', base_page('試験情報',
    f'<h1 class="page-title">試験情報</h1>{pages["1259"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/index.html">入ゼミ</a> &raquo; 試験情報'))

for letter, pid in [('a','1329'),('b','1331'),('c','1333')]:
    write(f'/about-seminar/examination/detail-{letter}/index.html', base_page(f'{letter.upper()}日程試験情報',
        f'<h1 class="page-title">{letter.upper()}日程試験情報</h1>{pages[pid]["content"]}',
        f'<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/examination/index.html">試験情報</a> &raquo; {letter.upper()}日程',
        depth=3))

handout_records = pages_grouped['139']['records']
handout_cats = {}
for r in handout_records:
    if not r.get('handout_name'):
        continue
    handout_cats.setdefault(r.get('handout_category','その他'), []).append(r)
handout_html = ''
for cat, items in handout_cats.items():
    handout_html += f'<h2>{cat}</h2><div class="grid">'
    for r in items:
        himg = img(r.get('handout_img',''))
        handout_html += f"""<div class="card">
{f'<img src="{himg}" style="max-height:120px">' if himg else ''}
<p><a href="{r.get('handout_link','#')}">{r.get('handout_name','')}</a></p>
</div>"""
    handout_html += '</div>'
write('/about-seminar/handout/index.html', base_page('配布資料',
    f'<h1 class="page-title">配布資料</h1>{handout_html}',
    '<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/index.html">入ゼミ</a> &raquo; 配布資料'))

previous_records = pages_grouped['1150']['records']
previous_items = ''.join(
    f'<li><a href="{img(r.get("previous_seminar_file",""))}">{r.get("previous_seminar_title","")}</a></li>'
    for r in previous_records if r.get('previous_seminar_title')
)
write('/about-seminar/previous/index.html', base_page('参考：過去の試験情報',
    f'<h1 class="page-title">参考：過去の試験情報</h1><ul>{previous_items}</ul>',
    '<a href="/index.html">ホーム</a> &raquo; <a href="/about-seminar/index.html">入ゼミ</a> &raquo; 過去の試験情報'))

print("about-seminar section done")

# ---------- ACTIVITY ----------
write('/activity/seasonal-events/index.html', base_page('春季・秋季イベント交流会',
    f'<h1 class="page-title">春季・秋季イベント交流会</h1>{pages["1544"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; ゼミ活動 &raquo; 春季・秋季イベント交流会'))
write('/activity/mitasai/index.html', base_page('三田祭論文',
    f'<h1 class="page-title">三田祭論文</h1>{pages["1524"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; ゼミ活動 &raquo; 三田祭論文'))

lecture_records = pages_grouped['1573']['records']
lecture_html = pages['1573']['content']
for r in lecture_records:
    if not r.get('lecture_title'):
        continue
    limg = img(r.get('lecture_img',''))
    lecture_html += f"""<div class="card">
<h3>{r.get('lecture_title','')}</h3>
{f'<img src="{limg}">' if limg else ''}
<p><strong>日時:</strong> {r.get('lecture_date','')} / <strong>場所:</strong> {r.get('lecture_place','')}</p>
<p><strong>テーマ:</strong> {r.get('lecture_theme','')}</p>
{r.get('lecture_desc','')}
<p><strong>ゲスト:</strong> {r.get('lecture_guest_name','')}</p>
{r.get('lecture_guste_profile','')}
{f'<p><a href="{r.get("lecture_pr")}">関連リンク</a></p>' if r.get('lecture_pr') else ''}
</div>"""
write('/activity/lecture/index.html', base_page('講演会', f'<h1 class="page-title">講演会</h1>{lecture_html}',
    '<a href="/index.html">ホーム</a> &raquo; ゼミ活動 &raquo; 講演会'))

# ---------- PEARL ----------
write('/pearl/index.html', base_page('PEARL/DD', f'<h1 class="page-title">PEARL/DD</h1>{pages["79"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD'))

pearl_seminars = [s for s in published_seminars if s['pearl']]
pearl_lis = ''.join(f'<li><a href="/seminar/{s["slug"]}/index.html">{s["pearl"]["title_en"]}</a> ({s["pearl"]["category_en"]})</li>' for s in pearl_seminars)
write('/pearl/pearl-seminar/index.html', base_page('Seminars for PEARL/DD',
    f'<h1 class="page-title">Seminars for PEARL/DD</h1><p>{len(pearl_seminars)} seminars accept PEARL/DD students.</p><ul>{pearl_lis}</ul>',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Seminars'))

write('/pearl/schedule/index.html', base_page('Schedule', f'<h1 class="page-title">Schedule</h1>{pages["1598"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Schedule'))
write('/pearl/examination/index.html', base_page('Examination', f'<h1 class="page-title">Examination</h1>{pages["1611"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Examination'))
for letter, pid in [('a','1615'),('b','1619'),('c','1621')]:
    write(f'/pearl/examination/detail-{letter}/index.html', base_page(f'Date {letter.upper()}',
        f'<h1 class="page-title">Date {letter.upper()}</h1>{pages[pid]["content"]}',
        f'<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Examination &raquo; Date {letter.upper()}', depth=3))
write('/pearl/previous/index.html', base_page('Previous Year Results', f'<h1 class="page-title">Previous Year Results</h1>{pages["1216"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Previous'))

pearl_handout_records = pages_grouped['1214']['records']
ph_html = ''
for r in pearl_handout_records:
    if not r.get('handout_name'):
        continue
    himg = img(r.get('handout_img',''))
    ph_html += f"""<div class="card">{f'<img src="{himg}" style="max-height:120px">' if himg else ''}
<p style="font-size:.8rem;color:var(--muted)">{r.get('handout_category','')}</p>
<p><a href="{r.get('handout_link','#')}">{r.get('handout_name','')}</a></p></div>"""
write('/pearl/handout/index.html', base_page('Handout', f'<h1 class="page-title">Handout</h1><div class="grid">{ph_html}</div>',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Handout'))

write('/pearl/event-meeting/index.html', base_page('Event meeting', f'<h1 class="page-title">Event meeting</h1>{pages["2011"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; PEARL/DD &raquo; Event meeting'))

print("activity + pearl sections done")

# ---------- ARCHIVE ----------
write('/archive/index.html', base_page('資料アーカイブ',
    '<h1 class="page-title">資料アーカイブ</h1><ul>'
    '<li><a href="/archive/past-activity/index.html">入ゼミ・ゼミ活動</a></li>'
    '<li><a href="/archive/poster/index.html">講演会ポスター</a></li>'
    '<li><a href="/archive/financial-report/index.html">財務報告資料</a></li>'
    '<li><a href="/archive/committee-document/index.html">委員会活動資料</a></li></ul>',
    '<a href="/index.html">ホーム</a> &raquo; アーカイブ'))

past_records = pages_grouped['133']['records']
past_by_year = {}
for r in past_records:
    if not r.get('activity_name'):
        continue
    past_by_year.setdefault(r.get('activity_year','その他'), []).append(r)
past_html = ''
for year, items in past_by_year.items():
    past_html += f'<h2>{year}</h2><ul>'
    for r in items:
        f_url = img(r.get('activity_file',''))
        name = r['activity_name']
        entry = f'<a href="{f_url}">{name}</a>' if f_url else name
        past_html += f'<li>{entry}</li>'
    past_html += '</ul>'
write('/archive/past-activity/index.html', base_page('入ゼミ・ゼミ活動', f'<h1 class="page-title">入ゼミ・ゼミ活動</h1>{past_html}',
    '<a href="/index.html">ホーム</a> &raquo; アーカイブ &raquo; 入ゼミ・ゼミ活動'))

poster_records = pages_grouped['1232']['records']
poster_html = ''
for r in poster_records:
    if not r.get('poster_title'):
        continue
    pimg = img(r.get('poster_img',''))
    poster_html += f"""<div class="card">{f'<img src="{pimg}">' if pimg else ''}
<p style="font-size:.8rem;color:var(--muted)">{r.get('poster_year','')}</p>
<h3>{r.get('poster_title','')}</h3>{r.get('poster_desc','')}</div>"""
write('/archive/poster/index.html', base_page('講演会ポスター', f'<h1 class="page-title">講演会ポスター</h1><div class="grid">{poster_html}</div>',
    '<a href="/index.html">ホーム</a> &raquo; アーカイブ &raquo; 講演会ポスター'))

fin_records = pages_grouped['77']['records']
fin_by_year = {}
for r in fin_records:
    if not r.get('document_name'):
        continue
    fin_by_year.setdefault(r.get('document_year','その他'), []).append(r)
fin_html = ''
for year, items in fin_by_year.items():
    fin_html += f'<h2>{year}</h2><ul>'
    for r in items:
        f_url = img(r.get('document_file',''))
        name = r['document_name']
        entry = f'<a href="{f_url}">{name}</a>' if f_url else name
        fin_html += f'<li>{entry}</li>'
    fin_html += '</ul>'
write('/archive/financial-report/index.html', base_page('財務報告資料', f'<h1 class="page-title">財務報告資料</h1>{fin_html}',
    '<a href="/index.html">ホーム</a> &raquo; アーカイブ &raquo; 財務報告資料'))

write('/archive/committee-document/index.html', base_page('委員会活動資料',
    '<h1 class="page-title">委員会活動資料</h1><p>準備中です。</p>',
    '<a href="/index.html">ホーム</a> &raquo; アーカイブ &raquo; 委員会活動資料'))

# ---------- SIMPLE PAGES ----------
write('/contact/index.html', base_page('お問い合わせ/Contact Us', f'<h1 class="page-title">お問い合わせ/Contact Us</h1>{pages["81"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; お問い合わせ'))
write('/link/index.html', base_page('関連リンク', f'<h1 class="page-title">関連リンク</h1>{pages["1862"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; 関連リンク'))
write('/privacy-policy/index.html', base_page('プライバシーポリシー', f'<h1 class="page-title">プライバシーポリシー</h1>{pages["3"]["content"]}',
    '<a href="/index.html">ホーム</a> &raquo; プライバシーポリシー'))

print("archive + simple pages done")

# ---------- NOTICES (info) ----------
notice_all_items = ''
for n in notices:
    cat = n['categories'][0][1] if n['categories'] else ''
    slug = n['slug'] or n['id']
    notice_all_items += f'<div class="notice-item"><span class="notice-date">{n["date"][:10]}</span><span class="notice-cat">{cat}</span><a href="/info/{slug}/index.html">{n["title"]}</a></div>'
write('/info/index.html', base_page('お知らせ一覧', f'<h1 class="page-title">お知らせ一覧</h1>{notice_all_items}',
    '<a href="/index.html">ホーム</a> &raquo; お知らせ一覧'))

for n in notices:
    slug = n['slug'] or n['id']
    cat = n['categories'][0][1] if n['categories'] else ''
    body = f"""<h1 class="page-title">{n['title']}</h1>
<p class="notice-cat">{cat} ・ {n['date'][:10]}</p>
<div>{n['content']}</div>
"""
    write(f'/info/{slug}/index.html', base_page(n['title'], body,
        f'<a href="/index.html">ホーム</a> &raquo; <a href="/info/index.html">お知らせ一覧</a> &raquo; {n["title"]}', depth=2))

print("Notices done:", len(notices))

import subprocess
total = subprocess.run(['find', DIST, '-name', '*.html'], capture_output=True, text=True).stdout.strip().split('\n')
print("TOTAL HTML FILES:", len(total))
