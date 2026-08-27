# KEIZEMI Website

Independent website for the Keio University Faculty of Economics Seminar Committee.

This repository contains the website source, imported announcements, information pages, Japanese seminar listings, and PEARL / Double Degree seminar listings. It does not depend on the former WordPress website.

## For collaborators

Start with [EDITING_GUIDE.md](EDITING_GUIDE.md). It explains which files control each part of the website, how to make small edits safely, and how to request publication.

## Local preview

Requirements: Node.js 22 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in a browser.

Before requesting publication, verify the production build:

```bash
pnpm build
```

## Publishing

Changes pushed to GitHub do not automatically update the live website. After a change is reviewed, ask the site owner or Codex to preview and publish the latest version through Sites.
