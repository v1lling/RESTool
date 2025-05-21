interface BuildInfo {
    version: string;
    buildDate: string;
}

// This file is processed by Maven during the build process.
// The values will be replaced with the actual version and build date.
// Src File: /maven/version.tsx
// Dest File: /src/version.tsx
export const buildInfo: BuildInfo = {
    version: '0.9.0-SNAPSHOT',
    buildDate: '2025-05-13T12:10:51Z'
};