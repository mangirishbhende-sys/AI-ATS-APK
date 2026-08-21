#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

export ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"
export PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"

echo "sdk.dir=${ANDROID_HOME}" > local.properties

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
