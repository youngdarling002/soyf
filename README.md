# SOYF

React + Vite site, deployed on Cloudflare.

## Development

```bash
npm install
npm run dev
```

## Deploy to Cloudflare

Build output: `dist/`. SPA routing is handled by `not_found_handling: "single-page-application"` in `wrangler.jsonc`; cache headers live in `public/_headers`.

**Workers (recommended)** — in the Cloudflare dashboard: Workers & Pages → Create → Import a repository → `JomarQr/soyf`.
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Or from the terminal: `npm run deploy`.

**Pages (alternative)** — Workers & Pages → Pages → Connect to Git.
- Framework preset: Vite (React)
- Build command: `npm run build`
- Output directory: `dist`

Cloudflare rejects any single file over 25 MiB, so keep large media out of `public/`.
