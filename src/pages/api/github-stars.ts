import type { APIRoute } from "astro";
import { githubStars } from "../../data/github-stars.ts";

export const prerender = true;

export const GET: APIRoute = async () => {
  return Response.json(githubStars, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, must-revalidate",
    },
  });
};
