# situation-monitor

Real-time dashboard for monitoring global news, markets, and geopolitical events.

## Tech stack

- SvelteKit 2 + Svelte 5
- Vite
- TypeScript
- Tailwind CSS
- Static output via `@sveltejs/adapter-static` (build output: `./build`)

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

- Dev server: http://localhost:5173

### Optional environment variables

- `VITE_FINNHUB_API_KEY` (markets data)
- `VITE_FRED_API_KEY` (Fed/economic indicators panel)

## Production build

```bash
npm run build
npm run preview
```

- Preview server: http://localhost:4173

## Deploy to Vercel (recommended)

This project deploys as a **static site**.

### Option A: Deploy via Vercel Dashboard (GUI)

1. Go to <https://vercel.com/new>
2. Import this GitHub repo
3. In **Project Settings → Build & Output** verify:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. (Optional) Add Environment Variables in Vercel:
   - `VITE_FINNHUB_API_KEY`
   - `VITE_FRED_API_KEY`
5. Deploy.

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Then follow prompts.

### SPA fallback / routes

This repo includes a `vercel.json` that:
- uses `build/` as output
- adds a catch-all route to `app.html` so deep links work on static hosting

## GitHub Pages

This repo includes a GitHub Actions workflow that deploys a **redirect-only** GitHub Pages site which points to the Vercel deployment.
