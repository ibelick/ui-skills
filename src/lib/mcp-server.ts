import type { APIRoute } from "astro";

import {
  defaultSkillContentLoader,
  getRegistrySkillByDiscoveryName,
  skillArtifactPath,
  toDiscoveryName,
} from "./agent-skills-discovery";
import { getSiteOrigin } from "./agent-discovery";
import { registry } from "../data/registry";

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

const corsHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version",
};

const MAX_REQUEST_BYTES = 64 * 1024;

function jsonRpcResult(id: JsonRpcRequest["id"], result: unknown) {
  return new Response(
    JSON.stringify({ jsonrpc: "2.0", id: id ?? null, result }),
    { headers: corsHeaders },
  );
}

function jsonRpcError(
  id: JsonRpcRequest["id"],
  code: number,
  message: string,
  status = 200,
) {
  return new Response(
    JSON.stringify({
      jsonrpc: "2.0",
      id: id ?? null,
      error: { code, message },
    }),
    { status, headers: corsHeaders },
  );
}

const tools = [
  {
    name: "list_skills",
    description:
      "List skills from the UI Skills registry (same catalog as ui-skills list).",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional filter over pathSlug, name, or description.",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "get_skill",
    description:
      "Fetch skill markdown by discovery name, slug, or pathSlug (same content as ui-skills get).",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description:
            "Discovery name, slug, or pathSlug (for example baseline-ui or ibelick/baseline-ui).",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
  },
];

export const mcpOptions: APIRoute = () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const mcpGet: APIRoute = ({ site }) => {
  const origin = getSiteOrigin(site);
  const endpoint = `${origin}/mcp`;
  return new Response(
    JSON.stringify(
      {
        name: "UI Skills MCP",
        version: "0.2.4",
        protocol: "mcp",
        endpoint,
        registry: `${origin}/skills/registry.json`,
        tools: tools.map((tool) => tool.name),
      },
      null,
      2,
    ),
    { headers: corsHeaders },
  );
};

export const mcpPost: APIRoute = async ({ request, site }) => {
  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_REQUEST_BYTES) {
    return jsonRpcError(null, -32600, "Request body is too large", 413);
  }
  let body: JsonRpcRequest | null = null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      body = parsed as JsonRpcRequest;
    }
  } catch {
    body = null;
  }
  if (!body || body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return jsonRpcError(null, -32600, "Invalid Request", 400);
  }

  const origin = getSiteOrigin(site);

  switch (body.method) {
    case "initialize":
      return jsonRpcResult(body.id, {
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name: "UI Skills", version: "0.2.4" },
      });
    case "ping":
      return jsonRpcResult(body.id, {});
    case "notifications/initialized":
      return new Response(null, { status: 202, headers: corsHeaders });
    case "tools/list":
      return jsonRpcResult(body.id, { tools });
    case "tools/call": {
      const name =
        typeof body.params?.name === "string" ? body.params.name : "";
      const args =
        body.params?.arguments && typeof body.params.arguments === "object"
          ? (body.params.arguments as Record<string, unknown>)
          : {};

      if (name === "list_skills") {
        const query =
          typeof args.query === "string" ? args.query.trim().toLowerCase() : "";
        const skills = registry
          .filter((entry) => {
            if (!query) return true;
            const haystack =
              `${entry.slug} ${entry.pathSlug} ${entry.name} ${entry.description}`.toLowerCase();
            return haystack.includes(query);
          })
          .map((entry) => ({
            name: toDiscoveryName(entry.pathSlug),
            pathSlug: entry.pathSlug,
            description: entry.description,
            url: `${origin}${skillArtifactPath(entry.pathSlug)}`,
          }));

        return jsonRpcResult(body.id, {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  source: `${origin}/skills/registry.json`,
                  count: skills.length,
                  skills,
                },
                null,
                2,
              ),
            },
          ],
        });
      }

      if (name === "get_skill") {
        const skillName = typeof args.name === "string" ? args.name : "";
        const entry = getRegistrySkillByDiscoveryName(skillName);
        if (!entry) {
          return jsonRpcResult(body.id, {
            isError: true,
            content: [
              {
                type: "text",
                text: `Unknown skill "${skillName}". Use list_skills or ui-skills list.`,
              },
            ],
          });
        }

        try {
          const content = await defaultSkillContentLoader(entry);
          return jsonRpcResult(body.id, {
            content: [{ type: "text", text: content }],
          });
        } catch {
          return jsonRpcResult(body.id, {
            isError: true,
            content: [
              {
                type: "text",
                text: `Failed to fetch skill content for ${entry.pathSlug}`,
              },
            ],
          });
        }
      }

      return jsonRpcError(body.id, -32601, `Unknown tool: ${name}`);
    }
    default:
      return jsonRpcError(body.id, -32601, `Method not found: ${body.method}`);
  }
};
