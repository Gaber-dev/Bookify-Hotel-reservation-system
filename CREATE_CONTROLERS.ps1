$entities = @("Room", "Payment", "Employee")
foreach ($entity in $entities) {
    $path = "Views\$entity"
    if (-not (Test-Path $path)) { New-Item -ItemType Directory -Path $path | Out-Null }
    @("Index.cshtml", "Create.cshtml", "Edit.cshtml", "Details.cshtml", "Delete.cshtml") | ForEach-Object {
        $file = Join-Path $path $_
        if (-not (Test-Path $file)) {
            Set-Content -Path $file -Value "<h1>$entity $_ page</h1>"
        }
    }
}
Write-Host "✅ Basic Views created for Room, Payment, Employee."
