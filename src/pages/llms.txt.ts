import type { APIRoute } from "astro";
import skillsRaw from "../skills.md?raw";

export const GET: APIRoute = () => {
  const body = skillsRaw.trim() + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
