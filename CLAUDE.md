# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern, minimalist portfolio website built with Astro and Tailwind CSS v4. All content is driven by a single configuration file (`src/config.ts`), making it easy to customize without touching component code. The site is deployed to GitHub Pages at `https://roncax.github.io/portfolio/`, and supports both light and dark themes.

## Tech Stack

- **Astro 5.x**: Static site generator — all components are `.astro` files (no React/Vue/etc.)
- **Tailwind CSS v4**: Utility-first CSS via the `@tailwindcss/vite` plugin (no `tailwind.config.*` file)
- **TypeScript**: Used for the config file; strict mode enabled
- **Inline SVG icons**: All icons are hand-written inline SVGs — there is no external icon library

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server (http://localhost:4321)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview the production build locally
npm run astro     # Direct Astro CLI access
```

No linting or testing framework is configured — there are no `lint` or `test` npm scripts.

## Deployment

- **Trigger**: GitHub Actions workflow at `.github/workflows/deploy.yml` — runs on every push to `master` or manual dispatch
- **Target**: GitHub Pages at `https://roncax.github.io/portfolio/`
- **Base path**: `astro.config.mjs` sets `site: "https://roncax.github.io"` and `base: "portfolio"` (no leading/trailing slashes)
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
│   │   ├── Footer.astro
│   │   └── ThemeToggle.astro      # Light/dark mode toggle button
│   ├── pages/
│   │   └── index.astro            # Root page — imports and arranges all components
│   ├── styles/
│   │   └── global.css             # @import "tailwindcss" + dark-mode variant + body font override
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
4. **Theme-Aware Accent Color**: The `accentColor` hex value from config is injected as `--accent-color` (plus a lightened `--accent-color-dark`) via a `style` attribute on `<html>` in `index.astro`. A `.dark { --accent-color: var(--accent-color-dark) !important; }` rule in `global.css` swaps in the lighter tint whenever dark mode is active, so accent-colored text and elements stay readable against dark backgrounds without every component needing its own dark-mode accent logic.

### Dark Mode

- **Toggle**: `ThemeToggle.astro` renders a fixed sun/moon button that toggles a `dark` class on `<html>` and persists the explicit choice to `localStorage` (`theme: "light" | "dark"`).
- **Default**: If the visitor hasn't chosen explicitly, the site follows `prefers-color-scheme` and keeps following it live (a `matchMedia` change listener) until the visitor clicks the toggle.
- **Anti-flash**: An inline `<script>` in `index.astro`'s `<head>` sets the `dark` class before first paint, based on `localStorage` or `prefers-color-scheme`, to avoid a light-mode flash.
- **Styling**: Tailwind v4's `dark:` variant is enabled via `@custom-variant dark (&:where(.dark, .dark *));` in `global.css` (class-based, not just media-query-based), so `dark:` utility classes throughout the components respond to the toggle.

## Component Reference

| Component | Responsibility |
|---|---|
| `Header.astro` | Fixed top nav with smooth-scroll links; hides links for empty sections; hidden on mobile (`hidden md:block`) |
| `Hero.astro` | Full-height landing section with name, title, social links, resume download, and decorative SVG background |
| `About.astro` | Profile photo + bio text + grouped skill tags in a two-column layout |
| `Projects.astro` | Numbered project cards with description, optional link, and skill tags; hidden when `projects` is empty |
| `Experience.astro` | Timeline-style work history with connecting lines and accent-colored dots |
| `Education.astro` | Card layout for degrees and achievements |
| `Footer.astro` | Social links, navigation links, copyright, and decorative SVG pattern |
| `ThemeToggle.astro` | Fixed sun/moon button that toggles and persists the light/dark theme |

- All components are `.astro` files — no React, Vue, or other UI frameworks
- Styling is done exclusively with Tailwind utility classes (no custom CSS beyond `global.css`)
- Maintain the monospace aesthetic (`font-mono` / IBM Plex Mono)
- When adding icons, use inline SVG to avoid adding icon library dependencies
- Components use `---` frontmatter blocks for TypeScript imports

## Configuration Schema

`src/config.ts` exports a single `siteConfig` object:

```typescript
{
  name: string           // Full name (used in Hero, Header, Footer)
  title: string          // Subtitle/tagline shown in Hero
  description: string    // HTML meta description
  accentColor: string    // Hex color (e.g. "#16324f") used site-wide; auto-lightened for dark mode
  photo: string          // Path to avatar image in public/ (e.g. "/avatar.jpg")
  resume: string         // Path to resume PDF in public/ (e.g. "/resume.pdf")
  social: {
    email?: string       // Optional — omit to hide email link
    linkedin?: string    // Optional — full URL
    twitter?: string     // Optional — full URL
    github?: string      // Optional — full URL
  }
  aboutMe: string        // Bio paragraph shown in About section
  skills: Record<string, string[]>  // Skill tags grouped by category, shown in About section
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

- **Global CSS** (`src/styles/global.css`): `@import "tailwindcss"`, the `@custom-variant dark` declaration that enables class-based dark mode, the `.dark` accent-color override, and a body font override (IBM Plex Mono from Google Fonts)
- **Tailwind v4**: No `tailwind.config.*` file — configuration is handled by the `@tailwindcss/vite` plugin in `astro.config.mjs`
- **Component styles**: Animations and non-utility styles are defined in `<style>` blocks within each `.astro` component
- **Accent color**: Set via inline `style` attribute as `--accent-color`/`--accent-color-dark` on `<html>` in `index.astro`; referenced in components with `style="color: var(--accent-color)"` (or `background-color`/`border-color`)
- **Dark mode classes**: Every color utility class (`bg-*`, `text-*`, `border-*`) that has a visual light/dark distinction should have a matching `dark:` variant — follow the existing components' shade mapping (e.g. `text-gray-900` ↔ `dark:text-gray-100`, `bg-white` ↔ `dark:bg-gray-900`)
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
- **Header**: Hidden on mobile with `hidden md:block` — no mobile nav menu exists; `ThemeToggle.astro` is visible at every breakpoint (fixed position), since it isn't part of the header
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
- Add a `dark:` variant alongside any new color utility class

**Don't:**
- Add external icon libraries — use inline SVGs instead
- Create a `tailwind.config.*` file — Tailwind v4 does not use one
- Add React/Vue/Svelte components — this is a pure Astro site
- Hardcode personal information in components — put it in `src/config.ts`
- Add a new section without also adding a conditional nav link in `Header.astro` and `Footer.astro`
- Use a raw hex value for accent-colored text/borders/backgrounds — use `var(--accent-color)` so it stays theme-aware

## Important Implementation Details

- **No linting or testing framework** is configured — there are no `lint` or `test` npm scripts
- **TypeScript strict mode** is enabled in `tsconfig.json`
- The Experience timeline uses `position: relative` on the container with `position: absolute` dots and vertical connecting lines; the last item omits the line
- The Hero section includes a decorative background pattern made of programming symbols (`{`, `}`, `</>`, etc.) as an absolutely-positioned SVG, plus separate light/dark radial-gradient overlay divs (toggled with `dark:hidden` / `hidden dark:block`) since gradient stops can't use `dark:` variants directly
- Social links render conditionally: each link checks for the presence of its config value before rendering
