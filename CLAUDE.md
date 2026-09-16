# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, minimalist single-page portfolio website built with Astro and Tailwind CSS v4. All content is driven by a single configuration file (`src/config.ts`), making customization simple without touching component code. Deployed automatically to GitHub Pages on push to `master`.

**Live site:** `roncax.github.io/portfolio`

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro v5.12.3 (static site generator) |
| Styling | Tailwind CSS v4.1.11 via `@tailwindcss/vite` |
| Language | TypeScript (strict mode) |
| Font | IBM Plex Mono from Google Fonts |
| Icons | Custom inline SVG (no icon library dependency) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server (localhost)
npm run build     # Build for production → dist/
npm run preview   # Preview production build locally
npm run astro     # Direct Astro CLI access
```

No linting or testing framework is configured. The project is purely a static site with no backend or database.

## Repository Layout

```
portfolio/
├── src/
│   ├── config.ts          # ALL content lives here — single source of truth
│   ├── pages/
│   │   └── index.astro    # Main page — composes all section components
│   ├── components/
│   │   ├── Header.astro   # Sticky nav with scroll-aware backdrop blur
│   │   ├── Hero.astro     # Name, title, social links, fade-in animations
│   │   ├── About.astro    # Bio text + skill badges
│   │   ├── Projects.astro # Project cards (hidden if projects array is empty)
│   │   ├── Experience.astro # Timeline with SVG background pattern
│   │   ├── Education.astro  # Education entries
│   │   └── Footer.astro   # Nav links + contact info
│   └── styles/
│       └── global.css     # Tailwind imports + body font
├── public/
│   ├── avatar.jpg         # Profile photo
│   ├── resume.pdf         # Downloadable resume
│   └── favicon.svg
├── astro.config.mjs       # Astro + Tailwind vite plugin config, GitHub Pages base URL
├── tsconfig.json          # Extends astro/tsconfigs/strict
└── package.json
```

## Architecture

### Configuration-Driven Design

**All content lives in `src/config.ts`.** Components never hard-code content — they import and render from `siteConfig`. To update the portfolio, only `src/config.ts` needs to change.

```typescript
// src/config.ts shape
export const siteConfig = {
  name: string,
  title: string,
  description: string,
  accentColor: string,      // hex color — propagates site-wide via CSS var --accent-color
  photo: string,            // path relative to public/
  resume: string,           // path relative to public/
  social: {
    email?: string,
    linkedin?: string,
    twitter?: string,
    github?: string,
  },
  aboutMe: string,
  skills: string[],
  projects: Array<{ name, description, link?, skills? }>,
  experience: Array<{ company, title, dateRange, bullets: string[] }>,
  education: Array<{ school, degree, dateRange, achievements: string[] }>,
}
```

### Conditional Rendering

Sections automatically hide when their data arrays are empty:
- `Projects` section: hidden if `projects.length === 0`
- `Experience` section: hidden if `experience.length === 0`
- `Education` section: hidden if `education.length === 0`
- Social links: each renders only if the corresponding field is set

### Accent Color System

`siteConfig.accentColor` is injected as `--accent-color` CSS custom property in `index.astro`. Components reference `var(--accent-color)` for themed elements. Change `accentColor` in config to retheme the entire site.

## Component Conventions

- All components are `.astro` files — no React, Vue, or other UI frameworks
- Styling is done exclusively with Tailwind utility classes (no custom CSS beyond global.css)
- Maintain the monospace aesthetic (`font-mono` / IBM Plex Mono)
- When adding icons, use inline SVG to avoid adding icon library dependencies
- Components use `---` frontmatter blocks for TypeScript imports

## Deployment

Push to `master` → GitHub Actions builds (`npm ci && npm run build`) → deploys `dist/` to GitHub Pages.

The `astro.config.mjs` sets:
```js
site: "https://roncax.github.io"
base: "portfolio"
```

If deploying to a different URL or repo name, both values must be updated.

## Common Tasks

**Update portfolio content:** Edit `src/config.ts` only.

**Change theme color:** Update `accentColor` hex value in `src/config.ts`.

**Add a new section:** Create a component in `src/components/`, add its data shape to `siteConfig` in `config.ts`, import and render in `src/pages/index.astro`.

**Replace profile photo:** Overwrite `public/avatar.jpg`.

**Replace resume:** Overwrite `public/resume.pdf`.

**Change deployment target:** Update `site` and `base` in `astro.config.mjs`.
