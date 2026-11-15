# Cari SDK dan alat command line pada lokasi bawaan Android di Windows.
$ErrorActionPreference = 'Stop'
if (-not $env:ANDROID_HOME) { $env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
$androidCli = Join-Path $env:ANDROID_HOME 'cmdline-tools\latest\bin\android.exe'
if (-not (Test-Path -LiteralPath $androidCli)) { throw 'Android SDK command-line tools belum ditemukan.' }

# Gunakan versi SDK yang sama dengan konfigurasi Android repo sumber.
# Kirim jawaban y untuk persetujuan lisensi, lalu pasang platform dan alat build.
1..20 | ForEach-Object { 'y' } | & $androidCli --no-metrics "--sdk=$env:ANDROID_HOME" sdk install 'platforms;android-34' 'build-tools;34.0.0'
if ($LASTEXITCODE -ne 0) { throw 'Pemasangan paket Android SDK gagal.' }
Write-Output 'SDK Android 34 dan Build Tools 34.0.0 siap digunakan.'
