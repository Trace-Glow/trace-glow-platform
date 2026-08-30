---
name: traceglow-platform-guardrails
description: Implement or review Traceglow product features, domain models, APIs, authorization, and observability workflows. Use for work involving tenants, users, services, telemetry, SLOs, alerts, on-call, incidents, integrations, or the management console; do not trigger for isolated tooling or dependency maintenance with no product behavior change.
---

# Traceglow Platform Guardrails

Build Traceglow as a multi-tenant stability observability product for SRE, platform, and application engineering teams. Preserve the product's operational density, tenant isolation, and auditability while keeping implementation choices sympathetic to the existing codebase.

## Start With The Relevant Sources

Read only the sources that affect the task:

- For any Next.js code change, read the relevant Next.js 16 guide in `node_modules/next/dist/docs/` as required by the repository `AGENTS.md`.
- For UI, component, layout, or interaction changes, read `DESIGN.md` and reuse `src/components/ui` before adding a primitive.
- For authentication, users, sessions, tenants, memberships, roles, invitations, or audit logs, read `docs/user-module-design.md`.
- For services, telemetry, SLOs, alerts, on-call, or incidents, read [references/observability-domain.md](references/observability-domain.md).

Treat these repository documents as the source of truth. If a requested behavior conflicts with them, identify the conflict and follow the user's explicit decision; update the relevant source document when the decision changes the product contract.

## Preserve Domain Boundaries

- A User is a global identity. Tenant access belongs to Membership and Role, never directly to User.
- A Tenant is the hard isolation boundary and is called a Workspace in product copy.
- Environment and Project may scope data inside a Tenant but never replace Tenant isolation.
- Services own operational signals; alerts evaluate signal conditions; incidents coordinate human response. Do not collapse these concepts into a generic event table or UI model.
- PostgreSQL is authoritative for identity, authorization, configuration, workflow state, and audit history.
- Redis stores only short-lived or reconstructable state such as rate limits, locks, idempotency records, and bounded caches.
- Telemetry storage is an adapter boundary. Do not assume PostgreSQL should retain high-volume logs, metrics, or traces.

## Enforce Tenant And Authorization Invariants

- Resolve `tenantId` from verified server-side context. Never trust a request body's tenant, role, or permission claim.
- Require `tenant_id` on tenant-owned relational records and scope repository queries, uniqueness constraints, cache keys, object paths, queue messages, and audit events by Tenant.
- Authorize every server mutation and sensitive read. Hidden UI controls are not authorization.
- Keep platform administration separate from tenant Owner permissions.
- Preserve the last active Owner invariant and use transactions for ownership transfer, invitation acceptance, role changes, and other multi-record state transitions.
- Write high-risk changes and denied administrative attempts to append-only audit history with actor, tenant, action, target, result, and request ID.
- Hash opaque credentials and one-time tokens; never store or log raw session, reset, invitation, recovery, or API tokens.

## Shape Product Workflows

- Optimize the console for investigation and repeated operational action, not marketing presentation.
- Keep workspace, environment, service, and time range context visible when they affect the data.
- Every data view must define loading, empty, error, stale, permission-denied, and partial-data behavior where applicable.
- State colors communicate health or severity only. Preserve explicit text labels so color is not the sole signal.
- Time displays include a clear range and timezone. Use stable identifiers for services, rules, incidents, and integrations.
- Destructive and high-impact actions need clear scope, confirmation proportional to risk, an observable result, and audit coverage.

## Implementation Workflow

1. Identify the actor, Tenant, resource scope, permission, state transition, and audit event before designing persistence or UI.
2. Check whether the change crosses identity, configuration, telemetry, response, or notification boundaries. Keep adapters explicit at those boundaries.
3. Implement the smallest complete vertical behavior, including server enforcement and user-visible failure states.
4. Add tests proportional to risk. Cross-tenant denial, role downgrade, retry/idempotency, and concurrent state transitions are mandatory when the feature touches those paths.
5. Run the repository's type check, lint, relevant tests, and production build. For UI work, verify desktop and 375px layouts plus keyboard focus and Escape behavior.

## Review Checklist

- No tenant-owned lookup can succeed by globally enumerating an ID.
- Authorization is checked at the server boundary and again where a shared domain service requires it.
- Transactions protect invariants; external effects use an outbox or an idempotent delivery boundary.
- Redis loss cannot delete authoritative product state or silently grant access.
- Audit events exclude secrets and unnecessarily copied personal or telemetry payloads.
- UI uses Traceglow tokens and shadcn components without weakening operational density or accessibility.
- The change does not couple the core domain to a specific auth, email, telemetry, or notification provider without an adapter.
