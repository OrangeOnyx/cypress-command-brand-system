from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
target=ROOT/'outputs/Cypress_Command_Brand_System_v1.0/brand-guidelines.html'
src=(ROOT/'outputs/Cypress_Command_04C_Adoption_Kit/index.html').read_text(encoding='utf-8')
replacements={
'Cypress Command | 04C identity adoption review':'Cypress Command | Brand standards 1.0',
'Cypress Command / adoption review':'Cypress Command / brand standards 1.0',
'>Recommendation</a>':'>Production</a>',
'04C / selected visual direction':'04C / approved brand system 1.0',
'The rounded mark from your picture.<br>A focused system drawn from your ZIP.':'The approved Cypress Command identity.<br>Standards for consistent use.',
'Selected by you':'Primary identity',
"The pictured 04C logo direction. This vector reconstruction keeps the rounded silhouette and isolated square; it does not reuse the ZIP's mismatched 04C SVG.":'The rounded 04C mark, its isolated square, and the outlined wordmark form the fixed identity. Use the supplied master assets without redrawing or typesetting the logo.',
'Proposed for adoption':'Supporting design',
"The ZIP's Fraunces / Inter pairing, usable UI structure, and quiet framing. The surrounding system remains a proposal until you approve it.":'Fraunces display type, Inter content and UI, the five-color palette, and quiet open framing are approved. This release supersedes earlier 04B and adoption-review packages.',
'Identity adoption review / 06 September 2026':'Brand standards 1.0 / approved 06 September 2026',
'04C pictured-logo reconstruction':'04C approved master artwork',
'Master rebuilt from the raster reference, not claimed as an original vector. Exact approved Moss replaces the olive-looking raster core. Minimum sizes are proposed production baselines; print and stitch proofs remain required.':'The raster-derived master and its exact palette are approved. These coordinates define version 1.0. Minimums are production baselines; confirm print, material, and stitch proofs before fabrication.',
'Supporting system / proposal':'Typography and graphic language',
'Selected from the uploaded ZIP':'Approved supporting design',
"Keep the ZIP's useful structure. Relax the heavy display type, reduce decorative labels, and give the brand mark room to lead.":'Use a calm typographic hierarchy, clear alignment, and open-edge frames. Give the primary mark space. Structure must support content rather than compete with it.',
"Fraunces 450 / optical size 72, shown at 48px. The ZIP's serif works best here at a calmer weight, without a mandatory amber period or faux italic.":'Fraunces 450 / optical size 72, shown at 48px. Use it for editorial headlines and brand moments. Amber punctuation and italic emphasis are not required signature treatments.',
"The pictured wordmark stays Montserrat-based outlined artwork. Fraunces and Inter are the ZIP-derived proposal, replacing the board's Playfair Display / Montserrat content pairing.":'The wordmark stays Montserrat-based outlined artwork. Fraunces and Inter form the approved content pairing. This replaces the earlier Playfair Display / Montserrat content typography.',
'Proposed UI language':'Approved UI language',
'Flat layout studies, not manufacturing proofs':'Brand applications / reusable files in release kit',
'The same mark, without decorative effects. Contact fields remain visibly unfilled. These studies establish treatment; they are not printer-ready PDFs.':'The same mark across everyday materials. Editable Office templates, print layouts, and email assets accompany this guide. Replace all contact placeholders before public use.',
'Proposed 25mm icon minimum':'25mm icon minimum as a starting specification',
'Recommendation / adoption boundary':'Production and release control',
'A curated system, not the whole ZIP':'One approved system / version 1.0',
'<h2>Keep the foundation.<br>Leave the baggage.</h2>':'<h2>Consistent in use.<br>Controlled at release.</h2>',
"Use the picture as the logo authority. Use the ZIP as a source of useful design patterns, not as verified business content or production software.":'Use the versioned master artwork, approved tokens, and supplied templates. Keep identity approval separate from content verification, deployment, and vendor proofs.',
'Source ZIP and previous deliveries preserved / proposed system awaiting approval':'Approved identity 1.0 / earlier outputs preserved and superseded',
'[Website]':'cypresscommand.com',
'[Name]':'Adam Abdalla',
'[Role]':'Owner / Founder',
'.app-icons .tiny{width:24px;':'.app-icons .tiny{height:24px;width:auto;',
}
for old,new in replacements.items():
 if old not in src:raise ValueError('Missing guide source: '+old[:90])
 src=src.replace(old,new)
start=src.index(' <div class="adopt-grid">')
end=src.index(' <div class="folio">',start)
src=src[:start]+''' <div class="adopt-grid"><div class="adopt-column"><h3>Identity</h3><p>Use the primary horizontal lockup by default. Use the stacked version for narrow placements and the icon only where the brand is already clear.</p><p>Keep the core square, mark proportions, and clear space. All standard wordmarks are outlined.</p><p>Cypress and Bone dominate. Moss supports. Amber signals. Charcoal carries utility text and deep surfaces.</p><p>Keep 04D-derived framing subordinate to the logo.</p></div><div class="adopt-column"><h3>Digital</h3><p>Use local fonts and the supplied CSS / JSON tokens. Default display weight is Fraunces 450.</p><p>Use readable text, visible focus, and labels alongside status colors.</p><p>Social templates cover square, portrait, story, wide-banner, and preview-card formats.</p><p>The web starter and UI examples run locally. Real domains, content, accounts, and backends require separate setup.</p></div><div class="adopt-column"><h3>Production</h3><p>Supply vector masters to sign, print, apparel, and field vendors.</p><p>The business card uses 0.125 inch bleed and a 3.5 x 2 inch trim size. Keep contact details inside the safe area.</p><p>Require material/color samples and embroidery stitch-outs. Confirm helmet adhesive compatibility.</p><p>Use vendor-specific color profiles. Do not guess Pantone matches or universal CMYK values.</p></div></div>
 <div class="release"><h4>Release checklist</h4><p class="small">Identity approval is complete. Use the release kit as the current source. The following checks protect the work as it moves into live applications.</p><ol><li>Replace every contact and project placeholder with verified information.</li><li>Check final output at actual size, on the intended background, with the correct logo variant.</li><li>Confirm copy, links, photography, metadata, and permissions before publishing. Remove staging noindex only when ready.</li><li>Approve the vendor proof and material specification before ordering physical production.</li></ol></div>
 <div class="sources"><strong>Master record:</strong> approved by Adam Abdalla on 6 September 2026. Source artwork, font licenses, token definitions, asset inventory, and rollout notes are included. <a href="index.html">Open asset library</a><a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">W3C contrast guidance</a></div>
'''+src[end:]
target.write_text(src,encoding='utf-8')
print(target)
