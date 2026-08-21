# AI-ATS-APK

Applicant Tracking System for the **Accounts Receivable Executive** role.

This repository includes:

- **Web SPA** — `index.html`, `styles.css`, `script.js` (open in a browser)
- **Android app** — Gradle project under `app/`

## Web app (Meridian ATS)

GitHub file view only shows source. Open the app with a preview link, or download the repo and double-click `index.html`.

- GitHack: https://raw.githack.com/mangirishbhende-sys/AI-ATS-APK/main/index.html
- HTML Preview: https://htmlpreview.github.io/?https://github.com/mangirishbhende-sys/AI-ATS-APK/blob/main/index.html

Recruiter login: `admin@company.com` / `password`

## Android app

Prerequisites are installed automatically in Cloud Agent environments via `.cursor/environment.json`.

```bash
./gradlew test
./gradlew assembleDebug
```

The debug APK is written to `app/build/outputs/apk/debug/app-debug.apk`.
