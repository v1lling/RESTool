interface BuildInfo {
    version: string;
    buildDate: string;
}

// This file is processed by Maven during the build process.
// The values will be replaced with the actual version and build date.
// Then it will be copied to /src directory.
export const buildInfo: BuildInfo = {
    version: 'dev',
    buildDate: new Date().toISOString(),
};