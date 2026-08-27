# Simple Editing Guide

This guide is for collaborators making small content or design changes to the KEIZEMI website.

## Recommended workflow

1. Create a new branch for your change.
2. Edit only the files related to your task.
3. Preview the website locally when possible.
4. Open a pull request and describe what changed.
5. Ask the site owner or Codex to preview and publish the approved version.

For very small text corrections, you can edit a file directly on GitHub with the pencil button. Choose **Create a new branch for this commit and start a pull request** instead of committing directly to `main`.

## Where to edit

| Change | File |
| --- | --- |
| Homepage text, sections, buttons, and links | `app/page.tsx` |
| Colours, fonts, spacing, and responsive design | `app/globals.css` |
| Browser title and social-sharing description | `app/layout.tsx` |
| News articles | `content/posts.json` |
| Japanese seminar information | `content/seminars.json` |
| PEARL / Double Degree seminar information | `content/pearl-seminars.json` |
| General information pages | `content/pages.json` |
| Homepage news and seminar search summaries | `content/site-index.json` |
| Social-sharing image | `public/og.png` |

## Important content rule

Homepage summaries are stored separately from the full entries:

- When changing a news article in `content/posts.json`, update the matching item under `posts` in `content/site-index.json` if its title, date, category, or excerpt changed.
- When changing a Japanese seminar in `content/seminars.json`, update the matching item under `seminars` in `content/site-index.json` if its name, field, status, PEARL/DD availability, or excerpt changed.

If you are unsure, ask Codex to make the change so both files stay synchronized.

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

GitHub stores and reviews the source code. It is not the live hosting service for this project. Merging a pull request does not update the live website until the approved source is published through Sites.
