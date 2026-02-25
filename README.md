# Curated Skills

A production-ready Astro + Cloudflare site for browsing, inspecting, and downloading coding-agent skills stored in `src/skills`.

It builds a public catalog directly from the filesystem and exposes:

- a browsable skills index
- per-skill detail pages with `SKILL.md` previews
- direct file downloads
- ZIP downloads for complete skill packages

## Features

- Filesystem-driven skill discovery from `src/skills/*`
- Static generation (`prerender`) for skill pages and download routes
- Syntax-highlighted `SKILL.md` previews (Shiki)
- Per-file and per-skill ZIP download endpoints
- Tailwind CSS v4 styling
- Cloudflare adapter + Wrangler deploy workflow

## Tech Stack

- [Astro](https://astro.build/)
- [Cloudflare Adapter for Astro](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSZip](https://stuk.github.io/jszip/)
- [Shiki](https://shiki.style/)

## Requirements

- Node.js 20+ (recommended)
- `pnpm`
- Cloudflare account + Wrangler auth (for deploy/preview via `wrangler dev`)

## Quick Start

```sh
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

## Scripts

All commands run from the repository root:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start Astro dev server |
| `pnpm build` | Build the site for production |
| `pnpm preview` | Build, then run locally with `wrangler dev` |
| `pnpm deploy` | Build, then deploy to Cloudflare Workers |
| `pnpm cf-typegen` | Regenerate Cloudflare Worker type definitions |
| `pnpm astro -- --help` | Astro CLI help |

## Project Structure

```text
.
├── public/                     # Static assets
├── src/
│   ├── components/             # UI components
│   ├── layouts/                # Astro layouts
│   ├── lib/                    # Skill indexing, file loading, helpers
│   ├── pages/
│   │   ├── index.astro         # Skills catalog homepage
│   │   ├── skills/[skill]/     # Per-skill detail page
│   │   ├── download/[skill]/   # Per-file download route
│   │   └── download-skill/     # ZIP download route
│   └── skills/                 # Published skill packages (source of truth)
├── astro.config.mjs
├── package.json
└── worker-configuration.d.ts
```

## How Skills Are Indexed

The app scans `src/skills` and treats each top-level directory as a skill package.

- `SKILL.md` is used as the primary skill document when present
- skill metadata is read from `SKILL.md` frontmatter (for example: `name`, `description`, `license`)
- non-hidden files are included in browsing and download routes
- hidden files/directories are skipped

## Adding a New Skill

1. Create a folder under `src/skills/<your-skill-name>/`.
2. Add a `SKILL.md` file (recommended) with frontmatter and usage instructions.
3. Add any supporting files such as `scripts/`, `templates/`, or `references/`.
4. Run `pnpm dev` and verify the skill appears on the homepage.

Minimal `SKILL.md` example:

```md
---
name: My Skill
description: What this skill does and when to use it.
license: MIT
---

# My Skill

Instructions go here.
```

## Deployment (Cloudflare)

This project is configured with the Astro Cloudflare adapter and Wrangler scripts.

1. Authenticate Wrangler: `pnpm dlx wrangler login` (or `wrangler login`)
2. Configure your Worker/project settings (for example via `wrangler.jsonc` if you use one)
3. Deploy: `pnpm deploy`

For local Cloudflare-style preview, use `pnpm preview`.

## Notes on Licensing

- The repository source code is licensed under MIT (see [`LICENSE`](./LICENSE)).
- Individual skill packages may declare their own license metadata and/or include their own license files.

## Contributing

Contributions are welcome for:

- new skills
- improvements to skill metadata and documentation
- UI/UX improvements to browsing and downloads
- bug fixes and performance improvements

Before opening a PR, run:

```sh
pnpm build
```

