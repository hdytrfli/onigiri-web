import type { APIRoute } from "astro";
import { fetchLatestVersion } from "../../lib/release";

export const prerender = false;

export const GET: APIRoute = async () => {
  const version = await fetchLatestVersion();

  return new Response(JSON.stringify({ version: version ?? null }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": version
        ? "public, max-age=60, s-maxage=300, stale-while-revalidate=86400"
        : "public, max-age=30, s-maxage=60",
    },
  });
};
