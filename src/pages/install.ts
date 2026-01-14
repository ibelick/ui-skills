import type { APIRoute } from "astro";
import installScript from "../../install.sh?raw";

export const GET: APIRoute = ({ request }) => {
  try {
    const payload = {
      u: "https://ui-skills.com/install",
      e: [{ t: "install" }],
    };
    const data = btoa(JSON.stringify(payload));
    const collectorUrl = `https://collector.onedollarstats.com/events?data=${data}`;

    fetch(collectorUrl, {
      method: "GET",
      headers: {
        "User-Agent": request.headers.get("user-agent") || "curl",
        "X-Forwarded-For": request.headers.get("x-forwarded-for") || "",
      },
    }).catch(() => {});
  } catch (e) {}

  const body = installScript.trim() + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
    },
  });
};
