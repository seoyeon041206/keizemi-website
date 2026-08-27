# KEIZEMI 새 홈페이지 — 배포 가이드

이 폴더 자체가 완성된 정적 사이트야 (`index.html`이 루트에 있음). 별도 빌드 과정 없이
그대로 GitHub Pages나 Cloudflare Pages에 올리면 돼.

## 1. GitHub repo에 push하기

터미널에서 이 폴더 안으로 들어가서:

```bash
git init
git add .
git commit -m "Initial migration from WordPress"
git branch -M main
```

그다음 GitHub에서 새 repo를 만들어 (조직 계정으로 만들 것을 추천 — 아래 "관리" 참고):

```bash
git remote add origin https://github.com/<조직 또는 계정명>/<repo이름>.git
git push -u origin main
```

(`gh` CLI가 있으면 `gh repo create <repo이름> --public --source=. --push` 한 줄로도 가능)

## 2-A. GitHub Pages로 공개하기

1. GitHub repo → **Settings → Pages**
2. **Build and deployment → Source**에서 **"GitHub Actions"** 선택
3. 이미 넣어둔 `.github/workflows/gh-pages.yml`이 자동으로 실행돼서
   `https://<계정명>.github.io/<repo이름>/` 로 배포됨
4. 몇 분 뒤 Settings → Pages 화면에 실제 URL이 표시됨

## 2-B. Cloudflare로 공개하기

⚠️ **업데이트**: Cloudflare Pages는 현재 레거시로 밀리는 추세이고, Cloudflare는 이제
정적 사이트도 **"Workers + 정적 Assets"** 방식으로 배포하는 걸 공식 권장하고 있어
(`wrangler pages deploy`가 아니라 `wrangler deploy`). 이 repo의 `wrangler.jsonc`는
이미 그 방식으로 설정해뒀어.

**방법 1: CLI로 바로 올리기 (제일 빠름, GitHub 없어도 됨)**
```bash
npm install -g wrangler@^4
wrangler login
wrangler deploy
```
`wrangler.jsonc`에 설정이 이미 있어서 바로 `https://keizemi.<계정서브도메인>.workers.dev` 로
공개됨. 커스텀 도메인은 나중에 Cloudflare 대시보드에서 이 Worker에 연결하면 됨.

**방법 2: 대시보드에서 GitHub 연결 (자동 재배포)**
1. https://dash.cloudflare.com → Compute (Workers) → Create → **Import a repository**
   (예전엔 "Pages → Connect to Git"였는데 지금은 Workers 쪽으로 통합됨. 화면 이름이
   다르면 Cloudflare 문서에서 최신 경로 확인 권장)
2. GitHub repo 선택 → 설정 자동 인식 (`wrangler.jsonc` 인식)
3. Deploy → 이후 GitHub push마다 자동 재배포

**참고**: Claude(나)는 이 작업을 대신 실행해줄 수 없어 — 연결 가능한 Cloudflare
커넥터는 D1/KV/R2 등 리소스 "조회"만 되고 배포 도구는 없음. 위 명령어를 직접
터미널에서 실행해야 해.

## 관리 (권장)

- 개인 계정 대신 **GitHub Organization**(예: `keio-keizemi`)을 만들어서 그 안에 repo 생성
- 매년 위원 인수인계 시 Organization 멤버만 갈아끼우면 접근 권한 관리가 깔끔함

## 폴더 구조

- `index.html`, `about/`, `seminar/`, `about-seminar/`, `activity/`, `pearl/`, `archive/`,
  `info/`, `contact/`, `link/`, `privacy-policy/` — 실제 사이트 페이지
- `data/` — WordPress에서 뽑아낸 구조화 JSON (연구회 80개, 공지 68건 등)
- `_generator/` — 이 데이터를 HTML로 만든 파이썬 스크립트 (새 export로 재생성할 때 사용)
- `README.md` — 마이그레이션 상세 노트 (이미지 이관 등 남은 작업)

## 남은 작업

이미지가 아직 옛날 서버(`keizemi-keio.info`) URL을 그대로 가리키고 있어서,
Sakura 서버 접속 가능할 때 `/wp-content/uploads/` 폴더를 통째로 받아서 이 repo에
넣고 경로를 상대경로로 바꿔야 완전히 독립돼. (자세한 내용은 `README.md` 참고)
