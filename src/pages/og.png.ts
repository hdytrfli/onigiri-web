import type { APIRoute } from "astro";
import { renderOg } from "../lib/og";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOg();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": import.meta.env.PROD
        ? "public, max-age=31536000, immutable"
        : "no-store",
    },
  });
};
