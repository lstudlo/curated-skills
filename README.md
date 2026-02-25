# Curated Skills

A curated collection of coding-agent skills for AI development workflows. Browse, inspect, and download skills directly from this repository.

## What's Here

This repository contains a catalog of reusable skills designed for AI coding agents. Each skill includes:

- **Documentation** (`SKILL.md`) - Purpose, usage instructions, and examples
- **Source files** - Scripts, templates, and references
- **Metadata** - Dependencies, configuration, and integration notes

Browse the skills online at the [live demo](https://your-site.com) or explore them directly in the `src/skills` directory.

## Available Skills

Visit the homepage to see all available skills, or browse them in `src/skills/`. Each skill is self-contained and can be downloaded individually.

## Using Skills

Skills are designed to be integrated into your AI agent workflows. Most skills include:

1. A `SKILL.md` file with documentation
2. Required scripts and dependencies
3. Usage examples and configuration

Download any skill as a ZIP file or inspect its files directly on the site.

---

## Development

If you're interested in running this site locally or contributing skills:

```sh
pnpm install
pnpm dev
```

Open `http://localhost:4321` to view the skills catalog.

### Adding a New Skill

1. Create a folder under `src/skills/<your-skill-name>/`
2. Add a `SKILL.md` file with frontmatter:

```md
---
name: My Skill
description: What this skill does and when to use it.
license: MIT
---

# My Skill

Documentation goes here.
```

3. Add any supporting files (scripts, templates, references)
4. Run `pnpm dev` to verify it appears on the homepage

### Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shiki](https://shiki.style/) - Syntax highlighting

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

