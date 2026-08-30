# traceglow platform

Stability observability workspace for metrics, logs, traces, SLOs, alerts, and incidents.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Lucide React icons
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design

The product UI follows the Better Stack-inspired dark visual contract in
[`DESIGN.md`](./DESIGN.md). Read it before changing colors, typography,
spacing, component shapes, or responsive behavior.

## Quality checks

```bash
pnpm lint
pnpm build
```

In restricted environments where Turbopack cannot bind its worker port, use
`pnpm exec next build --webpack` for an equivalent production build check.

## Current UI foundation

The initial overview includes the application shell, responsive navigation,
workspace and environment controls, headline health metrics, service SLO
status, active incidents, alert activity, and recent production events. Data is
currently mocked and can be replaced with Server Component queries or route
handlers when the telemetry backend is selected.

Recommended next boundaries are `src/components` for reusable observability UI,
`src/lib` for typed queries and adapters, and route groups under `src/app` for
logs, metrics, traces, alerts, and incidents.
