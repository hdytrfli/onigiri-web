export const FALLBACK_VERSION = "1.0.0-beta.6";

const RELEASES_URL = "https://api.github.com/repos/hdytrfli/onigiri/releases?per_page=5";

type Release = { tag_name?: string; draft?: boolean };

function versionFromTag(tag?: string): string | undefined {
  return tag?.replace(/^v/, "");
}

function versionFromReleases(releases: unknown): string | undefined {
  if (!Array.isArray(releases)) return undefined;

  const release = (releases as Release[]).find((item) => item && !item.draft);
  return versionFromTag(release?.tag_name);
}

export async function fetchLatestVersion(): Promise<string | undefined> {
  try {
    const response = await fetch(RELEASES_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) return undefined;

    return versionFromReleases(await response.json());
  } catch {
    return undefined;
  }
}
