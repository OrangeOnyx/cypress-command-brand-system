$ErrorActionPreference = 'Stop'

$releaseRoot = (Resolve-Path -LiteralPath 'outputs/Cypress_Command_Brand_System_v1.0').Path
$target = Join-Path (Resolve-Path -LiteralPath 'outputs').Path 'Cypress_Command_Website_Starter_v1.0.1'
$archive = Join-Path (Resolve-Path -LiteralPath 'outputs').Path 'Cypress_Command_Website_Starter_v1.0.1.zip'

if (Test-Path -LiteralPath $target) { throw "Target already exists: $target" }
if (Test-Path -LiteralPath $archive) { throw "Archive already exists: $archive" }

[void](New-Item -ItemType Directory -Path $target)
foreach ($name in @('web','logos','fonts','tokens','social')) {
    Copy-Item -LiteralPath (Join-Path $releaseRoot $name) -Destination $target -Recurse
}

Get-ChildItem -LiteralPath (Join-Path $target 'web') -File | ForEach-Object {
    Move-Item -LiteralPath $_.FullName -Destination (Join-Path $target $_.Name)
}
Remove-Item -LiteralPath (Join-Path $target 'web') -Force

foreach ($name in @('index.html','ui.html')) {
    $path = Join-Path $target $name
    $text = Get-Content -LiteralPath $path -Raw
    $text = $text.Replace('../logos/','logos/').Replace('../tokens/','tokens/').Replace('../social/','social/')
    Set-Content -LiteralPath $path -Value $text -NoNewline -Encoding utf8
}
$cssPath = Join-Path $target 'styles.css'
$css = Get-Content -LiteralPath $cssPath -Raw
$css = $css.Replace('../fonts/','fonts/')
Set-Content -LiteralPath $cssPath -Value $css -NoNewline -Encoding utf8
$manifestPath = Join-Path $target 'manifest.webmanifest'
$manifest = Get-Content -LiteralPath $manifestPath -Raw
$manifest = $manifest.Replace('../logos/','logos/')
Set-Content -LiteralPath $manifestPath -Value $manifest -NoNewline -Encoding utf8

$readme = @'
# Cypress Command website starter v1.0.1

This is the public-site-only deployment package. Upload its **contents** to the static-host public root: `index.html`, `styles.css`, `script.js`, `manifest.webmanifest`, plus the `logos/`, `fonts/`, `tokens/`, and `social/` folders. Do not upload the internal brand library, source ZIP, documents, presentation, or print work to the public root.

The site has no build step, backend, forms, analytics, cookie storage, or third-party fonts. It is mobile responsive and currently retains `noindex, nofollow` until public contact information and final website copy are approved.

Before launch, follow `GO_DADDY_LAUNCH_SETUP.md` in the full brand package. Create and test `adam@cypresscommand.com` and `info@cypresscommand.com` before publishing either address. Do not add a phone number until it is confirmed. The displayed mailing address is a document contact detail; decide separately whether it should remain public on the site.
'@
Set-Content -LiteralPath (Join-Path $target 'README.md') -Value $readme -NoNewline -Encoding utf8

Compress-Archive -Path (Join-Path $target '*') -DestinationPath $archive -CompressionLevel Optimal
$hash = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash
[pscustomobject]@{folder=$target;archive=$archive;sha256=$hash;files=@(Get-ChildItem -LiteralPath $target -Recurse -File).Count} | ConvertTo-Json
