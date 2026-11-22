# mickholster.nl

Portfolio, built with Next.js (App Router) as a static export for GitHub Pages.

```bash
npm run dev         # local development
npm run build       # static site in out/
npm start           # serve out/ locally
npm run lint && npm run typecheck
```

- Content lives in `src/content/*.ts`: add a project or job there, not in the components.
- The GitHub heatmap is fetched at build time and needs `GH_CONTRIBUTIONS_TOKEN`
  (read-only fine-grained token). Without it the section is left out.
- `public/og.png` is generated with `node scripts/make-og-image.mjs`.
- Deploys via `.github/workflows/deploy.yml` on push to `main` and daily.
