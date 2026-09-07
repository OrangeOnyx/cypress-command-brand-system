# Cypress Command website starter and UI reference

Open `index.html` for the responsive marketing starter and `ui.html` for the component reference. Keep this folder alongside the supplied `logos/`, `fonts/`, `tokens/`, and `social/` directories. The pages work from a local folder; an HTTP server is preferable for testing web manifests. There is no build step, package manager, environment variable, backend, analytics, remote font call, cookie, local storage, or external script dependency.

The approved logo is a linked outlined SVG. Supporting typography is local Fraunces and Inter, with JetBrains Mono limited to sample IDs. Colors and component roles come from `../tokens/brand-tokens.css`; `styles.css` defines page layouts and font loading without replacing the core palette. The supplied binaries have verified variable ranges despite their `-400` filenames.

## Included behavior

- Navigation goes to real sections. On mobile, the Menu button opens and closes the navigation; Escape closes it and restores focus. Without JavaScript, navigation stays visible.
- The UI reference switches the component preview between light and dark themes, announces local action feedback, and filters three explicitly labelled sample records. No user data is submitted or retained.
- Focus indicators, skip links, semantic landmarks, minimum 44px control height, reduced-motion behavior, and a horizontally scrollable data table are included. A full accessibility audit of a deployed website remains separate.
- The manifest provides app-name/color/icon metadata. It is not an offline/PWA implementation; no service worker is registered.

## Before publication

1. Create and test the proposed `adam@cypresscommand.com` mailbox and `info@cypresscommand.com` address before adding either to the site. Add a `mailto:` link only after it receives external test mail. Phone remains intentionally absent until one is confirmed.
2. Approve the drafted positioning and focus-area copy against the actual business offer. Add verified entity details and any required public disclosures or policies for the final business and jurisdiction. The starter contains no invented metrics, property portfolio, credentials, or certifications. Adam Abdalla's Owner / Founder role and 532 Alonda Drive, Lafayette, LA 70503 mailing address are supplied; consider whether a residential mailing address belongs on the public site before publishing it.
3. The homepage canonical, Open Graph URL, website link, and Open Graph image URL now use `https://cypresscommand.com/`. This is configuration for the purchased domain, not a claim that DNS or hosting is live. For a production homepage, serve the contents of `web/` at the public site root, alongside the `logos/`, `fonts/`, `tokens/`, and `social/` folders at that same public root. The `../` asset references resolve to the public root when these pages and stylesheets are served at `/`. Check every live asset URL before launch. Do not publish the internal brand portal, reference material, or other release folders by accident. No DNS or deployment was performed.
4. Test the real deployment at 390px, 768px, and desktop, at 200% zoom, with keyboard navigation and a screen reader. Check the selected production browser support, color contrast in any changed component, all final links, and font loading.
5. Keep the current `noindex, nofollow` metadata while this is a staging/starter site. Remove it only when the verified site is ready for public indexing. Do not add analytics, third-party embeds, or forms without a separate privacy and data-handling decision.
6. Exclude the internal `ui.html` reference from a public deployment unless intentionally publishing a design-system page. No automated publishing, DNS change, account connection, or live asset replacement was performed.

`script.js` is deliberately small and contains only local UI behavior. If you later add data processing, authentication, payments, or APIs, implement and review those as a separate application scope.
