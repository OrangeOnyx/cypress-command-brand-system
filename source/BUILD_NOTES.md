# Build notes

The scripts in this repository are the maintenance sources for the approved v1.0.1 release. They were run on Windows with the Codex bundled Node/Python runtimes, Playwright/Sharp/PDF tools, Microsoft Word, and PowerPoint.

- `brand-build/` creates social, print, guide, library, website-starter, and release-package assets.
- `document-build/` creates and checks DOCX/DOTX templates with embedded desktop fonts.
- `presentation-build/` creates the editable presentation template.

The scripts intentionally use absolute workspace paths from the original controlled build environment. Treat them as production history and adaptation sources, not one-command portable installers. Do not install fonts, alter DNS, or publish websites as part of a rebuild without an explicit decision.
