#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ ! -f gradlew ]]; then
  echo "Gradle wrapper missing; generating wrapper..."
  if ! command -v gradle >/dev/null 2>&1; then
  wget -q https://services.gradle.org/distributions/gradle-8.11.1-bin.zip -O /tmp/gradle.zip
  unzip -q /tmp/gradle.zip -d /tmp
  GRADLE_BIN=/tmp/gradle-8.11.1/bin/gradle
  else
    GRADLE_BIN=gradle
  fi
  "$GRADLE_BIN" wrapper --gradle-version 8.11.1
fi

./gradlew --no-daemon test assembleDebug
