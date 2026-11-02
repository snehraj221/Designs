# TOMORROW//OBJECTS — A Museum of Possible Futures

An experimental, frontend-only 3D digital museum and speculative design archive built with React, TypeScript, Tailwind CSS, and Three.js.

## Creative Vision & Architecture

**TOMORROW//OBJECTS** explores speculative future inventions, materials, architecture, and personal technologies across six interconnected chapters:

1. **Introduction & Loading Sequence**: Progressive geometric emergence with real WebGL initialization readiness, Skip Intro control, and `?autostart=1` deep-link support.
2. **Chapter 01 — The Entry**: Features the multi-part procedural **Genesis / Chronos Singularity** artefact crafted with PBR liquid metal, translucent borosilicate glass, dual counter-rotating gimbal rings, and an instanced atmospheric particle field.
3. **Chapter 02 — The Archive**: Interactive curatorial catalog of six distinct procedural 3D speculative objects:
   - **001 / AURA** — Personal atmospheric intelligence
   - **002 / SOLA** — Living solar fabric
   - **003 / MEMENTO** — Spatial memory architecture
   - **004 / NEST** — Adaptive living architecture
   - **005 / MYCEL** — Intelligent organic materials
   - **006 / ORBIT** — Personal micro-mobility
4. **Chapter 03 — Object Exploration**: Full-screen 3D inspection environment with drag-to-rotate, zoom controls, real-time **Exploded Assembly** slider (`0%–100%`), studio lighting presets (`Studio`, `Solar`, `Ion`), wireframe structural toggle, and a collapsible bottom control dock (`H`).
5. **Chapter 04 — Future Timeline**: Speculative chronology across **2030 — The Transition**, **2035 — The Reconstruction**, and **2045 — The New Normal** with quantitative shift metrics, chronological milestones, and era-linked 3D artefacts.
6. **Chapter 05 — The Philosophy**: Contemplative editorial manifesto examining speculative materiality and human-centered future design.
7. **Chapter 06 — The Final Transmission**: Orbital camera pullback (`z = +13.5m`), complete accession register, and architectural navigation footer.

## Development & Build Instructions

```bash
# Install dependencies (respecting .npmrc legacy-peer-deps)
npm install --legacy-peer-deps

# Run unit tests (Node built-in test runner via tsx)
npx --yes tsx --test src/lib/archiveLogic.test.ts

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```

## Vercel Deployment (Fully Configured)

This project is pre-configured for direct, zero-config deployment on [Vercel](https://vercel.com):

1. **Vercel Configuration (`vercel.json`)**:
   - **Framework Preset**: `vite`
   - **Build Command**: `npm run build` (or `npm run vercel-build`)
   - **Output Directory**: `dist`
   - **Single Page Application (SPA) Rewrites**: Automatically routes all deep links to `/index.html` with clean URLs.
   - **Performance Edge Caching**: Immutable 1-year caching for static bundles (`/assets/*`), dynamic revalidation for `index.html`.
   - **Security Headers**: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
   - **Modular Code Splitting**: Three.js and vendor chunks are isolated for minimal initial bundle transfer.
   - **Package Resolution**: `legacy-peer-deps=true` in `.npmrc` ensures automated builds resolve cleanly on Vercel's build machines.

### Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Deploy to preview
vercel

# 3. Deploy to production
vercel --prod
```

### Deploy via GitHub / Vercel Dashboard

1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com/new), click **Add New Project** and import the repository.
3. Vercel will automatically detect `vercel.json` and the Vite framework preset.
4. Click **Deploy**. The site will build and go live instantly.

