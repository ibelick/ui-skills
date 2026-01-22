import type { APIRoute } from "astro";
import installScript from "../../install.sh?raw";

export const GET: APIRoute = ({ request }) => {
  const body = installScript.trim() + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
    },
  });
};
