# Onigiri website

Landing page for Onigiri, a native Jellyfin client for Android.

Built with Astro, Tailwind CSS, and Embla Carousel. The type is Geist for UI and
Caprasimo for headings. The palette is intentionally monochrome: white paper,
`#1b1b1b` ink, and tinted surfaces instead of borders.

## Commands

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # static output in dist/
pnpm preview
pnpm check     # Astro + TypeScript diagnostics
```

## Structure

```
src/
  assets/screens/    curated app screenshots (raw/ is ignored)
  components/        Nav, Footer, Phone, Gallery, Faq, Speech, SectionHeading
  layouts/Base.astro metadata, fonts, favicon
  pages/index.astro  the landing page and copy
  styles/global.css  design tokens and component classes
public/
  icon.png           app icon / favicon
  logo.svg           logo lockup used in the nav and footer
mascot/              idle, excited, thinking, questioning (PNG, alpha)
icons/               source icon and logo
raw/                 screenshot dump, not committed
```

## Editing content

- The latest release version and GitHub URLs are constants at the top of
  `src/pages/index.astro` (`version`, `repoUrl`, `releaseUrl`).
- App areas are sections in `src/pages/index.astro`: Onboarding, Movies, Shows,
  Books and audiobooks, Songs, Settings.
- Screenshot order in the filmstrip lives in `src/components/Gallery.astro`.
- Mascots are imported from `mascot/`; swap the file names there to change an
  expression.

## Deployment

The site is fully static. Set `site` in `astro.config.mjs` to the production URL
so canonical and Open Graph tags use absolute URLs, then deploy `dist/` to any
static host (Cloudflare Pages, Vercel, Netlify, or a plain web server).

## Notes

- Copy avoids em dashes.
- Borders are avoided on purpose; separation comes from the `wash` surface and
  spacing.
- Phone mockup radii scale with the rendered size, and landscape screens use
  their short edge so the corners stay proportionate.
