# Verdict

An AI-powered idea evaluation app. Submit a startup or product idea and run it through a four-pass critique:

1. **Gauntlet** — initial multi-angle critique
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
- Neon (serverless Postgres)
- `@auth/core` + `@hono/auth-js`

## Getting started

```bash
bun install
bun run dev
```

Dev server runs on http://localhost:4000.

```bash
bun run typecheck
```

## Layout

```
src/
  app/
    page.jsx          # main gauntlet flow
    layout.jsx
    root.tsx
    routes.ts         # file-based route generator
    api/
      evaluate/       # POST/GET evaluations
      followup/       # POST follow-up critique
      memo/           # POST memo
      auth/
  components/         # Hero, IdeaInput, Results, FollowUp, Memo, Report, History, ...
  utils/              # aiCalls, db client, helpers
  client-integrations/
plugins/              # vite plugins (render-id injection, console forwarding, layouts, ...)
__create/             # server entry + auth scaffolding
test/
```

## Environment

`.env` holds `ANYTHING_PROJECT_TOKEN` (used by the AI integration). Add a Neon
`DATABASE_URL` for the API routes that persist evaluations.

## Origin

Bootstrapped from anything.com's web + mobile scaffold; the mobile target was
unused and has been removed. The `__create/` and `plugins/` directories
preserve the original platform integration shims.
