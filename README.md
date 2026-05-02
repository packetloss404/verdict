# Verdict

An AI-powered idea evaluation app. Submit a startup or product idea and run it through a four-pass critique:

1. **Gauntlet** — initial multi-angle critique (Investor / Competitor / Customer / Builder / Judge)
2. **Follow-Up (No Mercy)** — deeper, harder questions
3. **Memo** — synthesized investment-style memo
4. **Final Directive** — full report

Past evaluations are stored and browsable from the History tab.

## Stack

- React Router 7 (file-based routing under `src/app/`)
- Hono server (via `react-router-hono-server`)
- Vite + Bun
- Tailwind CSS 3
- TanStack Query
- Anthropic SDK (Claude)
- Neon (serverless Postgres)

## Getting started

```bash
cp .env.example .env
# fill in ANTHROPIC_API_KEY and DATABASE_URL
bun install
bun run dev
```

Dev server runs on http://localhost:4000.

```bash
bun run typecheck
bun run build
bun start
```

## Database

A Neon Postgres connection string in `DATABASE_URL`. Expected table:

```sql
CREATE TABLE evaluations (
  id              SERIAL PRIMARY KEY,
  idea_text       TEXT NOT NULL,
  verdict         TEXT,
  why_market      TEXT,
  why_model       TEXT,
  why_moat        TEXT,
  biggest_risk    TEXT,
  save_improvement TEXT,
  viability_score INTEGER,
  gauntlet_result JSONB,
  followup_result JSONB,
  memo_result     JSONB,
  created_at      TIMESTAMPTZ DEFAULT now()
);
```

## Layout

```
src/
  app/
    page.jsx          # main gauntlet flow
    layout.jsx        # QueryClient provider
    root.tsx          # html shell + error boundary
    routes.ts         # file-based route generator
    not-found.tsx
    api/
      evaluate/       # POST runs gauntlet + persists; GET returns history
      followup/       # POST runs follow-up + persists
      memo/           # POST runs memo + persists
      utils/          # anthropic.js, schemas.js, sql.js
  components/         # Hero, IdeaInput, Results, FollowUp, Memo, Report, History, ...
  config/
server/               # Hono server entry + file-based API route loader
plugins/              # vite plugins: aliases, hierarchical layouts, restart
```

## Architecture notes

- AI calls run **server-side** in `src/app/api/*/route.js`. The browser never sees the API key.
- API routes are loaded from `src/app/api/**/route.js` via `server/route-builder.ts` and mounted under `/api`.
- Page routes are generated from `src/app/**/page.jsx` via `src/app/routes.ts`.
