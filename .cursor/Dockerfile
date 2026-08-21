FROM eclipse-temurin:21-jdk-jammy

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        git \
        unzip \
        wget \
    && rm -rf /var/lib/apt/lists/*

ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools"

RUN mkdir -p "${ANDROID_HOME}/cmdline-tools" \
    && wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdline-tools.zip \
    && unzip -q /tmp/cmdline-tools.zip -d "${ANDROID_HOME}/cmdline-tools" \
    && mv "${ANDROID_HOME}/cmdline-tools/cmdline-tools" "${ANDROID_HOME}/cmdline-tools/latest" \
    && rm /tmp/cmdline-tools.zip \
    && yes | sdkmanager --licenses \
    && sdkmanager \
        "platform-tools" \
        "platforms;android-35" \
        "build-tools;35.0.0"

RUN groupadd -g 1000 ubuntu 2>/dev/null || true \
    && useradd -m -u 1000 -g ubuntu ubuntu 2>/dev/null || true \
    && chown -R ubuntu:ubuntu "${ANDROID_HOME}"

USER ubuntu
