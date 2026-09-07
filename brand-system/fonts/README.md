# Fonts and installation

The logo wordmark is outlined artwork and needs no installed font. Do not typeset a replacement wordmark.

## Approved hierarchy

| Use | Web family | Desktop family |
| --- | --- | --- |
| Display / editorial headings | Fraunces, default weight 450 | Cypress Fraunces Regular (450) |
| Body, UI, business communications | Inter | Cypress Inter |
| Actual identifiers, codes, dates in data contexts | JetBrains Mono | Cypress Mono |

`fonts.css` provides local variable web fonts; it makes no third-party font requests. Despite the historical `-400` filenames, these WOFF2 files are variable fonts. Use the declared ranges in that stylesheet.

`desktop/` contains static TTF exports from the same approved sources. Distinct Cypress family names avoid collisions with other installed versions. They have not been installed on your computer by this task.

## Before using the presentation template

1. Select the TTF files in `desktop/` and choose **Install** in Windows.
2. Close and reopen PowerPoint so it refreshes the font list.
3. Open the PPTX or create a new presentation from the POTX. Check the layout after any content changes.

The PowerPoint files declare these fonts but do not embed them. The presentation PDF preserves the appearance without installed fonts. The Word templates embed their required font data; they were tested in desktop Word. Other editors may ignore embedded fonts or reflow pages, so verify their final output.

The bundled source is a Latin subset suitable for the supplied English templates, not a full multilingual font distribution. Verify glyph coverage before translated or specialist content. No italic face is supplied. Keep the calm upright display treatment; do not synthesize italics.

OFL license texts accompany the fonts. Preserve those licenses when redistributing the assets. `desktop/desktop-fonts.json` records the static faces and weights.
