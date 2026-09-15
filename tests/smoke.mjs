import { spawn } from "node:child_process";
import net from "node:net";

const requestedPort = Number(process.env.SMOKE_PORT ?? 0);
const port =
  requestedPort ||
  (await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const selectedPort =
        typeof address === "object" && address ? address.port : 0;
      probe.close((error) => (error ? reject(error) : resolve(selectedPort)));
    });
  }));
const server = spawn(
  "npx",
  [
    "wrangler",
    "dev",
    "--config",
    "dist/server/wrangler.json",
    "--local",
    "--ip",
    "127.0.0.1",
    "--port",
    `${port}`,
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk.toString();
});
server.stderr.on("data", (chunk) => {
  output += chunk.toString();
});

const fetchLocal = (path, init = {}, timeoutMs = 15000) =>
  fetch(`http://127.0.0.1:${port}${path}`, {
    ...init,
    signal: AbortSignal.timeout(timeoutMs),
  });

const waitForServer = async () => {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    try {
      const response = await fetchLocal("/");
      if (response.ok) {
        // Drain the body so the connection can be reused cleanly.
        await response.arrayBuffer();
        return;
      }
    } catch {
      // The preview server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Preview server did not start:\n${output}`);
};

let exitCode = 0;

try {
  await waitForServer();

  const homepage = await fetchLocal("/");
  if (homepage.status !== 200) {
    throw new Error(`Homepage returned ${homepage.status}`);
  }
  if (homepage.headers.get("content-security-policy") === null) {
    throw new Error("Homepage is missing Content-Security-Policy");
  }
  const githubStars = await fetchLocal("/api/github-stars");
  if (githubStars.status !== 200) {
    throw new Error(`GitHub stars returned ${githubStars.status}`);
  }
  const githubStarsBody = await githubStars.json();
  if (
    !githubStarsBody ||
    typeof githubStarsBody.stars !== "number" ||
    typeof githubStarsBody.label !== "string"
  ) {
    throw new Error("GitHub stars returned an invalid payload");
  }
  const homepageLink = homepage.headers.get("link");
  if (homepageLink === null || !/rel="api-catalog"/.test(homepageLink)) {
    throw new Error("Homepage is missing discovery Link headers");
  }
  const homepageBody = await homepage.text();
  if (
    !/^<!doctype html>/i.test(homepageBody) &&
    !homepageBody.includes("<html")
  ) {
    throw new Error(
      `Homepage did not return HTML: ${homepageBody.slice(0, 200)}`,
    );
  }
  if (!homepageBody.includes("Agent, start here.")) {
    throw new Error("Homepage is missing the agent access section");
  }
  if (!homepageBody.includes(">CLI<")) {
    throw new Error("Homepage is missing the CLI access card");
  }
  if (!homepageBody.includes(">MCP<")) {
    throw new Error("Homepage is missing the MCP access card");
  }
  if (!homepageBody.includes('href="/cli"')) {
    throw new Error("Homepage is missing the CLI guide link");
  }
  if (!homepageBody.includes('href="/mcp/docs"')) {
    throw new Error("Homepage is missing the MCP guide link");
  }
  if (
    !homepageBody.includes(
      'dataset.url = "https://collector.onedollarstats.com/events"',
    )
  ) {
    throw new Error("Homepage is missing the direct One Dollar Stats collector");
  }
  if (!homepageBody.includes('script.src = "/analytics/stonks.js"')) {
    throw new Error("Homepage is missing the first-party One Dollar Stats loader");
  }
  if (homepageBody.includes("assets.onedollarstats.com/stonks.js")) {
    throw new Error("Homepage still loads One Dollar Stats from a third-party origin");
  }

  const stonksScript = await fetchLocal("/analytics/stonks.js");
  if (stonksScript.status !== 200) {
    throw new Error("First-party One Dollar Stats script is missing");
  }

  const mcpMetadata = await fetchLocal("/mcp.json");
  if (mcpMetadata.status !== 200) {
    throw new Error(`Static MCP metadata returned ${mcpMetadata.status}`);
  }
  const mcpMetadataType = mcpMetadata.headers.get("content-type") ?? "";
  if (!mcpMetadataType.startsWith("application/json")) {
    throw new Error(`Static MCP metadata returned unexpected type: ${mcpMetadataType}`);
  }
  if (mcpMetadata.headers.get("cache-control") === null) {
    throw new Error("Static MCP metadata is missing cache headers");
  }
  if (!(await mcpMetadata.text()).includes('"UI Skills MCP"')) {
    throw new Error("Static MCP metadata is invalid");
  }

  const analyticsProxy = await fetchLocal("/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      u: "https://www.ui-skills.com/",
      e: [{ t: "PageView" }],
    }),
  });
  if (![404, 405].includes(analyticsProxy.status)) {
    throw new Error("Analytics proxy route is still active");
  }

  const mcpDocs = await fetchLocal("/mcp/docs");
  if (mcpDocs.status !== 200) {
    throw new Error(`MCP docs returned ${mcpDocs.status}`);
  }
  const mcpDocsBody = await mcpDocs.text();
  if (!mcpDocsBody.includes("https://www.ui-skills.com/mcp")) {
    throw new Error("MCP docs are missing the endpoint code block");
  }
  if (
    !mcpDocsBody.includes(
      "https://www.ui-skills.com/.well-known/mcp/server-card.json",
    )
  ) {
    throw new Error("MCP docs are missing the server card code block");
  }
  if (!/style="color:#/i.test(mcpDocsBody)) {
    throw new Error("MCP docs code blocks are missing Shiki theme colors");
  }

  const legacyAgent = await fetchLocal("/agent/claude-code", {
    redirect: "manual",
  });
  if (
    legacyAgent.status !== 301 ||
    legacyAgent.headers.get("location") !== "/agents/claude-code"
  ) {
    throw new Error("Legacy agent route did not return its static redirect");
  }

  const legacyMcp = await fetchLocal("/mcp/server", { redirect: "manual" });
  if (
    legacyMcp.status !== 302 ||
    legacyMcp.headers.get("location") !== "/mcp/docs"
  ) {
    throw new Error("Legacy MCP route did not return its static redirect");
  }

  const cliDocs = await fetchLocal("/cli");
  if (cliDocs.status !== 200) {
    throw new Error(`CLI docs returned ${cliDocs.status}`);
  }
  const cliDocsBody = await cliDocs.text();
  for (const command of [
    "npx ui-skills start",
    "npx ui-skills categories",
    "npx ui-skills list --category motion",
    "npx ui-skills get baseline-ui",
  ]) {
    if (!cliDocsBody.includes(command)) {
      throw new Error(`CLI docs are missing ${command}`);
    }
  }

  const apiCatalog = await fetchLocal("/.well-known/api-catalog");
  if (apiCatalog.status !== 200) {
    throw new Error(`API catalog returned ${apiCatalog.status}`);
  }
  const apiCatalogType = apiCatalog.headers.get("content-type") ?? "";
  if (!apiCatalogType.startsWith("application/linkset+json")) {
    throw new Error(`API catalog returned unexpected type: ${apiCatalogType}`);
  }

  const registry = await fetchLocal("/skills/registry.json");
  if (registry.status !== 200) {
    throw new Error(`Registry returned ${registry.status}`);
  }

  const registryText = await fetchLocal("/skills/registry.txt");
  if (registryText.status !== 200) {
    throw new Error(`Text registry returned ${registryText.status}`);
  }

  const mcp = await fetchLocal("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
  if (mcp.status !== 200 || !(await mcp.text()).includes('"list_skills"')) {
    throw new Error(`MCP tools/list failed with ${mcp.status}`);
  }
  if (mcp.headers.get("x-content-type-options") !== "nosniff") {
    throw new Error("MCP response is missing dynamic security headers");
  }

  const invalidMcp = await fetchLocal("/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "not-json",
  });
  if (invalidMcp.status !== 400) {
    throw new Error(`Invalid MCP request returned ${invalidMcp.status}`);
  }

  const oauthMetadata = await fetchLocal(
    "/.well-known/oauth-authorization-server",
  );
  if (
    oauthMetadata.status !== 200 ||
    !(await oauthMetadata.text()).includes('"token_endpoint"')
  ) {
    throw new Error(`OAuth metadata failed with ${oauthMetadata.status}`);
  }

  const playbook = await fetchLocal("/playbook/use-large-touch-targets");
  if (playbook.status !== 200) {
    throw new Error(`Playbook returned ${playbook.status}`);
  }
  const playbookBody = await playbook.text();
  if (!playbookBody.includes("Use 44px touch targets for accessibility")) {
    throw new Error("Playbook page is missing its title");
  }
  if (!playbookBody.includes("44px target")) {
    throw new Error("Playbook page is missing its interactive demo content");
  }
  for (const marker of [
    '"@type":"TechArticle"',
    '"@type":"BreadcrumbList"',
    '"mainEntityOfPage":"https://www.ui-skills.com/playbook/use-large-touch-targets"',
    '<link rel="canonical" href="https://www.ui-skills.com/playbook/use-large-touch-targets"',
  ]) {
    if (!playbookBody.includes(marker)) {
      throw new Error(`Playbook page is missing SEO metadata: ${marker}`);
    }
  }

  const designDocument = await fetchLocal("/design.md");
  if (designDocument.status !== 200) {
    throw new Error(`Design document returned ${designDocument.status}`);
  }
  if (
    designDocument.headers.get("content-type") !==
    "text/markdown; charset=utf-8"
  ) {
    throw new Error("Design document returned the wrong content type");
  }

  const missing = await fetchLocal("/skills/does-not-exist");
  if (missing.status !== 404) {
    throw new Error(`Missing route returned ${missing.status}`);
  }

  const localSkillPage = await fetchLocal("/skills/ibelick/improve-ui");
  if (localSkillPage.status !== 200) {
    throw new Error(`Local skill page returned ${localSkillPage.status}`);
  }
  const localSkillBody = await localSkillPage.text();
  if (!localSkillBody.includes("Audit one coherent product surface")) {
    throw new Error("Local skill page is missing bundled skill content");
  }

  const remoteSkillPage = await fetchLocal(
    "/skills/jakubkrehel/make-interfaces-feel-better",
  );
  if (remoteSkillPage.status !== 200) {
    throw new Error(`Remote skill page returned ${remoteSkillPage.status}`);
  }
  const remoteSkillBody = await remoteSkillPage.text();
  if (
    remoteSkillBody.includes("Error:") ||
    remoteSkillBody.includes("Skill source unavailable")
  ) {
    throw new Error("Remote skill page exposed a fetch error");
  }
} catch (error) {
  exitCode = 1;
  console.error(error instanceof Error ? error.message : error);
} finally {
  // Wrangler/workerd can ignore SIGTERM and keep stdio pipes open, which
  // prevents Node from exiting after the checks finish.
  server.kill("SIGKILL");
}

process.exit(exitCode);
