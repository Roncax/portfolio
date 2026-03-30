# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, minimalist portfolio website built with Astro and Tailwind CSS v4. All content is driven by a single configuration file (`src/config.ts`), making it easy to customize without touching component code. The site is deployed to GitHub Pages at `https://roncax.github.io/portfolio/`.

## Tech Stack

- **Astro 5.x**: Static site generator — all components are `.astro` files (no React/Vue/etc.)
- **Tailwind CSS v4**: Utility-first CSS via the `@tailwindcss/vite` plugin (no `tailwind.config.*` file)
- **TypeScript**: Used for the config file; strict mode enabled
- **Inline SVG icons**: All icons are hand-written inline SVGs — there is no external icon library

## Development Commands

```bash
npm run dev       # Start development server (http://localhost:4321)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview the production build locally
```

## Deployment

- **Trigger**: GitHub Actions workflow at `.github/workflows/deploy.yml` — runs on every push to `master` or manual dispatch
- **Target**: GitHub Pages at `https://roncax.github.io/portfolio/`
- **Base path**: `/portfolio` — configured in `astro.config.mjs` as `base: '/portfolio'`
- **Asset paths**: All asset URLs use `import.meta.env.BASE_URL` with trailing-slash stripping (`.replace(/\/$/, '')`) to avoid double slashes

## Directory Structure

```
portfolio/
├── .github/workflows/deploy.yml   # CI/CD pipeline
├── public/                        # Static assets (copied as-is)
│   ├── avatar.jpg                 # Profile photo
│   ├── favicon.svg                # Site favicon
│   └── resume.pdf                 # Downloadable resume
├── src/
│   ├── components/                # One .astro file per page section
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   └── Footer.astro
│   ├── pages/
│   │   └── index.astro            # Root page — imports and arranges all components
│   ├── styles/
│   │   └── global.css             # @import "tailwindcss" + body font override
│   └── config.ts                  # Single source of truth for all content
├── astro.config.mjs               # Astro + Tailwind Vite plugin config
├── tsconfig.json                  # TypeScript strict config
└── package.json
```

## Architecture

### Key Architectural Decisions

1. **Single Configuration File**: All content and customization lives in `src/config.ts`. Components never contain hardcoded content.
2. **Conditional Rendering**: Sections automatically hide when their data arrays are empty (e.g., `projects: []` hides the Projects section entirely).
3. **Component Independence**: Each component imports `siteConfig` directly and is fully self-contained.
4. **Accent Color System**: The single `accentColor` hex value from config is injected as a `style="--accent-color: ..."` attribute and consumed as a CSS custom property throughout components.

## Component Reference

| Component | Responsibility |
|---|---|
| `Header.astro` | Fixed top nav with smooth-scroll links; hides links for empty sections; hidden on mobile (`hidden md:block`) |
| `Hero.astro` | Full-height landing section with name, title, social links, resume download, and decorative SVG background |
| `About.astro` | Profile photo + bio text + skill tags in a two-column layout |
| `Projects.astro` | Numbered project cards with description, optional link, and skill tags; hidden when `projects` is empty |
| `Experience.astro` | Timeline-style work history with connecting lines and accent-colored dots |
| `Education.astro` | Card layout for degrees and achievements |
| `Footer.astro` | Social links, navigation links, copyright, and decorative SVG pattern |

## Configuration Structure

`src/config.ts` exports a single `siteConfig` object:

```typescript
{
  name: string           // Full name (used in Hero, Header, Footer)
  title: string          // Subtitle/tagline shown in Hero
  description: string    // HTML meta description
  accentColor: string    // Hex color (e.g. "#1d4ed8") used site-wide
  photo: string          // Path to avatar image in public/ (e.g. "/avatar.jpg")
  resume: string         // Path to resume PDF in public/ (e.g. "/resume.pdf")
  social: {
    email?: string       // Optional — omit to hide email link
    linkedin?: string    // Optional — full URL
    twitter?: string     // Optional — full URL
    github?: string      // Optional — full URL
  }
  aboutMe: string        // Bio paragraph shown in About section
  skills: string[]       // Skill tags shown in About section
  projects: Array<{
    name: string
    description: string
    link?: string        // Optional external link
    skills: string[]     // Tags shown on the project card
  }>
  experience: Array<{
    company: string
    title: string
    dateRange: string    // e.g. "06/2024 - Present"
    bullets: string[]    // Responsibility bullets
  }>
  education: Array<{
    school: string
    degree: string
    dateRange: string    // e.g. "2021"
    achievements: string[]
  }>
}
```

**Conditional rendering rules:**
- `projects: []` → Projects section and its nav link are hidden
- `experience: []` → Experience section and its nav link are hidden
- `education: []` → Education section and its nav link are hidden
- Any optional `social.*` field omitted → that icon is not rendered

## Styling & CSS Conventions

- **Global CSS** (`src/styles/global.css`): Contains only `@import "tailwindcss"` and a body font override (IBM Plex Mono from Google Fonts)
- **Tailwind v4**: No `tailwind.config.*` file — configuration is handled by the `@tailwindcss/vite` plugin in `astro.config.mjs`
- **Component styles**: Animations and non-utility styles are defined in `<style>` blocks within each `.astro` component
- **Accent color**: Applied via inline `style` attribute as `--accent-color`; referenced in components with `style="color: var(--accent-color)"`
- **Font**: IBM Plex Mono is the sole typeface, loaded from Google Fonts in `index.astro`

## Animation System

Fade-in animations are defined per-component using a `@keyframes fadeIn` rule:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Staggered delays are applied to create sequential appearance:
- First element: `animation-delay: 0.2s`
- Second element: `animation-delay: 0.4s`
- Third element: `animation-delay: 0.6s`
- Duration: `0.8s`, timing: `ease-out`, `animation-fill-mode: both`

## Asset Handling

All static assets live in `public/` and are referenced using `import.meta.env.BASE_URL`:

```astro
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
// Usage:
<img src={`${base}/avatar.jpg`} />
<a href={`${base}/resume.pdf`}>Resume</a>
```

The `.replace(/\/$/, '')` strips the trailing slash from the base URL to prevent double slashes like `/portfolio//avatar.jpg`.

## Responsive Design Patterns

- **Mobile-first**: Base styles target mobile; `sm:`, `md:`, `lg:`, `xl:` breakpoints add complexity
- **Header**: Hidden on mobile with `hidden md:block` — no mobile nav menu exists
- **Layouts**: Single column on mobile → 12-column CSS grid on `lg:` (typically 4-col sidebar + 8-col content)
- **Spacing**: Padding scales from `p-2` (mobile) → `p-3` (sm) → `p-6` (lg)
- **Typography**: Font sizes increase at `sm:` and `lg:` breakpoints for headings

## Working with Components

**Do:**
- Read from `siteConfig` for all content — never hardcode text in components
- Use Tailwind utility classes for all styling
- Use inline SVGs for any new icons to stay consistent
- Add `<style>` blocks inside `.astro` files for keyframe animations or one-off styles
- Follow the mobile-first responsive pattern

**Don't:**
- Add external icon libraries — use inline SVGs instead
- Create a `tailwind.config.*` file — Tailwind v4 does not use one
- Add React/Vue/Svelte components — this is a pure Astro site
- Hardcode personal information in components — put it in `src/config.ts`
- Add a new section without also adding a conditional nav link in `Header.astro` and `Footer.astro`

## Important Implementation Details

- **No linting or testing framework** is configured — there are no `lint` or `test` npm scripts
- **TypeScript strict mode** is enabled in `tsconfig.json`
- The Experience timeline uses `position: relative` on the container with `position: absolute` dots and vertical connecting lines; the last item omits the line
- The Hero section includes a decorative background pattern made of programming symbols (`{`, `}`, `</>`, etc.) as an absolutely-positioned SVG
- Social links render conditionally: each link checks for the presence of its config value before rendering
