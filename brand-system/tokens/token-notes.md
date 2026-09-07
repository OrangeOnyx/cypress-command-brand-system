# Cypress Command UI tokens 1.0

Status: **Approved by Adam Abdalla on 6 September 2026.** These tokens belong to the finalized 04C identity system. They selectively adapt the uploaded ZIP; they do not adopt its unsupported business claims or prototype runtime. The five core colors are fixed.

## Use and dependencies

Load the separately supplied local font-face stylesheet, then `brand-tokens.css`. Apply `class="cc-ui"` and `data-cc-theme="light"` or `data-cc-theme="dark"` to the UI root. Choose the theme explicitly; there is no automatic dark-mode change. The JSON is plain structured JSON with documented dotted-path aliases, not a claim of compatibility with a particular design-token tool.

No JavaScript, remote requests, build tools, or `@import` are required by this CSS. Font binaries and `fonts/fonts.css` are included in the release kit. A missing font falls back to the listed system families; verify local fonts load before export.

## Typography decisions

- Fraunces: restrained editorial display, weights 400 / 450 / 500 / 600; default 450. Use optical sizing when supported. Do not use the ZIP's 800 / 900 display treatment.
- Inter: body, UI, navigation, subheads, labels, ordinary metadata; weights 400 / 500 / 600 / 700. Body defaults to 16px at a 16px root, with 1.6 line height. Do not reduce the user's browser root size.
- JetBrains Mono: identifiers and literal reference codes only, weights 400 / 500. Ordinary labels are Inter, not monospace.
- Montserrat: reserved for logo artwork. Use the supplied outlined logo assets; do not typeset a substitute wordmark at runtime.

The ZIP declared some files named `-400.woff2` as a full weight range. These token files do not repeat that assumption. The font-face implementation must match the actual binary: use a variable range only for a verified variable font, otherwise provide separately identified weight files. Do not synthesize nonexistent display weights. Italic faces are not assumed.

The pictured board labeled Playfair Display and Montserrat for general typography. The approved system uses Fraunces / Inter for content and retains Montserrat only in the outlined logo. This supersedes that earlier typography direction.

## Color and semantic rules

Core colors remain exactly Cypress `#1E4D3A`, Moss `#2F6B4E`, Amber `#D97706`, Charcoal `#0A1F16`, and Bone `#F3EDE0`. White and the six derived functional neutral values are substrates, text, borders, and separators—not new brand colors. Derived values are rounded channel-by-channel sRGB mixtures of the approved Charcoal and Bone, or Bone and White; their recipes are in the JSON.

Omitted from the ZIP: alternate Slate, Sage, Bayou, extensive color ramps, and red danger color. Amber is an occasional signal or badge fill with Charcoal text; primary controls use Cypress / Bone (light) or Bone / Charcoal (dark). Do not use Amber body text on Bone or white text on Amber. Do not use a thin Amber icon alone on Bone to communicate essential status.

Warning and error share the approved palette but must differ by explicit labels and shapes: triangle + “Warning,” stop/cross + “Error,” plus a concrete message and corrective action where applicable. Success uses a check + “Complete.” Color is never the sole signal. Decorative divider colors deliberately have lower contrast; use `--cc-border-control` for essential control boundaries.

## Verified contrast pairings

Ratios are calculated from the final exact sRGB hex values using relative luminance and `(lighter + 0.05) / (darker + 0.05)`. Values shown are rounded to two decimals; pass/fail checks use unrounded values. Normal text target: at least 4.5:1; essential UI boundaries/focus target: at least 3:1, following the [W3C text-contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast explanation](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Verify final components, zoom/reflow, keyboard navigation, focus clipping, and status announcements separately before claiming interface accessibility.

| Foreground / background | Ratio | Use |
| --- | ---: | --- |
| Charcoal / Bone | 14.75:1 | Light body text |
| Cypress / Bone | 8.27:1 | Light secondary text, links, focus |
| Moss / Bone | 5.40:1 | Light success mark; optional text |
| Muted `#505D53` / Bone | 5.94:1 | Light supporting text |
| Muted `#505D53` / White | 6.93:1 | Supporting text on raised surface |
| Bone / Charcoal | 14.75:1 | Dark body text |
| Bone / Cypress | 8.27:1 | Dark surface text; light primary button |
| Bone / Moss | 5.40:1 | Text on a Moss surface, if used |
| Muted `#C4C4B8` / Charcoal | 9.78:1 | Dark supporting text on page |
| Muted `#C4C4B8` / Cypress | 5.48:1 | Dark supporting text on surface |
| Charcoal / Amber | 5.40:1 | Accent button / badge label |
| Border `#677167` / Bone | 4.35:1 | Light essential control boundary |
| Border `#677167` / White | 5.08:1 | Light boundary on raised surface |
| Border `#ADAFA3` / Charcoal | 7.73:1 | Dark essential control boundary on page |
| Border `#ADAFA3` / Cypress | 4.33:1 | Dark essential control boundary on surface |
| Amber / Bone | 2.73:1 | **Fails normal text and essential icon target** |
| White / Amber | 3.19:1 | **Fails normal text** |

Verification record, 2026-09-06: a read-only Node calculation parsed the delivered JSON and tested 44 normal-text semantic pairings across light and dark backgrounds, surfaces, raised surfaces, primary/hover/accent controls, and selections. All passed; the minimum was 5.401:1. Twelve essential control-boundary and focus/background pairings passed 3:1. Every JSON alias resolved, and all five CSS core-color values matched the JSON exactly. CSS was checked for absence of remote imports. These are token-level checks, not a rendered full-application accessibility audit.

## Focus, scale, and motion

The 4px spacing scale, 4px control radius, and 8px panel radius keep the interface structured. UI radii do not define or modify logo geometry. The 44px minimum control height is a practical sizing baseline; horizontal target dimensions, spacing, and small icon controls still need component-level checks.

Focus uses a 3px contrasting outline with a 3px gap. Keep focus rings visible and unclipped; CSS alone cannot prevent an ancestor's overflow from hiding them. The forced-colors rule preserves a system focus highlight. Scoped reduced-motion rules effectively remove CSS animation and transitions; applications must separately stop JavaScript motion, auto-advancing content, and animated media when appropriate.

The identity and tokens are approved. Publishing, account replacement, and physical fabrication remain separate actions; verify final content and vendor proofs before release.
