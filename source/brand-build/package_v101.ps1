$ErrorActionPreference = 'Stop'

$source = (Resolve-Path -LiteralPath 'outputs/Cypress_Command_Brand_System_v1.0').Path
$outputRoot = (Resolve-Path -LiteralPath 'outputs').Path
$target = Join-Path $outputRoot 'Cypress_Command_Brand_System_v1.0.1'
$archive = Join-Path $outputRoot 'Cypress_Command_Brand_System_v1.0.1.zip'
if (Test-Path -LiteralPath $target) { throw "Target already exists: $target" }
if (Test-Path -LiteralPath $archive) { throw "Archive already exists: $archive" }
[void](New-Item -ItemType Directory -Path $target)

Get-ChildItem -LiteralPath $source -Force | Where-Object { $_.Name -notin @('Cypress_Command_Brand_System_v1.0','manifest.json') } | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $target $_.Name) -Recurse
}

$manifestFiles = Get-ChildItem -LiteralPath $target -Recurse -File | Sort-Object FullName | ForEach-Object {
    $relative = $_.FullName.Substring($target.Length + 1).Replace('\','/')
    [ordered]@{path=$relative;bytes=$_.Length;sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}
}
$manifest = [ordered]@{
    brand='Cypress Command'
    version='1.0.1'
    approvedOn='2026-09-06'
    updatedOn='2026-09-07'
    website='https://cypresscommand.com'
    fileCountExcludingManifest=@($manifestFiles).Count
    totalBytesExcludingManifest=(@($manifestFiles) | Measure-Object -Property bytes -Sum).Sum
    manifestScope='All release files except this self-referential manifest. SHA-256 hashes verify distribution integrity, not vendor, DNS, mailbox, or publication approval.'
    files=@($manifestFiles)
}
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $target 'manifest.json') -Encoding utf8
Compress-Archive -LiteralPath $target -DestinationPath $archive -CompressionLevel Optimal

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip=[System.IO.Compression.ZipFile]::OpenRead($archive)
try {$zipFiles=@($zip.Entries | Where-Object {$_.Name -ne ''}).Count} finally {$zip.Dispose()}
[pscustomobject]@{folder=$target;archive=$archive;files=$zipFiles;sha256=(Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash} | ConvertTo-Json
