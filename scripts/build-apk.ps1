# Hentikan skrip jika terjadi kesalahan dan jalankan dari folder proyek.
$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectDirectory

# Capacitor 6 dan Gradle proyek sumber menggunakan JDK 17.
$javaRelease = if ($env:JAVA_HOME) { Join-Path $env:JAVA_HOME 'release' } else { '' }
if (-not $javaRelease -or -not (Test-Path -LiteralPath $javaRelease) -or (Get-Content -LiteralPath $javaRelease -Raw) -notmatch 'JAVA_VERSION="17\.') {
    $jdk17 = Get-ChildItem -LiteralPath 'C:/Program Files/Eclipse Adoptium' -Directory -Filter 'jdk-17*' -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $jdk17) { throw 'Build APK memerlukan JDK 17. Pasang JDK 17 dan atur JAVA_HOME.' }
    $env:JAVA_HOME = $jdk17.FullName
}
# Pakai Java yang dipilih dan cari SDK pada lokasi bawaan jika belum diatur.
$env:JAVA_HOME = $env:JAVA_HOME.TrimEnd('\')
$env:Path = (Join-Path $env:JAVA_HOME 'bin') + ';' + $env:Path
if (-not $env:ANDROID_HOME) { $env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android\Sdk' }
if (-not (Test-Path -LiteralPath (Join-Path $env:ANDROID_HOME 'platforms\android-34\android.jar'))) {
    throw 'SDK Android 34 belum ada. Jalankan scripts/prepare-android.ps1 terlebih dahulu.'
}

# Build web dan salin hasilnya ke proyek Android dari repo sumber.
& npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Build web gagal.' }
& npx.cmd --no-install cap sync android
if ($LASTEXITCODE -ne 0) { throw 'Sinkronisasi Android gagal.' }
# Gradle mengubah proyek Android menjadi APK debug untuk pengujian.
Push-Location -LiteralPath (Join-Path $projectDirectory 'android')
try {
    & .\gradlew.bat assembleDebug --console=plain
    if ($LASTEXITCODE -ne 0) { throw 'Build APK gagal.' }
} finally {
    Pop-Location
}
# Salin hasil build ke folder output agar APK mudah ditemukan.
$outputDirectory = Join-Path $projectDirectory 'output'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
Copy-Item -LiteralPath 'android/app/build/outputs/apk/debug/app-debug.apk' -Destination (Join-Path $outputDirectory 'crypto-tugas-3.apk') -Force
Write-Output 'APK berhasil dibuat: output/crypto-tugas-3.apk'
