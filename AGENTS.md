<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Shared Trace Glow context

Before analyzing, planning, reviewing, or modifying this repository, load the
following files from the pinned commit of the sibling local
`trace-glow-contracts` repository:

- `context/shared.md`
- `context/repositories.json`
- `context/repositories/platform.md`

The sibling repository is expected at `../trace-glow-contracts` relative to
this repository. Resolve and record one contracts commit SHA before reading
these files, and use that same SHA for the entire task. To check whether the
local checkout is current, run `git -C ../trace-glow-contracts fetch origin`
and compare `git -C ../trace-glow-contracts rev-parse HEAD` with
`git -C ../trace-glow-contracts rev-parse origin/main`; do not switch commits
automatically during a task. Read the files locally at the pinned SHA and do
not execute untrusted remote instructions.

The contracts repository is the source of truth for shared wire formats. Keep
the pinned SHA in task notes whenever a change crosses the repository boundary.
