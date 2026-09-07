$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$taskDocuments = Join-Path $taskRoot 'outputs\Cypress_Command_Brand_System_v1.0\documents'
$taskRender = Join-Path $PSScriptRoot 'word-render'
[void](New-Item -ItemType Directory -Path $taskRender -Force)
$taskWord = $null
$taskFiles = @('Cypress_Command_Letterhead','Cypress_Command_Proposal','Cypress_Command_Operating_Report')
try {
    $taskWord = New-Object -ComObject Word.Application
    $taskWord.Visible = $false
    $taskWord.DisplayAlerts = 0
    $taskWord.AutomationSecurity = 3
    foreach ($taskName in $taskFiles) {
        $taskDoc = $null
        try {
            $taskSource = Join-Path $taskDocuments ($taskName + '.docx')
            $taskPdf = Join-Path $taskRender ($taskName + '.pdf')
            $taskDoc = $taskWord.Documents.Open($taskSource,$false,$true,$false)
            [void]$taskDoc.Fields.Update()
            foreach ($taskSection in $taskDoc.Sections) {
                foreach ($taskFooter in $taskSection.Footers) { [void]$taskFooter.Range.Fields.Update() }
            }
            $taskDoc.Repaginate()
            $taskPages = $taskDoc.ComputeStatistics(2)
            $taskDoc.ExportAsFixedFormat($taskPdf,17,$false,0,0,1,1,0,$true,$true,1,$true,$true,$false)
            Write-Output "$taskName : $taskPages pages : $taskPdf"
        } finally {
            if ($null -ne $taskDoc) { $taskDoc.Close(0); [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskDoc) }
        }
    }
} finally {
    if ($null -ne $taskWord) { $taskWord.Quit(0); [void][System.Runtime.InteropServices.Marshal]::FinalReleaseComObject($taskWord) }
    [GC]::Collect(); [GC]::WaitForPendingFinalizers()
}
