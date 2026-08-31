# Simple Editing Guide

This guide is for collaborators making small content or design changes to the KEIZEMI website.

## Recommended workflow

1. Create a new branch for your change.
2. Edit only the files related to your task.
3. Preview the website locally when possible.
4. Open a pull request and describe what changed.
5. Merge the approved pull request into `main`. GitHub automatically builds and publishes the public Pages website.

For very small text corrections, you can edit a file directly on GitHub with the pencil button. Choose **Create a new branch for this commit and start a pull request** instead of committing directly to `main`.

## Where to edit

| Change | File |
| --- | --- |
| Homepage text, sections, buttons, and links | `app/page.tsx` |
| Colours, fonts, spacing, and responsive design | `app/globals.css` |
| Browser title and social-sharing description | `app/layout.tsx` |
| News articles | One file per article in `content/news/` |
| Japanese seminar information | One file per seminar in `content/seminars/` |
| PEARL / Double Degree seminar information | One file per seminar in `content/pearl-seminars/` |
| General information pages | `content/pages.json` |
| Social-sharing image | `public/og.png` |

## Important content rule

Generated summaries in `content/generated/` are rebuilt automatically. Do not edit those generated files by hand.

Each seminar detail page keeps its content separate from the layout. Edit `contentHtml` for the seminar introduction, `seminarImage` for the group photo, `professorImage` for the portrait, and `professorMessage` for the professor's short message. Images belong in `public/uploads/`; store `/uploads/...` as the content path.

## Editing JSON safely

The files in `content/` use JSON formatting. Keep these rules in mind:

- Text must stay inside double quotes.
- Items are separated by commas.
- Do not delete an `id` or `slug` unless you intend to change a page address.
- Use `true` or `false` without quotation marks for PEARL/DD fields.
- Check that quotation marks inside text are escaped as `\"`.

## Useful requests for Codex

- “Update the Sato Yuki seminar description with the following text.”
- “Add a news article dated 2026-09-10 and update the homepage.”
- “Change the main colour without changing the content.”
- “Preview this pull request and tell me what changed.”
- “Publish the approved GitHub version to the live KEIZEMI site.”

## What not to commit

Do not commit passwords, API keys, access tokens, `.env` files, `node_modules`, or generated build folders. The repository's `.gitignore` already excludes the common local and generated files.

## Publication note

Merging into `main` automatically updates the public GitHub Pages website at `https://seoyeon041206.github.io/keizemi-website/` after the deployment workflow finishes.

The owner-only Sites copy is a separate deployment. Ask the site owner or Codex to publish there when that private copy also needs the approved change.
