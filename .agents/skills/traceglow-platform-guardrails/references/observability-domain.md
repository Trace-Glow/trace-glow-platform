# Traceglow Observability Domain

Read this reference when implementing or reviewing services, telemetry, SLOs, alerts, on-call, or incidents.

## Context Hierarchy

```text
Tenant (Workspace)
  -> Project (optional grouping)
    -> Environment
      -> Service
        -> Telemetry and operational configuration
```

- Tenant is always the security and data isolation boundary.
- Project is an optional organizational scope and must not be invented until a feature needs it.
- Environment distinguishes operational deployments such as production and staging.
- Service is a stable logical application identity. A deployment or instance belongs to a Service but is not the Service itself.

## Signals

| Signal | Core shape | Primary use |
| --- | --- | --- |
| Metric | name, labels, timestamp, numeric value | Trends, aggregation, SLO evaluation |
| Log | timestamp, severity, body, attributes, trace correlation | Event detail and investigation |
| Trace | trace/span IDs, timing, parentage, attributes, status | Request path and latency diagnosis |
| Event | timestamp, type, actor/source, target, attributes | Deployments and operational changes |

Keep the signal model provider-neutral. OpenTelemetry semantic conventions are the preferred ingestion vocabulary, but product domain types must not expose a storage vendor's query or identifier format as their only representation.

Telemetry is high-volume and append-oriented. PostgreSQL may store catalog metadata, saved queries, dashboards, retention policy, and ingestion configuration; a telemetry backend adapter owns signal ingestion and querying.

## SLOs

An SLO belongs to a Tenant and a scoped Service or other explicit resource. It contains:

- Service Level Indicator definition
- objective percentage or threshold
- rolling or calendar window
- valid evaluation scope and filters
- optional error-budget policy

Store the definition separately from computed evaluation results. Historical evaluations must retain enough version information to explain why a past value was produced after the definition changes.

## Alerts

An alert rule evaluates a defined signal or SLO condition. Separate:

- Rule: configuration and ownership
- Evaluation: one execution and its evidence
- Alert instance: stateful condition for a resource/label set
- Notification delivery: an attempt to inform a destination

Use an explicit state model such as `normal -> pending -> firing -> resolved`. Acknowledgement is human workflow metadata and does not by itself mean the monitored condition resolved. Deduplication keys must include Tenant and the rule/resource identity.

Evaluation and delivery must be idempotent. Retrying a worker cannot create duplicate alert instances, incidents, or unbounded notifications.

## On-call And Incidents

- Schedule defines rotations and participants.
- Escalation policy defines ordered response steps and delays.
- On-call assignment is the computed person for a time interval.
- Incident is the coordination record for an operational disruption.

An Incident is not an Alert. Alerts may create or attach to an Incident through an explicit policy. Incidents have severity, status, commander/assignees, timeline, related services, and auditable transitions.

Recommended incident lifecycle:

```text
triggered -> acknowledged -> investigating -> identified -> monitoring -> resolved
```

Allow documented transitions appropriate to the workflow, including reopening. Every transition records actor, timestamp, previous/new status, and optional reason.

## Shared Operational Requirements

- Every asynchronous message carries Tenant ID, correlation/request ID, producer, schema version, and idempotency key.
- Every query has an explicit time range and bounded result strategy.
- User-visible freshness identifies live, delayed, stale, or partial data when the distinction affects decisions.
- Retention, redaction, and access policies apply before data leaves its tenant boundary.
- Avoid high-cardinality tenant, user, email, request, or trace identifiers in platform metrics unless the backend and cost model explicitly support them.
- Provider failures expose health signals and retries; they must not be mistaken for healthy empty data.
