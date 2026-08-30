# Traceglow Design System

This document is the design contract for agents and contributors working on the Traceglow management console. It adapts the visual language observed on the Better Stack website on 2026-08-29 to a dense observability product interface. It is an interpretation, not a copy of Better Stack components or brand assets.

## Design Read

- Product: observability and incident response management console
- Audience: SRE, platform engineering, and application engineering teams
- Redesign mode: preserve functionality and information architecture, replace the visual language
- Reference: [Better Stack](https://betterstack.com/)
- Theme: dark only
- Design variance: 5
- Motion intensity: 3
- Visual density: 7

## Reference Audit

The current Better Stack website uses:

- A near-black page canvas (`rgb(11, 12, 20)` at inspection time)
- Cool gray body copy and soft off-white headings
- A single blue-violet brand accent for primary actions
- Large product visuals with low-contrast dark framing
- Thin cool-gray borders instead of heavy shadows
- Compact navigation and controls with direct copy
- Display and text variants of Helvetica Now, backed by system sans fonts
- Moderate radii, restrained highlights, and no decorative glass effects

Traceglow adopts these principles while retaining dashboard density. Marketing hero composition, customer logos, pricing blocks, and Better Stack brand marks must not be copied.

## Existing Product Audit

Preserve:

- Sidebar information architecture and labels
- Workspace and environment context
- Overview metrics, service health, incidents, alert activity, and recent events
- Mobile navigation, search, filters, and time-range controls
- Keyboard and accessible labels

Retire:

- Light gray canvas and green-dominant brand treatment
- White card grid with soft SaaS shadows
- Mixed corner radii and inconsistent control surfaces
- Generic workspace and user names
- Decorative spacing that reduces data density

## Core Principles

1. Data is the visual. Do not add decorative illustration to operational views.
2. Use one dark theme across the entire application.
3. Use violet only for brand emphasis, selection, focus, and primary navigation.
4. Use green, amber, and red only for semantic system states.
5. Prefer 1px borders and surface contrast over drop shadows.
6. Keep the interface compact without making text or controls difficult to target.
7. Use cards only for real operational groups. Metrics from the same scope should share one framed strip.
8. Every control must have hover, focus-visible, active, and disabled behavior.

## Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#0b0c14` | Application background |
| `--surface` | `#11121d` | Main panels and controls |
| `--surface-raised` | `#151724` | Menus, dialogs, popovers |
| `--surface-hover` | `#1a1c2a` | Hover and selected supporting surfaces |
| `--border` | `#262837` | Default dividers and panel borders |
| `--border-strong` | `#343748` | Hover and focused borders |
| `--text` | `#f1f3f9` | Primary headings and values |
| `--text-secondary` | `#c5cbe0` | Labels and important body copy |
| `--muted` | `#9098b2` | Secondary metadata |
| `--accent` | `#6f77e8` | Brand selection and primary focus |

Semantic colors:

- Healthy: `#4bc7a5`
- Warning: `#f0b45c`
- Critical: `#ff8f7c`
- Informational chart: `#737bed`

Do not use semantic colors for generic buttons, links, navigation, or decoration.

## Typography

- Use Geist through `next/font` as the local brand-compatible substitute for Helvetica Now.
- Use medium weight for page headings. Avoid oversized bold dashboard headings.
- Use Geist Mono for metrics, timestamps, code, latency, percentages, and identifiers.
- Letter spacing is zero. Do not use negative tracking or wide tracked eyebrows.
- Page title: 30-34px, weight 500, line height 1.15.
- Panel title: 13px, weight 600.
- Body and labels: 11-14px depending on hierarchy.
- Metadata: 9-11px, but never below 9px.

## Shape And Depth

- Panels and dialogs: 8px radius.
- Buttons and inputs: 8px radius.
- Nested interactive rows: 7px radius.
- Compact badges: 5-6px radius.
- Never use pill-shaped text controls unless the control is a true status chip.
- Default shadow: none.
- Popover shadow: `0 18px 50px rgb(0 0 0 / 0.35)`.

## Spacing

- Base unit: 4px.
- Page gutters: 16px mobile, 24px tablet, 32px desktop.
- Panel padding: 20px for primary sections, 12-16px for compact rows.
- Grid gap: 20px desktop, 16px mobile.
- Header height: 64px.
- Sidebar width: 248px.

## Component Rules

### Navigation

- Sidebar and top bar share the page theme.
- Active navigation uses a violet-tinted surface and a violet icon.
- Notification dots are allowed only when unread state is real.
- Desktop navigation stays fixed. Mobile navigation becomes an overlay drawer.

### Metrics

- Related metrics live in one bordered strip with dividers.
- Values use monospace.
- Change text uses semantic color only when direction has meaning.
- Avoid separate floating cards for every metric.

### Panels

- A panel header contains title, one short subtitle, and at most one action.
- Tables use column labels and hover rows, not a border around each row.
- Do not nest decorative cards. Nested surfaces must represent clickable records.

### Charts

- Default chart color is violet.
- Use amber or red only for anomalous points.
- Grid lines use `--border` and remain subtle.
- Tooltips use `--surface-raised` with white text.
- Charts must reserve stable height to avoid layout shifts.

### Forms And Search

- Labels appear above fields in full forms.
- Command search may use a descriptive placeholder because the input purpose is also exposed through an accessible label.
- Focus rings use `--accent` at 2px.
- Placeholder text must remain readable against the raised surface.

## Interaction And Motion

- Motion communicates state change only.
- Use 160-200ms transitions for color, border, and opacity.
- Button active feedback moves down by 1px.
- Sidebar transitions use transform only.
- Do not add auto-playing gradients, floating elements, parallax, or perpetual chart animation.
- Respect `prefers-reduced-motion`.

## Responsive Rules

- Below 1024px, hide the fixed sidebar and expose the menu button.
- Below 768px, use single-column content and icon search.
- Below 640px, metric strips become one column and filters may wrap as complete controls.
- Tables wider than the viewport scroll inside their own panel.
- Text labels must never overlap icons, values, or adjacent controls.
- The document must have no horizontal overflow at 375px.

## Agent Implementation Rules

When creating or changing UI:

1. Read this document before editing components or styles.
2. Reuse the semantic CSS tokens. Do not add arbitrary brand colors.
3. Keep the existing information architecture unless the task explicitly changes it.
4. Use Lucide icons already installed in the project. Do not draw icons manually.
5. Keep radii within the documented scale.
6. Keep all visible copy direct and operational.
7. Add accessible names to icon-only buttons.
8. Verify desktop and 375px mobile layouts in a real browser.
9. Verify keyboard focus and Escape behavior for dialogs and menus.
10. Run lint and a production build before completion.

## Acceptance Checklist

- One dark theme across the page
- One violet brand accent
- Semantic colors limited to state
- No horizontal overflow at 375px
- No wrapped desktop button labels
- No overlapping UI at desktop or mobile widths
- All icon buttons have accessible labels
- Search opens by button and Command/Ctrl + K
- Escape closes transient surfaces
- Mobile navigation opens and closes
- Lint and production build pass
