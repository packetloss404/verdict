# Verdict

An AI-powered idea evaluation app. Submit a startup or product idea and run it through a four-pass critique:

1. **Gauntlet** — initial multi-angle critique (Investor / Competitor / Customer / Builder / Judge)
2. **Follow-Up (No Mercy)** — deeper, harder questions
3. **Memo** — synthesized investment-style memo
4. **Final Directive** — full report

Past evaluations are stored and browsable from the History tab.

## Stack

- Next.js 15 (app router)
- React 18.3
- Tailwind CSS 3
- TanStack Query
- Anthropic SDK (Claude)
- Neon (serverless Postgres)

## Getting started

```bash
cp .env.example .env
# fill in ANTHROPIC_API_KEY and DATABASE_URL
npm install
npm run dev
```

Dev server runs on http://localhost:4000.

```bash
npm run typecheck
npm run build
npm start
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
app/
  layout.tsx          # html shell + providers
  providers.tsx       # QueryClient provider, Sonner toaster
  page.jsx            # main gauntlet flow
  not-found.tsx
  globals.css
  api/
    evaluate/route.js # POST runs gauntlet + persists; GET returns history
    followup/route.js # POST runs follow-up + persists
    memo/route.js     # POST runs memo + persists
src/
  components/         # Hero, IdeaInput, Results, FollowUp, Memo, Report, History, ...
  config/
  lib/                # anthropic.js, schemas.js, sql.js (server-side helpers)
  utils/              # styleHelpers.js
  index.css
```

## Architecture notes

- AI calls run **server-side** in `app/api/*/route.js` (Next route handlers, `nodejs` runtime, `force-dynamic`). The browser never sees the API key.
- Routes and pages are handled natively by the Next.js app router — no custom file-based route generator.
- Server-only helpers live in `src/lib/` and are imported via the `@/lib/*` path alias.
