export type RegistrySkill = {
  slug: string;
  pathSlug: string;
  sourceKey: string;
  sourceLabel: string;
  user: string;
  repo: string;
  rawUrl: string;
  githubUrl: string;
  name: string;
  description: string;
  topics?: TopicSlug[];
};

export type TopicSlug =
  // Design engineering core
  | "accessibility"
  | "motion"
  | "systems"
  | "visual"
  | "interaction"
  | "performance"
  | "craft"
  | "taste"
  | "typography"
  | "color"
  | "3d"
  // Broader frontend
  | "frontend"
  | "architecture"
  | "frameworks"
  | "testing"
  | "debugging"
  | "code-quality"
  | "tooling"
  | "video"
  // Framework-specific topics
  | "nextjs"
  | "nuxt"
  | "vue"
  | "react-native"
  | "threejs"
  | "remotion"
  | "swiftui";

type RegistrySourceSkill = Omit<
  RegistrySkill,
  "pathSlug" | "sourceKey" | "sourceLabel"
>;

const registrySource: RegistrySourceSkill[] = [
  {
    slug: "ui-skills-root",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/ui-skills-root/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/ui-skills-root/SKILL.md",
    name: "ui-skills-root",
    topics: ["systems", "tooling", "architecture"],
    description:
      "Use when the user needs UI help and you must route by topic, stack, and intent to the smallest useful set of UI skills.",
  },
  {
    slug: "baseline-ui",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/baseline-ui/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/baseline-ui/SKILL.md",
    name: "baseline-ui",
    topics: ["systems", "visual", "craft"],
    description:
      "Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup or polish pass.",
  },
  {
    slug: "create-design-md",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/create-design-md/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/create-design-md/SKILL.md",
    name: "create-design-md",
    topics: ["systems", "tooling", "visual"],
    description:
      "Create or update a DESIGN.md from an existing product repository or public website, with evidence-based design tokens and guidance.",
  },
  {
    slug: "i-have-adhd",
    user: "ayghri",
    repo: "i-have-adhd",
    rawUrl:
      "https://raw.githubusercontent.com/ayghri/i-have-adhd/main/skills/i-have-adhd/SKILL.md",
    githubUrl:
      "https://github.com/ayghri/i-have-adhd/blob/main/skills/i-have-adhd/SKILL.md",
    name: "i-have-adhd",
    topics: ["tooling"],
    description:
      "Shape output for a reader with ADHD by leading with the next action, numbering steps, suppressing tangents, and making progress visible.",
  },
  {
    slug: "design-first-ui-prompting",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/ui/design-first-ui-prompting/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/ui/design-first-ui-prompting/SKILL.md",
    name: "design-first-ui-prompting",
    topics: ["visual", "systems", "frontend"],
    description:
      "Use when you want to turn a product goal into a design-first UI prompt with clear layout, type, color, and constraint choices.",
  },
  {
    slug: "landing-page",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/landing-page/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/landing-page/SKILL.md",
    name: "landing-page",
    topics: ["visual", "frontend", "interaction"],
    description:
      "Use when designing or implementing a landing page with strong hierarchy, conversion flow, and visual pacing.",
  },
  {
    slug: "pricing-page",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/pricing-page/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/pricing-page/SKILL.md",
    name: "pricing-page",
    topics: ["visual", "frontend", "interaction"],
    description:
      "Use when building a pricing page with clear plan comparison, emphasis, and conversion-oriented layout.",
  },
  {
    slug: "tailwindcss",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/tailwindcss/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/tailwindcss/SKILL.md",
    name: "tailwindcss",
    topics: ["frontend", "systems", "tooling"],
    description:
      "Use when you are implementing UI with Tailwind and want reusable, practical utility-first patterns.",
  },
  {
    slug: "animation-systems",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/animation-systems/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/animation-systems/SKILL.md",
    name: "animation-systems",
    topics: ["motion", "systems", "frontend"],
    description:
      "Use when building a coherent animation system instead of one-off motion tweaks.",
  },
  {
    slug: "animation-on-scroll",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/animation-on-scroll/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/animation-on-scroll/SKILL.md",
    name: "animation-on-scroll",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Use when you need scroll-driven motion that feels intentional instead of noisy or overdone.",
  },
  {
    slug: "gsap",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/gsap/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/gsap/SKILL.md",
    name: "gsap",
    topics: ["motion", "frontend", "interaction"],
    description:
      "Use when implementing motion with GSAP and you want practical animation structure and sequencing guidance.",
  },
  {
    slug: "gsap-scrolltrigger-storytelling",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/gsap-scrolltrigger-storytelling/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/gsap-scrolltrigger-storytelling/SKILL.md",
    name: "gsap-scrolltrigger-storytelling",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Use when building scroll-based storytelling sections with GSAP ScrollTrigger.",
  },
  {
    slug: "threejs",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/threejs/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/threejs/SKILL.md",
    name: "threejs",
    topics: ["threejs", "motion", "frontend"],
    description:
      "Use when building 3D scenes, interactions, or WebGL-backed interface moments in Three.js.",
  },
  {
    slug: "cobejs",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/cobejs/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/cobejs/SKILL.md",
    name: "cobejs",
    topics: ["3d", "visual", "frontend"],
    description:
      "Use when building lightweight animated globe or orb visuals with Cobe.",
  },
  {
    slug: "matterjs",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/matterjs/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/matterjs/SKILL.md",
    name: "matterjs",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Use when building physics-driven interactions and layout behaviors with Matter.js.",
  },
  {
    slug: "progressive-blur",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/progressive-blur/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/progressive-blur/SKILL.md",
    name: "progressive-blur",
    topics: ["visual", "motion", "frontend"],
    description:
      "Use when applying blur transitions or layered depth effects that need to feel smooth and controlled.",
  },
  {
    slug: "beautiful-shadows",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/beautiful-shadows/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/beautiful-shadows/SKILL.md",
    name: "beautiful-shadows",
    topics: ["visual", "craft", "frontend"],
    description:
      "Use when a UI needs better depth, elevation, and shadow treatment without looking muddy.",
  },
  {
    slug: "company-logos",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/company-logos/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/company-logos/SKILL.md",
    name: "company-logos",
    topics: ["systems", "visual", "frontend"],
    description:
      "Use when laying out logos, trust rows, or brand collections in a clean and balanced way.",
  },
  {
    slug: "container-lines",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/container-lines/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/container-lines/SKILL.md",
    name: "container-lines",
    topics: ["systems", "visual", "frontend"],
    description:
      "Use when using borders and container structure as part of the visual system.",
  },
  {
    slug: "masked-reveal",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/masked-reveal/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/masked-reveal/SKILL.md",
    name: "masked-reveal",
    topics: ["motion", "visual", "frontend"],
    description:
      "Use when revealing content with masked motion, clipped transitions, or layered entrances.",
  },
  {
    slug: "marquee-loop",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/marquee-loop/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/marquee-loop/SKILL.md",
    name: "marquee-loop",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Use when building looping marquees that need steady rhythm, spacing, and performance awareness.",
  },
  {
    slug: "webgl-landing-steering",
    user: "MengTo",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/MengTo/Skills/main/agent-skills/web-design/webgl-landing-steering/SKILL.md",
    githubUrl:
      "https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/webgl-landing-steering/SKILL.md",
    name: "webgl-landing-steering",
    topics: ["threejs", "visual", "frontend"],
    description:
      "Use when steering a landing page around a WebGL centerpiece or hero experience.",
  },
  {
    slug: "fixing-accessibility",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/fixing-accessibility/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-accessibility/SKILL.md",
    name: "fixing-accessibility",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Use when adding interactive controls, forms, dialogs, or reviewing WCAG compliance.",
  },
  {
    slug: "fixing-metadata",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/fixing-metadata/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-metadata/SKILL.md",
    name: "fixing-metadata",
    topics: ["architecture", "frontend", "tooling"],
    description:
      "Audit and fix page metadata including titles, meta descriptions, Open Graph, Twitter cards, canonical URLs, and JSON-LD structured data. Use when shipping new pages or fixing SEO and social preview issues.",
  },
  {
    slug: "fixing-motion-performance",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/fixing-motion-performance/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/fixing-motion-performance/SKILL.md",
    name: "fixing-motion-performance",
    topics: ["motion", "performance", "frontend"],
    description:
      "Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, and blur effects. Use when animations stutter, transitions jank, or reviewing CSS/JS animation performance.",
  },
  {
    slug: "frontend-design",
    user: "anthropics",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md",
    githubUrl:
      "https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md",
    name: "frontend-design",
    topics: ["visual", "systems", "frontend"],
    description:
      "Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code and UI design that avoids generic AI aesthetics.",
  },
  {
    slug: "anti-ui-slop",
    user: "samuelbushi",
    repo: "uizze",
    rawUrl:
      "https://uizze.com/.well-known/agent-skills/anti-ui-slop/SKILL.md",
    githubUrl: "https://uizze.com",
    name: "UIZZE — STOP UI SLOP",
    topics: ["taste", "visual", "systems"],
    description:
      "If your UI looks AI-generated, you've already lost the first impression. Ground Codex, Claude Code, Cursor, and Copilot in 800,000+ real web and iOS screens, then force a hard finish gate before generic UI ships.",
  },
  {
    slug: "remotion-best-practices",
    user: "remotion-dev",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/remotion-dev/skills/main/skills/remotion-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/remotion-dev/skills/blob/main/skills/remotion-best-practices/SKILL.md",
    name: "remotion-best-practices",
    topics: ["video", "motion", "remotion"],
    description:
      "Domain-specific knowledge base for building videos with Remotion and React.",
  },
  {
    slug: "create-adaptable-composable",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/create-adaptable-composable/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/create-adaptable-composable/SKILL.md",
    name: "create-adaptable-composable",
    topics: ["vue", "frontend", "tooling"],
    description:
      "Create library-grade Vue composables that support plain values, refs, and getters with predictable reactivity.",
  },
  {
    slug: "vue-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-best-practices/SKILL.md",
    name: "vue-best-practices",
    topics: ["vue", "frontend", "performance"],
    description:
      "Core Vue development best practices for component architecture, reactivity, and maintainable code.",
  },
  {
    slug: "vue-debug-guides",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-debug-guides/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-debug-guides/SKILL.md",
    name: "vue-debug-guides",
    topics: ["vue", "testing", "tooling"],
    description:
      "Practical debugging workflows for diagnosing and fixing Vue reactivity, rendering, and state issues.",
  },
  {
    slug: "vue-jsx-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-jsx-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-jsx-best-practices/SKILL.md",
    name: "vue-jsx-best-practices",
    topics: ["vue", "frontend", "tooling"],
    description:
      "Guidance for writing robust, type-safe, and readable Vue components using JSX.",
  },
  {
    slug: "vue-options-api-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-options-api-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-options-api-best-practices/SKILL.md",
    name: "vue-options-api-best-practices",
    topics: ["vue", "frontend", "tooling"],
    description:
      "Best practices for structuring and scaling Vue applications built with the Options API.",
  },
  {
    slug: "vue-pinia-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-pinia-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-pinia-best-practices/SKILL.md",
    name: "vue-pinia-best-practices",
    topics: ["vue", "systems", "frontend"],
    description:
      "Patterns for clean, scalable state management in Vue apps using Pinia stores.",
  },
  {
    slug: "vue-router-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-router-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-router-best-practices/SKILL.md",
    name: "vue-router-best-practices",
    topics: ["vue", "interaction", "frontend"],
    description:
      "Routing architecture and navigation patterns for maintainable Vue Router applications.",
  },
  {
    slug: "vue-testing-best-practices",
    user: "vuejs-ai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/vuejs-ai/skills/main/skills/vue-testing-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vuejs-ai/skills/blob/main/skills/vue-testing-best-practices/SKILL.md",
    name: "vue-testing-best-practices",
    topics: ["vue", "testing", "frontend"],
    description:
      "Testing strategies for Vue applications, including component tests, integration tests, and reliability patterns.",
  },
  {
    slug: "web-design-guidelines",
    user: "vercel-labs",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/web-design-guidelines/SKILL.md",
    githubUrl:
      "https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md",
    name: "web-design-guidelines",
    topics: ["visual", "accessibility", "frontend"],
    description:
      "Review UI code for Web Interface Guidelines compliance. Audit design, accessibility, and UX against Vercel's best practices.",
  },
  {
    slug: "next-cache-components",
    user: "vercel",
    repo: "next.js",
    rawUrl:
      "https://raw.githubusercontent.com/vercel/next.js/canary/skills/next-cache-components-adoption/SKILL.md",
    githubUrl:
      "https://github.com/vercel/next.js/blob/canary/skills/next-cache-components-adoption/SKILL.md",
    name: "next-cache-components",
    topics: ["nextjs", "performance", "frontend"],
    description:
      "Enable Cache Components in a Next.js app and resolve blocking routes surfaced during adoption.",
  },
  {
    slug: "next-cache-components-optimizer",
    user: "vercel",
    repo: "next.js",
    rawUrl:
      "https://raw.githubusercontent.com/vercel/next.js/canary/skills/next-cache-components-optimizer/SKILL.md",
    githubUrl:
      "https://github.com/vercel/next.js/blob/canary/skills/next-cache-components-optimizer/SKILL.md",
    name: "next-cache-components-optimizer",
    topics: ["nextjs", "performance", "testing"],
    description:
      "Drive a Next.js route to instant navigation under Cache Components using a failing Playwright test and an agentic fix loop.",
  },
  {
    slug: "agent-browser",
    user: "vercel-labs",
    repo: "agent-browser",
    rawUrl:
      "https://raw.githubusercontent.com/vercel-labs/agent-browser/main/skills/agent-browser/SKILL.md",
    githubUrl:
      "https://github.com/vercel-labs/agent-browser/blob/main/skills/agent-browser/SKILL.md",
    name: "agent-browser",
    topics: ["testing", "tooling", "frontend"],
    description:
      "Browser automation CLI for AI agents for navigation, form actions, extraction, screenshots, QA, and app testing.",
  },
  {
    slug: "frontend-ui-engineering",
    user: "addyosmani",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/agent-skills/main/skills/frontend-ui-engineering/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/agent-skills/blob/main/skills/frontend-ui-engineering/SKILL.md",
    name: "frontend-ui-engineering",
    topics: ["frontend", "systems", "accessibility"],
    description:
      "Frontend UI engineering guidance covering component architecture, responsive design, accessibility, and maintainable implementation patterns.",
  },
  {
    slug: "react-best-practices",
    user: "vercel-labs",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/vercel-labs/agent-skills/main/skills/react-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md",
    name: "vercel-react-best-practices",
    topics: ["frontend", "performance", "systems"],
    description:
      "Vercel React best practices for rendering performance, bundle efficiency, and scalable component architecture.",
  },
  {
    slug: "react-router-framework-mode",
    user: "remix-run",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/remix-run/agent-skills/main/skills/react-router-framework-mode/SKILL.md",
    githubUrl:
      "https://github.com/remix-run/agent-skills/blob/main/skills/react-router-framework-mode/SKILL.md",
    name: "react-router-framework-mode",
    topics: ["frontend", "architecture", "interaction"],
    description:
      "React Router framework-mode patterns for loaders, actions, middleware, route modules, and full-stack rendering flows.",
  },
  {
    slug: "svelte-code-writer",
    user: "sveltejs",
    repo: "ai-tools",
    rawUrl:
      "https://raw.githubusercontent.com/sveltejs/ai-tools/main/plugins/claude/svelte/skills/svelte-code-writer/SKILL.md",
    githubUrl:
      "https://github.com/sveltejs/ai-tools/blob/main/plugins/claude/svelte/skills/svelte-code-writer/SKILL.md",
    name: "svelte-code-writer",
    topics: ["frameworks", "frontend", "tooling"],
    description:
      "Official Svelte code-writing skill focused on modern Svelte patterns, component composition, and production-ready implementations.",
  },
  {
    slug: "playwright-cli",
    user: "microsoft",
    repo: "playwright-cli",
    rawUrl:
      "https://raw.githubusercontent.com/microsoft/playwright-cli/main/skills/playwright-cli/SKILL.md",
    githubUrl:
      "https://github.com/microsoft/playwright-cli/blob/main/skills/playwright-cli/SKILL.md",
    name: "playwright-cli",
    topics: ["testing", "tooling", "frontend"],
    description:
      "Official Playwright CLI skill for browser automation, test generation, tracing, and session-driven end-to-end testing workflows.",
  },
  {
    slug: "web-quality-audit",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/web-quality-audit/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/web-quality-audit/SKILL.md",
    name: "web-quality-audit",
    topics: ["performance", "accessibility", "testing"],
    description:
      "Web quality auditing skill for Lighthouse-style analysis across performance, accessibility, best practices, and SEO signals.",
  },
  {
    slug: "swiss-design",
    user: "zeke",
    repo: "swiss-design-skill",
    rawUrl:
      "https://raw.githubusercontent.com/zeke/swiss-design-skill/main/swiss-design/SKILL.md",
    githubUrl:
      "https://github.com/zeke/swiss-design-skill/blob/main/swiss-design/SKILL.md",
    name: "swiss-design",
    topics: ["visual", "typography", "systems"],
    description:
      "Swiss design system skill focused on grid discipline, typography hierarchy, and clean editorial interface composition.",
  },
  {
    slug: "react-native-best-practices",
    user: "callstackincubator",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/callstackincubator/agent-skills/main/skills/react-native-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/callstackincubator/agent-skills/blob/main/skills/react-native-best-practices/SKILL.md",
    name: "react-native-best-practices",
    topics: ["react-native", "performance", "frontend"],
    description:
      "React Native performance optimization guidelines for FPS, TTI, bundle size, memory leaks, re-renders, and animations.",
  },
  {
    slug: "threejs-animation",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-animation/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-animation/SKILL.md",
    name: "threejs-animation",
    topics: ["threejs", "motion", "frontend"],
    description:
      "Three.js animation guidance for keyframes, skeletal animation, morph targets, and animation blending.",
  },
  {
    slug: "threejs-fundamentals",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-fundamentals/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-fundamentals/SKILL.md",
    name: "threejs-fundamentals",
    topics: ["threejs", "interaction", "frontend"],
    description:
      "Three.js scene setup guidance for cameras, renderer configuration, object hierarchy, and transforms.",
  },
  {
    slug: "threejs-geometry",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-geometry/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-geometry/SKILL.md",
    name: "threejs-geometry",
    topics: ["threejs", "performance", "frontend"],
    description:
      "Three.js geometry patterns for built-in shapes, BufferGeometry, custom meshes, and instancing.",
  },
  {
    slug: "threejs-interaction",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-interaction/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-interaction/SKILL.md",
    name: "threejs-interaction",
    topics: ["threejs", "interaction", "frontend"],
    description:
      "Three.js interaction patterns for raycasting, controls, pointer input, and object selection.",
  },
  {
    slug: "threejs-lighting",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-lighting/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-lighting/SKILL.md",
    name: "threejs-lighting",
    topics: ["threejs", "visual", "frontend"],
    description:
      "Three.js lighting guidance for light types, shadows, environment lighting, and performance tuning.",
  },
  {
    slug: "threejs-loaders",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-loaders/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-loaders/SKILL.md",
    name: "threejs-loaders",
    topics: ["threejs", "tooling", "performance"],
    description:
      "Three.js asset loading patterns for GLTF, textures, HDR assets, async loading, and progress handling.",
  },
  {
    slug: "threejs-materials",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-materials/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-materials/SKILL.md",
    name: "threejs-materials",
    topics: ["threejs", "visual", "frontend"],
    description:
      "Three.js material guidance for PBR, classic materials, shader materials, and material optimization.",
  },
  {
    slug: "threejs-postprocessing",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-postprocessing/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-postprocessing/SKILL.md",
    name: "threejs-postprocessing",
    topics: ["threejs", "visual", "performance"],
    description:
      "Three.js post-processing techniques with EffectComposer, bloom, depth of field, and screen-space effects.",
  },
  {
    slug: "threejs-shaders",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-shaders/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-shaders/SKILL.md",
    name: "threejs-shaders",
    topics: ["threejs", "visual", "frontend"],
    description:
      "Three.js shader guidance for GLSL, ShaderMaterial, uniforms, and custom vertex and fragment effects.",
  },
  {
    slug: "threejs-textures",
    user: "cloudai-x",
    repo: "threejs-skills",
    rawUrl:
      "https://raw.githubusercontent.com/CloudAI-X/threejs-skills/main/skills/threejs-textures/SKILL.md",
    githubUrl:
      "https://github.com/CloudAI-X/threejs-skills/blob/main/skills/threejs-textures/SKILL.md",
    name: "threejs-textures",
    topics: ["threejs", "visual", "frontend"],
    description:
      "Three.js texture workflows for maps, UV mapping, environment maps, and texture configuration.",
  },
  {
    slug: "ui-ux-pro-max",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/ui-ux-pro-max/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md",
    name: "ui-ux-pro-max",
    topics: ["visual", "systems", "frontend"],
    description:
      "Comprehensive UI/UX design intelligence with 50+ styles, 97 palettes, and 9 technology stacks for building professional interfaces.",
  },
  {
    slug: "interaction-design",
    user: "wshobson",
    repo: "agents",
    rawUrl:
      "https://raw.githubusercontent.com/wshobson/agents/main/plugins/ui-design/skills/interaction-design/SKILL.md",
    githubUrl:
      "https://github.com/wshobson/agents/blob/main/plugins/ui-design/skills/interaction-design/SKILL.md",
    name: "interaction-design",
    topics: ["interaction", "motion", "visual"],
    description:
      "Design and implement microinteractions, motion design, transitions, and user feedback patterns for delightful user experiences.",
  },
  {
    slug: "swiftui-ui-patterns",
    user: "dimillian",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/dimillian/skills/main/swiftui-ui-patterns/SKILL.md",
    githubUrl:
      "https://github.com/dimillian/skills/blob/main/swiftui-ui-patterns/SKILL.md",
    name: "swiftui-ui-patterns",
    topics: ["swiftui", "interaction", "systems"],
    description:
      "Best practices and example-driven guidance for building SwiftUI views and components. Includes tab architecture and screen composition.",
  },
  {
    slug: "interface-design",
    user: "Dammyjay93",
    repo: "interface-design",
    rawUrl:
      "https://raw.githubusercontent.com/Dammyjay93/interface-design/main/.claude/skills/interface-design/SKILL.md",
    githubUrl:
      "https://github.com/Dammyjay93/interface-design/blob/main/.claude/skills/interface-design/SKILL.md",
    name: "interface-design",
    topics: ["visual", "systems", "interaction"],
    description:
      "Specialized skill for interface design: dashboards, admin panels, and SaaS apps. Focused on craft and consistency.",
  },
  {
    slug: "wcag-audit-patterns",
    user: "wshobson",
    repo: "agents",
    rawUrl:
      "https://raw.githubusercontent.com/wshobson/agents/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md",
    githubUrl:
      "https://github.com/wshobson/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md",
    name: "wcag-audit-patterns",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation guidance. Use when auditing websites for accessibility, fixing WCAG violations, or implementing accessible design patterns.",
  },
  {
    slug: "canvas-design",
    user: "anthropics",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/anthropics/skills/main/skills/canvas-design/SKILL.md",
    githubUrl:
      "https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md",
    name: "canvas-design",
    topics: ["visual", "interaction", "frontend"],
    description:
      "Create original visual designs and art on digital canvases using design philosophy, focusing on form, space, and color.",
  },
  {
    slug: "antfu",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/antfu/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/antfu/SKILL.md",
    name: "antfu",
    topics: ["tooling", "frontend", "performance"],
    description:
      "Anthony Fu's opinionated tooling and conventions for JavaScript/TypeScript projects.",
  },
  {
    slug: "nuxt",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/nuxt/SKILL.md",
    githubUrl: "https://github.com/antfu/skills/blob/main/skills/nuxt/SKILL.md",
    name: "nuxt",
    topics: ["nuxt", "frontend", "performance"],
    description:
      "Nuxt full-stack Vue framework guidance for SSR, auto-imports, file-based routing, and server routes.",
  },
  {
    slug: "pinia",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/pinia/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/pinia/SKILL.md",
    name: "pinia",
    topics: ["vue", "systems", "frontend"],
    description:
      "Pinia state management best practices for type-safe Vue stores, getters, and actions.",
  },
  {
    slug: "pnpm",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/pnpm/SKILL.md",
    githubUrl: "https://github.com/antfu/skills/blob/main/skills/pnpm/SKILL.md",
    name: "pnpm",
    topics: ["tooling", "frontend", "performance"],
    description:
      "pnpm package manager guidance for strict dependency resolution, workspaces, catalogs, patches, and overrides.",
  },
  {
    slug: "slidev",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/slidev/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/slidev/SKILL.md",
    name: "slidev",
    topics: ["video", "visual", "frontend"],
    description:
      "Create developer slide decks with Slidev using Markdown, Vue components, code highlighting, and animations.",
  },
  {
    slug: "tsdown",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/tsdown/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/tsdown/SKILL.md",
    name: "tsdown",
    topics: ["tooling", "performance", "frontend"],
    description:
      "Bundle TypeScript and JavaScript libraries with tsdown, including declarations and multi-format builds.",
  },
  {
    slug: "turborepo",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/turborepo/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/turborepo/SKILL.md",
    name: "turborepo",
    topics: ["tooling", "performance", "frontend"],
    description:
      "Turborepo monorepo build system guidance for pipelines, caching, filtering, CI, and package boundaries.",
  },
  {
    slug: "unocss",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/unocss/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/unocss/SKILL.md",
    name: "unocss",
    topics: ["tooling", "visual", "frontend"],
    description:
      "UnoCSS atomic CSS engine guidance for rules, shortcuts, and presets like Wind, Icons, and Attributify.",
  },
  {
    slug: "vite",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vite/SKILL.md",
    githubUrl: "https://github.com/antfu/skills/blob/main/skills/vite/SKILL.md",
    name: "vite",
    topics: ["tooling", "performance", "frontend"],
    description:
      "Vite configuration and plugin guidance, including SSR and Vite 8 Rolldown migration patterns.",
  },
  {
    slug: "vitepress",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vitepress/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vitepress/SKILL.md",
    name: "vitepress",
    topics: ["nuxt", "tooling", "frontend"],
    description:
      "VitePress documentation site guidance for configuration, theming, and Markdown plus Vue content.",
  },
  {
    slug: "vitest",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vitest/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vitest/SKILL.md",
    name: "vitest",
    topics: ["testing", "tooling", "frontend"],
    description:
      "Vitest testing best practices for unit tests, mocking, coverage, fixtures, and test filtering.",
  },
  {
    slug: "vue",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vue/SKILL.md",
    githubUrl: "https://github.com/antfu/skills/blob/main/skills/vue/SKILL.md",
    name: "vue",
    topics: ["vue", "interaction", "frontend"],
    description:
      "Vue 3 Composition API and reactivity guidance for SFCs, script setup macros, and built-in components.",
  },
  {
    slug: "vue-best-practices",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vue-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vue-best-practices/SKILL.md",
    name: "vue-best-practices",
    topics: ["vue", "frontend", "performance"],
    description:
      "Vue.js best practices emphasizing Composition API with script setup and TypeScript.",
  },
  {
    slug: "vue-router-best-practices",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vue-router-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vue-router-best-practices/SKILL.md",
    name: "vue-router-best-practices",
    topics: ["vue", "interaction", "frontend"],
    description:
      "Vue Router 4 patterns covering navigation guards, route params, and route lifecycle interactions.",
  },
  {
    slug: "vue-testing-best-practices",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vue-testing-best-practices/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vue-testing-best-practices/SKILL.md",
    name: "vue-testing-best-practices",
    topics: ["vue", "testing", "frontend"],
    description:
      "Vue testing guidance using Vitest, Vue Test Utils, component testing, mocking, and Playwright E2E.",
  },
  {
    slug: "vueuse-functions",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/vueuse-functions/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/vueuse-functions/SKILL.md",
    name: "vueuse-functions",
    topics: ["vue", "tooling", "frontend"],
    description:
      "Apply VueUse composables to build concise, maintainable Vue and Nuxt features.",
  },
  {
    slug: "web-design-guidelines",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/web-design-guidelines/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/web-design-guidelines/SKILL.md",
    name: "web-design-guidelines",
    topics: ["visual", "accessibility", "frontend"],
    description:
      "Review UI code for web interface guideline compliance, including accessibility and UX best practices.",
  },
  {
    slug: "12-principles-of-animation",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/12-principles-of-animation/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/12-principles-of-animation/SKILL.md",
    name: "12-principles-of-animation",
    topics: ["motion", "interaction", "visual"],
    description:
      "Apply Disney's 12 animation principles to web interfaces to make motion feel natural, organic, and human.",
  },
  {
    slug: "design-lab",
    user: "0xdesign",
    repo: "design-plugin",
    rawUrl:
      "https://raw.githubusercontent.com/0xdesign/design-plugin/main/design-and-refine/skills/design-lab/SKILL.md",
    githubUrl:
      "https://github.com/0xdesign/design-plugin/blob/main/design-and-refine/skills/design-lab/SKILL.md",
    name: "design-lab",
    topics: ["visual", "interaction", "systems"],
    description:
      "Interactive design exploration workflow: conduct interviews, generate variants, and refine UI designs through feedback.",
  },
  {
    slug: "make-interfaces-feel-better",
    user: "jakubkrehel",
    repo: "make-interfaces-feel-better",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/make-interfaces-feel-better/main/skills/make-interfaces-feel-better/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/make-interfaces-feel-better/blob/main/skills/make-interfaces-feel-better/SKILL.md",
    name: "make-interfaces-feel-better",
    topics: ["craft", "interaction", "visual"],
    description:
      "Design engineering principles for making interfaces feel polished, with focus on micro-interactions, typography, and visual details.",
  },
  {
    slug: "oklch-skill",
    user: "jakubkrehel",
    repo: "oklch-skill",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/oklch-skill/main/skills/oklch-skill/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/oklch-skill/blob/main/skills/oklch-skill/SKILL.md",
    name: "oklch-skill",
    topics: ["color", "accessibility", "systems"],
    description:
      "Practical OKLCH color workflow skill for building consistent, accessible, and tunable color systems in modern UIs.",
  },
  {
    slug: "better-ui",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-ui/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-ui/SKILL.md",
    name: "better-ui",
    topics: ["visual", "interaction", "motion"],
    description:
      "Design engineering principles for making interfaces feel polished. Use when building UI components, reviewing frontend code, implementing animations, hover states, shadows, borders, micro-interactions, enter/exit animations, or any visual detail work. Triggers on UI polish, design details, \"make it feel better\", \"feels off\", stagger animations, border radius, optical alignment, image outlines, box shadows.",
  },
  {
    slug: "better-colors",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-colors/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-colors/SKILL.md",
    name: "better-colors",
    topics: ["color", "accessibility", "systems"],
    description:
      "OKLCH color space for web projects. Convert hex/rgb/hsl to oklch, generate palettes, check contrast, handle gamut boundaries, and theme with Tailwind v4. Triggers on oklch, color conversion, palette generation, contrast ratio, gamut, display p3, design tokens, hue drift, chroma, dark mode colors.",
  },
  {
    slug: "better-typography",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-typography/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-typography/SKILL.md",
    name: "better-typography",
    topics: ["typography", "visual", "accessibility"],
    description:
      "Web typography from choosing fonts to spacing, wrapping and accessibility. Use when picking or pairing typefaces, configuring variable fonts or OpenType features, setting up a type scale, styling text in components, truncating text, styling underlines, selection, placeholders or carets, or reviewing frontend code for typography. Triggers on typography, fonts, font formats, woff2, variable fonts, font-weight, opentype, font-feature-settings, letter-spacing, line-height, type scale, tabular numbers, text-wrap, truncation, line clamp, underlines, text-decoration, text selection, iOS input zoom, font smoothing, text contrast, measure, line length, text-box, smart punctuation, drop cap.",
  },
  {
    slug: "budge",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/budge/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/budge/SKILL.md",
    name: "budge",
    topics: ["visual", "tooling", "frontend"],
    description:
      "Use when making single-property CSS or Tailwind visual changes in Next.js App Router projects. Presents a floating control widget for live tuning before persisting.",
  },
  {
    slug: "react-doctor",
    user: "millionco",
    repo: "react-doctor",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/react-doctor/main/skills/react-doctor/SKILL.md",
    githubUrl:
      "https://github.com/millionco/react-doctor/blob/main/skills/react-doctor/SKILL.md",
    name: "react-doctor",
    topics: ["testing", "performance", "frontend"],
    description:
      "Run React Doctor to detect regressions in security, performance, correctness, and architecture, with score-based quality checks.",
  },
  {
    slug: "improve-react",
    user: "millionco",
    repo: "react-doctor",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/react-doctor/main/skills/improve-react/SKILL.md",
    githubUrl:
      "https://github.com/millionco/react-doctor/blob/main/skills/improve-react/SKILL.md",
    name: "improve-react",
    topics: ["code-quality", "performance", "architecture", "frontend"],
    description:
      "Survey a React codebase using React Doctor's findings, then produce prioritized audits and self-contained implementation plans without modifying source code.",
  },
  {
    slug: "improve-ui",
    user: "ibelick",
    repo: "ui-skills",
    rawUrl:
      "https://raw.githubusercontent.com/ibelick/ui-skills/main/skills/improve-ui/SKILL.md",
    githubUrl:
      "https://github.com/ibelick/ui-skills/blob/main/skills/improve-ui/SKILL.md",
    name: "improve-ui",
    topics: ["visual", "systems", "frontend"],
    description:
      "Audit an existing product surface against its own design evidence, identify verified UI problems, and write self-contained implementation plans for another agent without modifying product source.",
  },
  {
    slug: "rams",
    user: "rams",
    repo: "rams-ai",
    rawUrl: "https://www.rams.ai/rams.md",
    githubUrl: "",
    name: "rams",
    topics: ["visual", "accessibility", "interaction"],
    description:
      "Real-time design feedback skill focused on accessibility, spacing, typography, contrast, and component quality.",
  },
  {
    slug: "bencium-innovative-ux-designer",
    user: "bencium",
    repo: "bencium-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/bencium/bencium-marketplace/main/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/SKILL.md",
    githubUrl:
      "https://github.com/bencium/bencium-marketplace/blob/main/bencium-innovative-ux-designer/skills/bencium-innovative-ux-designer/SKILL.md",
    name: "bencium-innovative-ux-designer",
    topics: ["visual", "systems", "frontend"],
    description:
      "Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.",
  },
  {
    slug: "audit-and-fix",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-audit/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-audit/SKILL.md",
    name: "audit-and-fix",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Accessibility auditing and remediation workflow that combines detection, prioritization, and practical fixes for WCAG issues.",
  },
  {
    slug: "contrast-checker",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    name: "contrast-checker",
    topics: ["accessibility", "testing", "color"],
    description:
      "Compatibility listing for contrast-checker installs from AccessLint's marketplace skill set.",
  },
  {
    slug: "link-purpose",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    name: "link-purpose",
    topics: ["accessibility", "testing", "interaction"],
    description:
      "Compatibility listing for link-purpose installs from AccessLint's marketplace skill set.",
  },
  {
    slug: "refactor",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-fix/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-fix/SKILL.md",
    name: "refactor",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Compatibility listing for refactor installs from AccessLint's marketplace skill set.",
  },
  {
    slug: "use-of-color",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-inspect/SKILL.md",
    name: "use-of-color",
    topics: ["accessibility", "color", "testing"],
    description:
      "Compatibility listing for use-of-color installs from AccessLint's marketplace skill set.",
  },
  {
    slug: "emil-design-eng",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md",
    name: "emil-design-eng",
    topics: ["craft", "taste", "visual"],
    description:
      "Emil Kowalski's design-engineering philosophy for UI polish, components, animation, and production-ready frontend craft.",
  },
  {
    slug: "apple-design",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/apple-design/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md",
    name: "apple-design",
    topics: ["motion", "interaction", "visual"],
    description:
      "Apple's approach to interface design and fluid, physical motion, translated for the web. Use when building or reviewing gesture-driven UI, spring animations, drag/swipe/sheet interactions, momentum and interruptible transitions, translucent materials and depth, typography (optical sizing, tracking, leading), reduced-motion, or the design foundations (feedback, spatial consistency, restraint) behind Apple-style interfaces.",
  },
  {
    slug: "improve-animations",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/improve-animations/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/improve-animations/SKILL.md",
    name: "improve-animations",
    topics: ["motion", "performance", "testing"],
    description:
      "Survey a codebase's animation and motion code as a senior motion advisor, then produce prioritized audit and self-contained implementation plans. Read-only on source code - it plans improvements, it does not apply them. Use when the user asks to improve animations, audit motion, make an app feel better, or wants a roadmap of animation fixes rather than a review of a single diff.",
  },
  {
    slug: "animate",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/animate/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md",
    name: "animate",
    topics: ["motion", "interaction", "craft"],
    description:
      "Build an animation from scratch, making the decisions in the order that determines whether it feels right — should it animate at all, what purpose, which tool, which properties, which curve and duration, how it interrupts, how it exits. Writes the implementation. Use when asked to animate something, add motion, make a component feel alive, or build a transition. For critiquing existing motion use review-animations; for auditing a whole codebase use improve-animations.",
  },
  {
    slug: "animate-expo",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/animate-expo/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/animate-expo/SKILL.md",
    name: "animate-expo",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Build animations in React Native and Expo, making the decisions in the order that determines whether they feel right — should it animate, which thread it runs on, which properties, spring or timing, how the gesture hands off, how it degrades. Writes the implementation with Reanimated, Gesture Handler, Expo Router and expo-haptics. Use when animating anything in an Expo app, adding gestures, sheets, screen transitions, press feedback or haptics, or fixing motion that stutters on device. For web animation use animate.",
  },
  {
    slug: "ask-sonner",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/ask-sonner/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/ask-sonner/SKILL.md",
    name: "ask-sonner",
    topics: ["frontend", "interaction", "tooling"],
    description:
      "Guide to Sonner, the React toast library — install and wire up the Toaster, pick the right toast() call, promise and loading toasts, updating, dismissing and persisting toasts, styling, theming and icons, positioning and multiple toasters. Use when working with Sonner or troubleshooting it — toasts that don't appear, appear twice, lose their styles, ignore Tailwind classes, sit behind a modal, or don't follow dark mode.",
  },
  {
    slug: "write-swift",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/write-swift/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/write-swift/SKILL.md",
    name: "write-swift",
    topics: ["frontend", "code-quality", "architecture"],
    description:
      "How to write modern Swift well — modeling with value types, Swift 6 data-race safety and approachable concurrency (@concurrent, main-actor-by-default, actors, task groups), protocols and generics (some vs any), API design, performance and ARC, Swift Testing, macros, and the modern language features agents don't know about yet. Use when writing, reviewing, or migrating Swift, or when a concurrency error, a hang, a data race, a retain cycle, or a performance problem needs fixing.",
  },
  {
    slug: "web-clone",
    user: "Jane-xiaoer",
    repo: "claude-skill-web-clone",
    rawUrl:
      "https://raw.githubusercontent.com/Jane-xiaoer/claude-skill-web-clone/main/SKILL.md",
    githubUrl:
      "https://github.com/Jane-xiaoer/claude-skill-web-clone/blob/main/SKILL.md",
    name: "web-clone",
    topics: ["frontend", "architecture", "tooling"],
    description:
      "网站复刻 / 克隆方法论。Use when the user says to clone, reproduce, or recreate a website or WebGL/Canvas/Three.js effect. Covers source-first reconstruction, repo scaffolding, reverse engineering, implementation paths, and verification for static sites, content sites, and heavy front-end experiences.",
  },
  {
    slug: "generating-sounds-with-ai",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/generating-sounds-with-ai/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/generating-sounds-with-ai/SKILL.md",
    name: "generating-sounds-with-ai",
    topics: ["interaction", "testing", "frontend"],
    description:
      "Audit Web Audio API code for procedural sound synthesis quality, UX decisions, and parameter best practices.",
  },
  {
    slug: "mastering-animate-presence",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/mastering-animate-presence/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/mastering-animate-presence/SKILL.md",
    name: "mastering-animate-presence",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Audit Motion and Framer Motion exit/presence patterns with practical fixes for AnimatePresence usage.",
  },
  {
    slug: "morphing-icons",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/morphing-icons/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/morphing-icons/SKILL.md",
    name: "morphing-icons",
    topics: ["motion", "visual", "frontend"],
    description:
      "Build icon components that morph between SVG shapes with smooth, line-based transformation.",
  },
  {
    slug: "pseudo-elements",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/pseudo-elements/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/pseudo-elements/SKILL.md",
    name: "pseudo-elements",
    topics: ["motion", "visual", "frontend"],
    description:
      "Audit CSS pseudo-elements and View Transitions usage for hover effects, decorative layers, and transitions.",
  },
  {
    slug: "sounds-on-the-web",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/sounds-on-the-web/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/sounds-on-the-web/SKILL.md",
    name: "sounds-on-the-web",
    topics: ["interaction", "accessibility", "frontend"],
    description:
      "Audit interface sound feedback for UX quality, accessibility, and practical implementation patterns.",
  },
  {
    slug: "to-spring-or-not-to-spring",
    user: "raphaelsalaja",
    repo: "skill",
    rawUrl:
      "https://raw.githubusercontent.com/raphaelsalaja/skill/main/skills/to-spring-or-not-to-spring/SKILL.md",
    githubUrl:
      "https://github.com/raphaelsalaja/skill/blob/main/skills/to-spring-or-not-to-spring/SKILL.md",
    name: "to-spring-or-not-to-spring",
    topics: ["motion", "performance", "frontend"],
    description:
      "Audit animation timing choices to decide when springs versus easing curves produce better motion.",
  },
  {
    slug: "frontend-slides",
    user: "zarazhangrui",
    repo: "frontend-slides",
    rawUrl:
      "https://raw.githubusercontent.com/zarazhangrui/frontend-slides/main/SKILL.md",
    githubUrl:
      "https://github.com/zarazhangrui/frontend-slides/blob/main/SKILL.md",
    name: "frontend-slides",
    topics: ["video", "visual", "frontend"],
    description:
      "Create animation-rich HTML presentations from scratch or convert PPT/PPTX files into polished web slides.",
  },
  {
    slug: "slide-wright",
    user: "arifszn",
    repo: "slide-wright",
    rawUrl:
      "https://raw.githubusercontent.com/arifszn/slide-wright/main/SKILL.md",
    githubUrl: "https://github.com/arifszn/slide-wright/blob/main/SKILL.md",
    name: "slide-wright",
    topics: ["video", "visual", "craft"],
    description:
      "Create beautiful, animated web presentations from a topic, rough notes, or an outline. Generates a custom theme and a short two-slide preview, then builds the full deck only once the user confirms the direction. Use when the user wants to make slides, a presentation, a talk deck, or a pitch deck.",
  },
  {
    slug: "shadcn",
    user: "shadcn-ui",
    repo: "ui",
    rawUrl:
      "https://raw.githubusercontent.com/shadcn-ui/ui/main/skills/shadcn/SKILL.md",
    githubUrl:
      "https://github.com/shadcn-ui/ui/blob/main/skills/shadcn/SKILL.md",
    name: "shadcn",
    topics: ["systems", "tooling", "frontend"],
    description:
      "Project-aware shadcn/ui workflow for searching, adding, composing, and fixing components with correct patterns.",
  },
  {
    slug: "brutalist-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/brutalist-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/brutalist-skill/SKILL.md",
    name: "industrial-brutalist-ui",
    topics: ["taste", "visual", "interaction"],
    description:
      "Raw, mechanical interface direction mixing Swiss print structure with terminal-inspired brutalist aesthetics.",
  },
  {
    slug: "gpt-tasteskill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/gpt-tasteskill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/gpt-tasteskill/SKILL.md",
    name: "gpt-taste",
    topics: ["taste", "systems", "frontend"],
    description:
      "High-agency UX/UI skill with strict layout variance, typography, and GSAP motion engineering constraints.",
  },
  {
    slug: "minimalist-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/minimalist-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/minimalist-skill/SKILL.md",
    name: "minimalist-ui",
    topics: ["taste", "visual", "systems"],
    description:
      "Editorial minimal interfaces with monochrome palettes, typographic contrast, and restrained visuals.",
  },
  {
    slug: "output-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/output-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/output-skill/SKILL.md",
    name: "full-output-enforcement",
    topics: ["tooling", "testing", "frontend"],
    description:
      "Enforces complete, non-truncated code output and blocks placeholder or half-finished responses.",
  },
  {
    slug: "redesign-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/redesign-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/redesign-skill/SKILL.md",
    name: "redesign-existing-projects",
    topics: ["craft", "visual", "interaction"],
    description:
      "Audit and upgrade existing interfaces to premium visual quality while preserving product functionality.",
  },
  {
    slug: "soft-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/soft-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/soft-skill/SKILL.md",
    name: "high-end-visual-design",
    topics: ["taste", "craft", "visual"],
    description:
      "High-end visual design guidance for premium typography, spacing, depth, and animation systems.",
  },
  {
    slug: "stitch-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/stitch-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/stitch-skill/SKILL.md",
    name: "stitch-design-taste",
    topics: ["systems", "tooling", "taste"],
    description:
      "Semantic design-system skill for Google Stitch with strict anti-generic UI generation rules.",
  },
  {
    slug: "taste-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md",
    name: "design-taste-frontend",
    topics: ["taste", "visual", "frontend"],
    description:
      "Senior UI/UX frontend skill that enforces anti-slop design decisions, motion quality, and architecture discipline.",
  },
  {
    slug: "adapt",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/adapt.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/adapt.md",
    name: "adapt",
    topics: ["interaction", "systems", "frontend"],
    description:
      "Adapt designs across breakpoints, device contexts, and platform constraints with responsive interaction quality.",
  },
  {
    slug: "animate",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/animate.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/animate.md",
    name: "animate",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Enhance UX with purposeful animation and micro-interactions that support usability and delight.",
  },
  {
    slug: "audit",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/audit.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/audit.md",
    name: "audit",
    topics: ["testing", "accessibility", "performance"],
    description:
      "Run technical UI quality audits across accessibility, performance, theming, responsive behavior, and anti-patterns.",
  },
  {
    slug: "bolder",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/bolder.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/bolder.md",
    name: "bolder",
    topics: ["visual", "interaction", "taste"],
    description:
      "Increase visual impact and personality for interfaces that feel too safe, bland, or generic.",
  },
  {
    slug: "clarify",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/clarify.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/clarify.md",
    name: "clarify",
    topics: ["interaction", "systems", "frontend"],
    description:
      "Improve labels, microcopy, and UX messaging so interface text is clearer and easier to act on.",
  },
  {
    slug: "colorize",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/colorize.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/colorize.md",
    name: "colorize",
    topics: ["color", "visual", "systems"],
    description:
      "Introduce strategic color systems to interfaces that feel dull, monochrome, or visually flat.",
  },
  {
    slug: "critique",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/critique.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/critique.md",
    name: "critique",
    topics: ["testing", "visual", "taste"],
    description:
      "Evaluate design quality with structured UX scoring, persona checks, and actionable remediation guidance.",
  },
  {
    slug: "delight",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/delight.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/delight.md",
    name: "delight",
    topics: ["interaction", "motion", "taste"],
    description:
      "Add personality and memorable moments through thoughtful interaction details and emotional UX touches.",
  },
  {
    slug: "distill",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/distill.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/distill.md",
    name: "distill",
    topics: ["systems", "interaction", "craft"],
    description:
      "Simplify noisy interfaces by removing non-essential complexity and restoring clear visual focus.",
  },
  {
    slug: "harden",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/harden.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/harden.md",
    name: "harden",
    topics: ["testing", "systems", "frontend"],
    description:
      "Make interfaces production-ready with robust empty states, edge cases, errors, onboarding, and i18n resilience.",
  },
  {
    slug: "impeccable",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/SKILL.src.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/SKILL.src.md",
    name: "impeccable",
    topics: ["craft", "visual", "systems"],
    description:
      "Flagship design skill for production-grade, anti-generic frontend interfaces with strong craft and consistency.",
  },
  {
    slug: "layout",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/layout.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/layout.md",
    name: "layout",
    topics: ["craft", "systems", "visual"],
    description:
      "Fix spacing, composition, and hierarchy rhythm when UI layout feels crowded, flat, or misaligned.",
  },
  {
    slug: "optimize",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/optimize.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/optimize.md",
    name: "optimize",
    topics: ["performance", "frontend", "testing"],
    description:
      "Diagnose and improve interface performance across rendering, motion smoothness, assets, and load speed.",
  },
  {
    slug: "overdrive",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/overdrive.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/overdrive.md",
    name: "overdrive",
    topics: ["motion", "visual", "taste"],
    description:
      "Push interfaces into high-impact territory with advanced animation, shaders, and ambitious interaction systems.",
  },
  {
    slug: "polish",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/polish.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/polish.md",
    name: "polish",
    topics: ["craft", "visual", "systems"],
    description:
      "Final quality pass for spacing, alignment, and consistency to prepare UI for launch.",
  },
  {
    slug: "quieter",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/quieter.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/quieter.md",
    name: "quieter",
    topics: ["visual", "systems", "craft"],
    description:
      "Tone down overly intense designs while keeping quality high and preserving hierarchy.",
  },
  {
    slug: "shape",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/shape.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/shape.md",
    name: "shape",
    topics: ["interaction", "systems", "architecture"],
    description:
      "Plan feature UX before coding via a structured design interview that produces an actionable design brief.",
  },
  {
    slug: "typeset",
    user: "pbakaus",
    repo: "impeccable",
    rawUrl:
      "https://raw.githubusercontent.com/pbakaus/impeccable/main/skill/reference/typeset.md",
    githubUrl:
      "https://github.com/pbakaus/impeccable/blob/main/skill/reference/typeset.md",
    name: "typeset",
    topics: ["typography", "craft", "visual"],
    description:
      "Improve typography systems, hierarchy, readability, and text cadence for more intentional interfaces.",
  },
  {
    slug: "transitions-dev",
    user: "Jakubantalik",
    repo: "transitions-dev",
    rawUrl:
      "https://raw.githubusercontent.com/Jakubantalik/transitions-dev/main/skills/transitions-dev/SKILL.md",
    githubUrl:
      "https://github.com/Jakubantalik/transitions-dev/blob/main/skills/transitions-dev/SKILL.md",
    name: "transitions-dev",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Production-ready CSS transition patterns for web apps, with drop-in snippets for cards, modals, dropdowns, panels, and page transitions.",
  },
  {
    slug: "daisyui",
    user: "saadeghi",
    repo: "daisyui",
    rawUrl:
      "https://raw.githubusercontent.com/saadeghi/daisyui/master/skills/daisyui/SKILL.md",
    githubUrl:
      "https://github.com/saadeghi/daisyui/blob/master/skills/daisyui/SKILL.md",
    name: "daisyui",
    topics: ["visual", "tooling", "frontend"],
    description:
      "Official daisyUI component library skill, providing docs, class names, examples and code examples to generate better daisyUI code.",
  },
  {
    slug: "compact-landing",
    user: "Danilaa1",
    repo: "compact-landing-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Danilaa1/compact-landing-skill/main/skills/compact-landing/SKILL.md",
    githubUrl:
      "https://github.com/Danilaa1/compact-landing-skill/blob/main/skills/compact-landing/SKILL.md",
    name: "compact-landing",
    topics: ["visual", "craft", "typography", "frontend"],
    description:
      "Build compact premium landing pages with clear CTA hierarchy, quiet typography, and minimal visual noise.",
  },
  {
    slug: "text-to-lottie",
    user: "diffusionstudio",
    repo: "lottie",
    rawUrl:
      "https://raw.githubusercontent.com/diffusionstudio/lottie/main/skills/text-to-lottie/SKILL.md",
    githubUrl:
      "https://github.com/diffusionstudio/lottie/blob/main/skills/text-to-lottie/SKILL.md",
    name: "text-to-lottie",
    topics: ["motion", "visual", "frontend"],
    description:
      "Turn text prompts into polished Lottie animations for motion-heavy UI work.",
  },
  {
    slug: "brag",
    user: "latent-spaces",
    repo: "brag",
    rawUrl:
      "https://raw.githubusercontent.com/latent-spaces/brag/main/skills/brag/SKILL.md",
    githubUrl:
      "https://github.com/latent-spaces/brag/blob/main/skills/brag/SKILL.md",
    name: "brag",
    topics: ["video", "motion", "frontend"],
    description:
      "Turn a finished project into a short shareable launch video with motion, music, and copy.",
  },
  {
    slug: "build-primitive",
    user: "PrototyperAI",
    repo: "prototyper-ui",
    rawUrl:
      "https://raw.githubusercontent.com/PrototyperAI/prototyper-ui/main/apps/docs/skill/build-primitive/SKILL.md",
    githubUrl:
      "https://github.com/PrototyperAI/prototyper-ui/blob/main/apps/docs/skill/build-primitive/SKILL.md",
    name: "build-primitive",
    topics: ["accessibility", "interaction", "systems", "testing", "frontend"],
    description:
      "Build foundational UI primitives from scratch with strong ARIA, keyboard, focus, and state handling.",
  },
  {
    slug: "animation-vocabulary",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/animation-vocabulary/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/animation-vocabulary/SKILL.md",
    name: "animation-vocabulary",
    topics: ["motion", "visual", "craft"],
    description:
      "Sharpen motion language so animation choices feel deliberate and consistent.",
  },
  {
    slug: "review-animations",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/review-animations/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/review-animations/SKILL.md",
    name: "review-animations",
    topics: ["motion", "performance", "testing", "interaction"],
    description:
      "Review animation quality, timing, and motion consistency with a production-critical eye.",
  },
  {
    slug: "refine-live",
    user: "Jakubantalik",
    repo: "transitions.dev",
    rawUrl:
      "https://raw.githubusercontent.com/Jakubantalik/transitions.dev/main/refine/.agents/skills/refine-live/SKILL.md",
    githubUrl:
      "https://github.com/Jakubantalik/transitions.dev/blob/main/refine/.agents/skills/refine-live/SKILL.md",
    name: "refine-live",
    topics: ["motion", "visual", "interaction", "frontend"],
    description:
      "Iteratively refine UI in live sessions with a focus on motion, polish, and interaction detail.",
  },
  {
    slug: "engineering",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/README.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/README.md",
    name: "engineering",
    topics: ["architecture", "testing", "tooling", "debugging"],
    description:
      "Routing bundle for code work covering planning, debugging, TDD, architecture, and execution flows.",
  },
  {
    slug: "ask-matt",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/ask-matt/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/ask-matt/SKILL.md",
    name: "ask-matt",
    topics: ["tooling", "architecture", "frontend"],
    description:
      "Router that picks the right Matt Pocock engineering flow for the current task.",
  },
  {
    slug: "grill-with-docs",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/grill-with-docs/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md",
    name: "grill-with-docs",
    topics: ["architecture", "systems", "tooling"],
    description:
      "Sharpens the domain model and updates supporting docs while grilling through design choices.",
  },
  {
    slug: "triage",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/triage/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/triage/SKILL.md",
    name: "triage",
    topics: ["tooling", "testing", "architecture"],
    description: "Moves issues through a structured triage state machine.",
  },
  {
    slug: "improve-codebase-architecture",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/improve-codebase-architecture/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md",
    name: "improve-codebase-architecture",
    topics: ["architecture", "systems", "testing"],
    description:
      "Scans a codebase for deepening opportunities and turns them into a prioritized visual report.",
  },
  {
    slug: "setup-matt-pocock-skills",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/setup-matt-pocock-skills/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/setup-matt-pocock-skills/SKILL.md",
    name: "setup-matt-pocock-skills",
    topics: ["tooling", "architecture"],
    description:
      "One-time repo setup for the engineering skill workflow and related conventions.",
  },
  {
    slug: "to-issues",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/to-tickets/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md",
    name: "to-issues",
    topics: ["architecture", "tooling", "testing"],
    description: "Breaks a plan or PRD into independently actionable issues.",
  },
  {
    slug: "to-prd",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/to-spec/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/to-spec/SKILL.md",
    name: "to-prd",
    topics: ["architecture", "tooling", "frontend"],
    description:
      "Turns a conversation into a PRD and publishes it to the issue tracker.",
  },
  {
    slug: "prototype",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/prototype/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/prototype/SKILL.md",
    name: "prototype",
    topics: ["frontend", "interaction", "systems"],
    description:
      "Builds throwaway prototypes to answer design or logic questions quickly.",
  },
  {
    slug: "diagnosing-bugs",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/diagnosing-bugs/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/diagnosing-bugs/SKILL.md",
    name: "diagnosing-bugs",
    topics: ["debugging", "testing", "frontend"],
    description:
      "Systematic bug diagnosis through reproduce, minimize, hypothesize, instrument, and fix.",
  },
  {
    slug: "tdd",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/tdd/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/tdd/SKILL.md",
    name: "tdd",
    topics: ["testing", "tooling", "frontend"],
    description:
      "Red-green-refactor workflow for building features and fixes one slice at a time.",
  },
  {
    slug: "domain-modeling",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/domain-modeling/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md",
    name: "domain-modeling",
    topics: ["architecture", "systems", "frontend"],
    description: "Builds and sharpens project domain models and terminology.",
  },
  {
    slug: "codebase-design",
    user: "mattpocock",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/mattpocock/skills/main/skills/engineering/codebase-design/SKILL.md",
    githubUrl:
      "https://github.com/mattpocock/skills/blob/main/skills/engineering/codebase-design/SKILL.md",
    name: "codebase-design",
    topics: ["architecture", "systems", "testing"],
    description:
      "Guidance for designing deep modules with small interfaces and clean seams.",
  },
  {
    slug: "improve",
    user: "shadcn",
    repo: "improve",
    rawUrl:
      "https://raw.githubusercontent.com/shadcn/improve/main/skills/improve/SKILL.md",
    githubUrl:
      "https://github.com/shadcn/improve/blob/main/skills/improve/SKILL.md",
    name: "improve",
    topics: ["code-quality", "architecture", "testing"],
    description:
      "Survey any codebase as a senior advisor and produce prioritized, self-contained implementation plans for OTHER models/agents to execute. Strictly read-only on source code — never implements, fixes, or refactors anything itself. Use when asked to audit a codebase, find improvement opportunities (bugs, security, performance, test coverage, tech debt, migrations, DX), suggest features or take the project next, or generate handoff plans for another agent to implement.",
  },
  {
    slug: "thermo-nuclear-code-quality-review",
    user: "cursor",
    repo: "plugins",
    rawUrl:
      "https://raw.githubusercontent.com/cursor/plugins/main/thermos/skills/thermo-nuclear-code-quality-review/SKILL.md",
    githubUrl: "",
    name: "thermo-nuclear-code-quality-review",
    topics: ["code-quality", "architecture", "testing"],
    description:
      "Run an extremely strict maintainability review for abstraction quality, giant files, and spaghetti-condition growth.",
  },
  {
    slug: "effect",
    user: "kitlangton",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/kitlangton/skills/main/skills/effect/SKILL.md",
    githubUrl:
      "https://github.com/kitlangton/skills/blob/main/skills/effect/SKILL.md",
    name: "effect",
    topics: ["architecture", "tooling", "testing"],
    description:
      "Opinionated guidance for building production TypeScript applications with Effect v4, including workflows, services, layers, schemas, configuration, scheduling, caching, streams, HTTP clients, and tests.",
  },
  {
    slug: "gsap-core",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-core/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-core/SKILL.md",
    name: "gsap-core",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Official GSAP core API guidance for gsap.to(), from(), easing, stagger, matchMedia, and responsive or reduced-motion animation patterns.",
  },
  {
    slug: "gsap-frameworks",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-frameworks/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-frameworks/SKILL.md",
    name: "gsap-frameworks",
    topics: ["motion", "frameworks", "frontend"],
    description:
      "Official GSAP guidance for Vue, Nuxt, Svelte, and SvelteKit lifecycle setup, scoped selectors, and cleanup on unmount.",
  },
  {
    slug: "gsap-performance",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-performance/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-performance/SKILL.md",
    name: "gsap-performance",
    topics: ["motion", "performance", "frontend"],
    description:
      "Official GSAP performance guidance for compositor-friendly transforms, quickTo, stagger batching, and smooth 60fps animation.",
  },
  {
    slug: "gsap-plugins",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-plugins/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-plugins/SKILL.md",
    name: "gsap-plugins",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Official GSAP plugin guidance for Flip, Draggable, ScrollSmoother, SplitText, SVG tools, CustomEase, and gsap.registerPlugin() usage.",
  },
  {
    slug: "gsap-react",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-react/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-react/SKILL.md",
    name: "gsap-react",
    topics: ["motion", "frameworks", "frontend"],
    description:
      "Official GSAP guidance for React and Next.js with useGSAP, refs, gsap.context(), contextSafe callbacks, and SSR-safe cleanup.",
  },
  {
    slug: "gsap-scrolltrigger",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-scrolltrigger/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md",
    name: "gsap-scrolltrigger",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Official ScrollTrigger guidance for scroll-linked animation, pinning, scrub, batch triggers, and horizontal containerAnimation patterns.",
  },
  {
    slug: "gsap-timeline",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-timeline/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-timeline/SKILL.md",
    name: "gsap-timeline",
    topics: ["motion", "craft", "frontend"],
    description:
      "Official GSAP timeline guidance for sequencing, position parameters, labels, nesting, and playback control with gsap.timeline().",
  },
  {
    slug: "gsap-utils",
    user: "greensock",
    repo: "gsap-skills",
    rawUrl:
      "https://raw.githubusercontent.com/greensock/gsap-skills/main/skills/gsap-utils/SKILL.md",
    githubUrl:
      "https://github.com/greensock/gsap-skills/blob/main/skills/gsap-utils/SKILL.md",
    name: "gsap-utils",
    topics: ["motion", "frontend", "tooling"],
    description:
      "Official gsap.utils guidance for clamp, mapRange, snap, distribute, selector scoping, and other animation math helpers.",
  },
  {
    slug: "gsap-web",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/gsap-web/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/gsap-web/SKILL.md",
    name: "gsap-web",
    topics: ["motion", "interaction", "frontend"],
    description:
      "GSAP guidance for code-driven web motion, including timelines, ScrollTrigger, SplitText, Flip, and smooth-scroll synchronization.",
  },
  {
    slug: "60fps-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/60fps-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/60fps-animation/SKILL.md",
    name: "60fps-animation",
    topics: ["motion", "performance", "frontend"],
    description:
      "Web animation performance guidance for avoiding layout thrashing and reaching smooth 60/120fps motion with compositor-friendly techniques.",
  },
  {
    slug: "accessible-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/accessible-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/accessible-animation/SKILL.md",
    name: "accessible-animation",
    topics: ["accessibility", "motion", "frontend"],
    description:
      "Tiered reduced-motion patterns for CSS, GSAP, Framer Motion, Lenis, and other web animation systems.",
  },
  {
    slug: "micro-interaction",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/micro-interaction/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/micro-interaction/SKILL.md",
    name: "micro-interaction",
    topics: ["interaction", "motion", "frontend"],
    description:
      "UI motion guidance for hover and press feedback, toggles, toasts, drawers, modals, list transitions, and shared-element interactions.",
  },
  {
    slug: "page-transition-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/page-transition-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/page-transition-animation/SKILL.md",
    name: "page-transition-animation",
    topics: ["motion", "interaction", "frontend"],
    description:
      "Page and route transition patterns using the View Transitions API and Framer Motion, including reliable Next.js App Router exits.",
  },
  {
    slug: "svg-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/svg-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/svg-animation/SKILL.md",
    name: "svg-animation",
    topics: ["motion", "visual", "frontend"],
    description:
      "SVG animation techniques for stroke draw-on effects, path morphing, motion paths, animated icons, gradients, and filters.",
  },
  {
    slug: "lottie-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/lottie-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/lottie-animation/SKILL.md",
    name: "lottie-animation",
    topics: ["motion", "frontend", "tooling"],
    description:
      "Lottie and dotLottie integration guidance for playback control, interactivity, runtime theming, and cross-platform export workflows.",
  },
  {
    slug: "gc-minimal-zine-poster-v0-1",
    user: "LiamGvchi",
    repo: "gc-minimal-zine-poster",
    rawUrl:
      "https://raw.githubusercontent.com/LiamGvchi/gc-minimal-zine-poster/main/SKILL.md",
    githubUrl:
      "https://github.com/LiamGvchi/gc-minimal-zine-poster/blob/main/SKILL.md",
    name: "gc-minimal-zine-poster-v0-1",
    topics: ["visual", "typography", "color"],
    description:
      "Generate quiet minimal zine-style editorial poster prompts and matching raster images from themes, moods, objects, photos, or content briefs.",
  },
  {
    slug: "signal-geometry",
    user: "CaliCastle",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/CaliCastle/skills/main/skills/signal-geometry/SKILL.md",
    githubUrl:
      "https://github.com/CaliCastle/skills/blob/main/skills/signal-geometry/SKILL.md",
    name: "signal-geometry",
    topics: ["visual", "craft"],
    description:
      "Create sparse geometric illustrations and posters from concepts or briefs, using precise spatial systems, restrained contrast, and matte paper texture.",
  },
  {
    slug: "linear-methodology",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-methodology/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-methodology/SKILL.md",
    name: "linear-methodology",
    topics: ["tooling", "architecture"],
    description:
      "Route Linear tracking work through a methodology for setting up, syncing, monitoring, and maintaining honest project data.",
  },
  {
    slug: "linear-setup",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-setup/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-setup/SKILL.md",
    name: "linear-setup",
    topics: ["tooling", "architecture", "systems"],
    description:
      "Bootstrap or extend Linear project tracking with evidence-based backfill, milestones, dependencies, and repository discipline.",
  },
  {
    slug: "linear-sync",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-sync/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-sync/SKILL.md",
    name: "linear-sync",
    topics: ["tooling", "architecture", "debugging"],
    description:
      "Audit and rescue an existing Linear project by reconciling its issues, milestones, dependencies, and tracking protocol with repository reality.",
  },
  {
    slug: "linear-monitor",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-monitor/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-monitor/SKILL.md",
    name: "linear-monitor",
    topics: ["tooling", "testing", "architecture"],
    description:
      "Health-check Linear projects for slipping dates, stale in-progress work, orphan issues, and tracking anti-patterns.",
  },
  {
    slug: "linear-discipline",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-discipline/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-discipline/SKILL.md",
    name: "linear-discipline",
    topics: ["tooling", "code-quality"],
    description:
      "Keep Linear tracking honest during development with search-before-create, lifecycle updates, and close-the-loop discipline.",
  },
  {
    slug: "linear-finish-install",
    user: "tjcages",
    repo: "linear",
    rawUrl:
      "https://raw.githubusercontent.com/tjcages/linear/main/skills/linear-finish-install/SKILL.md",
    githubUrl:
      "https://github.com/tjcages/linear/blob/main/skills/linear-finish-install/SKILL.md",
    name: "linear-finish-install",
    topics: ["tooling", "architecture"],
    description:
      "Complete Linear tracking installation by writing always-on rules and verifying Linear MCP authentication.",
  },
  {
    slug: "landing-page-design",
    user: "elayadesign",
    repo: "ai-design-skills",
    rawUrl:
      "https://raw.githubusercontent.com/elayadesign/ai-design-skills/main/skills/landing-page-design/SKILL.md",
    githubUrl:
      "https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md",
    name: "landing-page-design",
    topics: ["visual", "frontend", "craft", "interaction"],
    description:
      "Build high-converting landing pages with intake questions, page structure, conversion copy, SEO, and a disciplined visual system.",
  },
  {
    slug: "find-animation-opportunities",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/find-animation-opportunities/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/find-animation-opportunities/SKILL.md",
    name: "find-animation-opportunities",
    topics: ["motion", "interaction", "craft"],
    description:
      "Find high-conviction opportunities for useful interface motion while rejecting animation that adds noise or slows users down.",
  },
  {
    slug: "pick-ui-library",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/pick-ui-library/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/pick-ui-library/SKILL.md",
    name: "pick-ui-library",
    topics: ["tooling", "frontend", "architecture"],
    description:
      "Choose an opinionated, trusted library for common frontend tasks including components, motion, charts, interaction, state, and styling.",
  },
  {
    slug: "prototype",
    user: "emilkowalski",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/emilkowalski/skills/main/skills/prototype/SKILL.md",
    githubUrl:
      "https://github.com/emilkowalski/skills/blob/main/skills/prototype/SKILL.md",
    name: "prototype",
    topics: ["frontend", "interaction", "visual", "systems"],
    description:
      "Build multiple genuinely different UI variants behind a visual picker so the strongest direction can be evaluated and promoted.",
  },
  {
    slug: "better-interface",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-interface/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-interface/SKILL.md",
    name: "better-interface",
    topics: ["visual", "accessibility", "systems", "craft"],
    description:
      "Run a holistic interface review across accessibility, layout, writing, typography, color, and visual polish.",
  },
  {
    slug: "better-accessibility",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-accessibility/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-accessibility/SKILL.md",
    name: "better-accessibility",
    topics: ["accessibility", "interaction", "testing"],
    description:
      "Review and improve focus states, keyboard support, ARIA, forms, screen readers, hit areas, and motion accessibility.",
  },
  {
    slug: "better-layout",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-layout/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-layout/SKILL.md",
    name: "better-layout",
    topics: ["systems", "visual", "frontend", "architecture"],
    description:
      "Improve interface structure through grouping, alignment, reading order, progressive disclosure, and adaptive responsive layouts.",
  },
  {
    slug: "better-writing",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/better-writing/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/better-writing/SKILL.md",
    name: "better-writing",
    topics: ["frontend", "accessibility", "craft"],
    description:
      "Improve UX writing for interface labels, errors, empty states, settings, notifications, and product voice consistency.",
  },
  {
    slug: "explain-interface",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/explain-interface/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/explain-interface/SKILL.md",
    name: "explain-interface",
    topics: ["craft", "frontend", "visual", "architecture"],
    description:
      "Answers how was this built about an interface. Give it a URL and name the thing you're curious about, and it reads the layers that produce the effect. Reads the whole frontend instead when you don't name a thing. From a screenshot it reconstructs rather than reads and says so.",
  },
  {
    slug: "interface-review",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/interface-review/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/interface-review/SKILL.md",
    name: "interface-review",
    topics: ["craft", "visual", "testing", "code-quality"],
    description:
      "Interface review of a change rather than a screen: uncommitted work, the current branch, or a pull request. Covers interface quality, not correctness, tests, or security.",
  },
  {
    slug: "variant",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/variant/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/variant/SKILL.md",
    name: "variant",
    topics: ["visual", "interaction", "craft", "frontend"],
    description:
      "Answers which of these rather than is this right. Builds several genuinely different versions of one piece of UI behind a picker in the real page, so you can flip between them and promote the one that wins.",
  },
  {
    slug: "gh-stack",
    user: "github",
    repo: "gh-stack",
    rawUrl:
      "https://raw.githubusercontent.com/github/gh-stack/main/skills/gh-stack/SKILL.md",
    githubUrl:
      "https://github.com/github/gh-stack/blob/main/skills/gh-stack/SKILL.md",
    name: "gh-stack",
    topics: ["tooling", "architecture", "code-quality"],
    description:
      "Manage stacked branches and dependent pull requests with the gh stack GitHub CLI extension.",
  },
  {
    slug: "simple-english",
    user: "AminBlg",
    repo: "SimpleEnglish",
    rawUrl:
      "https://raw.githubusercontent.com/AminBlg/SimpleEnglish/main/skills/simple-english/SKILL.md",
    githubUrl:
      "https://github.com/AminBlg/SimpleEnglish/blob/main/skills/simple-english/SKILL.md",
    name: "simple-english",
    topics: ["tooling", "code-quality", "craft"],
    description:
      "Write or rewrite technical text with ASD-STE100 Simplified Technical English for clear, unambiguous, translation-friendly documentation and interface copy.",
  },
  {
    slug: "figma-use",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-use/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-use/SKILL.md",
    name: "figma-use",
    topics: ["systems", "tooling", "frontend"],
    description:
      "Mandatory prerequisite before every use_figma call — plugin API rules for creating, editing, and inspecting Figma files through MCP.",
  },
  {
    slug: "figma-generate-design",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-generate-design/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-design/SKILL.md",
    name: "figma-generate-design",
    topics: ["systems", "visual", "frontend"],
    description:
      "Translate pages and multi-section layouts into Figma by discovering design system components, variables, and assembling screens section by section.",
  },
  {
    slug: "figma-generate-library",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-generate-library/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-library/SKILL.md",
    name: "figma-generate-library",
    topics: ["systems", "craft", "frontend"],
    description:
      "Build or update a professional design system in Figma from a codebase, including tokens, variant sets, theming, and component libraries.",
  },
  {
    slug: "audit-design-system",
    user: "edenspiekermann",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/edenspiekermann/Skills/main/skills/audit-design-system/SKILL.md",
    githubUrl:
      "https://github.com/edenspiekermann/Skills/blob/main/skills/audit-design-system/SKILL.md",
    name: "audit-design-system",
    topics: ["systems", "craft", "frontend"],
    description:
      "Audit a Figma screen or component for design-system drift, including missing shared components, local overrides, and unbound tokens.",
  },
  {
    slug: "apply-design-system",
    user: "edenspiekermann",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/edenspiekermann/Skills/main/skills/apply-design-system/SKILL.md",
    githubUrl:
      "https://github.com/edenspiekermann/Skills/blob/main/skills/apply-design-system/SKILL.md",
    name: "apply-design-system",
    topics: ["systems", "craft", "frontend"],
    description:
      "Reconnect an existing Figma design to published design system components instead of detached layers, local wrappers, or one-off assets.",
  },
  {
    slug: "create-voice",
    user: "redongreen",
    repo: "uSpec",
    rawUrl:
      "https://raw.githubusercontent.com/redongreen/uSpec/main/skills/create-voice/SKILL.md",
    githubUrl:
      "https://github.com/redongreen/uSpec/blob/main/skills/create-voice/SKILL.md",
    name: "create-voice",
    topics: ["accessibility", "systems", "frontend"],
    description:
      "Generate VoiceOver, TalkBack, and ARIA screen reader specs in Figma with focus order, property tables, and announcements by component state.",
  },
  {
    slug: "create-anatomy",
    user: "redongreen",
    repo: "uSpec",
    rawUrl:
      "https://raw.githubusercontent.com/redongreen/uSpec/main/skills/create-anatomy/SKILL.md",
    githubUrl:
      "https://github.com/redongreen/uSpec/blob/main/skills/create-anatomy/SKILL.md",
    name: "create-anatomy",
    topics: ["systems", "frontend", "accessibility"],
    description:
      "Generate a visual anatomy annotation in Figma showing numbered markers on a component instance with an attribute table. Use when the user mentions anatomy, anatomy annotation, component anatomy, create anatomy, or wants to annotate a component's structural elements.",
  },
  {
    slug: "balise-ux-writing",
    user: "mrstev3n",
    repo: "balise-skills",
    rawUrl:
      "https://raw.githubusercontent.com/mrstev3n/balise-skills/main/skills/balise-ux-writing/SKILL.md",
    githubUrl:
      "https://github.com/mrstev3n/balise-skills/blob/main/skills/balise-ux-writing/SKILL.md",
    name: "balise-ux-writing",
    topics: ["craft", "frontend", "accessibility"],
    description:
      "Reviews, rewrites, creates, harmonizes, and implements user-centered interface copy across design files, screenshots, product specifications, source code, localization catalogs, prototypes, and rendered applications. Use for buttons, navigation, forms, errors, empty states, onboarding, confirmations, settings, consent, notifications, help, and system feedback while preserving product behavior, terminology, voice, accessibility, localization, legal meaning, component structure, and implementation constraints.",
  },
  {
    slug: "rad-spacing",
    user: "nolanperk",
    repo: "rad-spacing",
    rawUrl:
      "https://raw.githubusercontent.com/nolanperk/rad-spacing/main/rad-spacing.md",
    githubUrl:
      "https://github.com/nolanperk/rad-spacing/blob/main/rad-spacing.md",
    name: "rad-spacing",
    topics: ["systems", "craft", "visual"],
    description:
      "Apply hierarchical spacing variables across Figma layouts using proximity-based 4px and 8px increments from the file's library.",
  },
  {
    slug: "sync-figma-token",
    user: "firebenders",
    repo: "sync-figma-token-skill",
    rawUrl:
      "https://raw.githubusercontent.com/firebenders/sync-figma-token-skill/main/skills/sync-figma-token/SKILL.md",
    githubUrl:
      "https://github.com/firebenders/sync-figma-token-skill/blob/main/skills/sync-figma-token/SKILL.md",
    name: "sync-figma-token",
    topics: ["systems", "color", "frontend"],
    description:
      "Sync design tokens between code and Figma variables with drift reporting, approval gates, safe delta apply, and persisted reports.",
  },
  {
    slug: "cc-figma-component",
    user: "nvillapiano",
    repo: "component-contracts-figma",
    rawUrl:
      "https://raw.githubusercontent.com/nvillapiano/component-contracts-figma/main/skills/cc-figma-component/SKILL.md",
    githubUrl:
      "https://github.com/nvillapiano/component-contracts-figma/blob/main/skills/cc-figma-component/SKILL.md",
    name: "cc-figma-component",
    topics: ["systems", "frontend", "architecture"],
    description:
      "Generate variable-bound Figma component sets from component-contract definitions after the token collections exist.",
  },
  {
    slug: "cc-figma-tokens",
    user: "nvillapiano",
    repo: "component-contracts-figma",
    rawUrl:
      "https://raw.githubusercontent.com/nvillapiano/component-contracts-figma/main/skills/cc-figma-tokens/SKILL.md",
    githubUrl:
      "https://github.com/nvillapiano/component-contracts-figma/blob/main/skills/cc-figma-tokens/SKILL.md",
    name: "cc-figma-tokens",
    topics: ["systems", "color", "frontend"],
    description:
      "Build or update Figma Primitive and Semantic variable collections from component-contracts token files.",
  },
  {
    slug: "human-review",
    user: "petergyang",
    repo: "human-review",
    rawUrl:
      "https://raw.githubusercontent.com/petergyang/human-review/main/src/SKILL.md",
    githubUrl:
      "https://github.com/petergyang/human-review/blob/main/src/SKILL.md",
    name: "human-review",
    topics: ["tooling", "craft", "frontend"],
    description:
      "Open HTML, Markdown, or localhost pages in the browser so the user can edit text directly, leave anchored comments, and send all feedback back in one batch.",
  },
  {
    slug: "stop-slop",
    user: "hardikpandya",
    repo: "stop-slop",
    rawUrl:
      "https://raw.githubusercontent.com/hardikpandya/stop-slop/main/SKILL.md",
    githubUrl:
      "https://github.com/hardikpandya/stop-slop/blob/main/SKILL.md",
    name: "stop-slop",
    topics: ["craft", "taste", "tooling"],
    description:
      "Remove AI writing patterns from prose when drafting, editing, or reviewing text to eliminate predictable AI tells.",
  },
  {
    slug: "no-ai-slop",
    user: "petergyang",
    repo: "no-ai-slop",
    rawUrl:
      "https://raw.githubusercontent.com/petergyang/no-ai-slop/main/skills/no-ai-slop/SKILL.md",
    githubUrl:
      "https://github.com/petergyang/no-ai-slop/blob/main/skills/no-ai-slop/SKILL.md",
    name: "no-ai-slop",
    topics: ["craft", "taste", "tooling"],
    description:
      "Edit drafts into sharper, more human writing while preserving personal voice, or detect AI-slop patterns without rewriting.",
  },
  {
    slug: "humanizer",
    user: "blader",
    repo: "humanizer",
    rawUrl:
      "https://raw.githubusercontent.com/blader/humanizer/main/SKILL.md",
    githubUrl:
      "https://github.com/blader/humanizer/blob/main/SKILL.md",
    name: "humanizer",
    topics: ["craft", "taste", "tooling"],
    description:
      "Rewrite AI-sounding text so it reads naturally without changing meaning, based on Wikipedia's signs of AI writing.",
  },
  {
    slug: "unslop",
    user: "cursor",
    repo: "plugins",
    rawUrl:
      "https://raw.githubusercontent.com/cursor/plugins/main/pstack/skills/unslop/SKILL.md",
    githubUrl:
      "https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md",
    name: "unslop",
    topics: ["craft", "taste", "tooling"],
    description:
      "Cut AI tells from any writing by editing text to remove machine patterns and restore a more human voice.",
  },
  {
    slug: "slopbeth",
    user: "ehmo",
    repo: "slopkit",
    rawUrl:
      "https://raw.githubusercontent.com/ehmo/slopkit/main/plugins/slopbeth/skills/slopbeth/SKILL.md",
    githubUrl:
      "https://github.com/ehmo/slopkit/blob/main/plugins/slopbeth/skills/slopbeth/SKILL.md",
    name: "slopbeth",
    topics: ["craft", "taste", "tooling"],
    description:
      "Remove AI-writing tells from prose while preserving meaning, voice, and density during drafting, editing, or review.",
  },
  {
    slug: "humanizer",
    user: "Aboudjem",
    repo: "humanizer-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Aboudjem/humanizer-skill/main/skills/humanizer/SKILL.md",
    githubUrl:
      "https://github.com/Aboudjem/humanizer-skill/blob/main/skills/humanizer/SKILL.md",
    name: "humanizer",
    topics: ["craft", "taste", "tooling"],
    description:
      "Detect 53 AI writing patterns and rewrite text in five voice profiles, with optional scoring and in-place Markdown editing.",
  },
  {
    slug: "deslop",
    user: "stephenturner",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/stephenturner/skills/main/deslop/SKILL.md",
    githubUrl:
      "https://github.com/stephenturner/skills/blob/main/deslop/SKILL.md",
    name: "deslop",
    topics: ["craft", "taste", "tooling"],
    description:
      "Remove AI writing patterns from prose so drafts, edits, and reviews sound like a specific human wrote them.",
  },
  {
    slug: "anti-slop",
    user: "elithrar",
    repo: "dotfiles",
    rawUrl:
      "https://raw.githubusercontent.com/elithrar/dotfiles/main/.agents/skills/anti-slop/SKILL.md",
    githubUrl:
      "https://github.com/elithrar/dotfiles/blob/main/.agents/skills/anti-slop/SKILL.md",
    name: "anti-slop",
    topics: ["craft", "taste", "tooling"],
    description:
      "Detect and remove AI writing tells from prose while preserving the author's voice in blogs, docs, emails, and reports.",
  },
  {
    slug: "humanize",
    user: "aashaexo",
    repo: "soundshuman",
    rawUrl:
      "https://raw.githubusercontent.com/aashaexo/soundshuman/main/SKILL.md",
    githubUrl:
      "https://github.com/aashaexo/soundshuman/blob/main/SKILL.md",
    name: "humanize",
    topics: ["craft", "taste", "tooling"],
    description:
      "Remove signs of AI-generated writing from prose and audit docs folders for slop across content, language, style, and rhetoric.",
  },
  {
    slug: "anti-ai-slop-writing",
    user: "jalaalrd",
    repo: "anti-ai-slop-writing",
    rawUrl:
      "https://raw.githubusercontent.com/jalaalrd/anti-ai-slop-writing/main/skills/anti-ai-slop-writing/SKILL.md",
    githubUrl:
      "https://github.com/jalaalrd/anti-ai-slop-writing/blob/main/skills/anti-ai-slop-writing/SKILL.md",
    name: "anti-ai-slop-writing",
    topics: ["craft", "taste", "tooling"],
    description:
      "Produce human-sounding text that avoids detectable AI patterns with banned vocabulary, structural variety, and voice calibration.",
  },
  {
    slug: "unlazy",
    user: "Leonxlnx",
    repo: "unlazy",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/unlazy/main/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/unlazy/blob/main/SKILL.md",
    name: "unlazy",
    topics: ["tooling", "code-quality", "craft"],
    description:
      "Anti-laziness execution discipline that finishes substantial tasks through gate files and runnable checks instead of premature done reports.",
  },
  {
    slug: "bro",
    user: "luchasarie",
    repo: "bro-skill",
    rawUrl:
      "https://raw.githubusercontent.com/luchasarie/bro-skill/main/SKILL.md",
    githubUrl:
      "https://github.com/luchasarie/bro-skill/blob/main/SKILL.md",
    name: "bro",
    topics: ["craft", "interaction", "tooling"],
    description:
      "Re-explain the previous assistant message in a much simpler, plain-language version when the last answer was too dense.",
  },
  {
    slug: "smooth-shadow-ring",
    user: "flornkm",
    repo: "shadow-plugin",
    rawUrl:
      "https://raw.githubusercontent.com/flornkm/shadow-plugin/main/.claude/skills/smooth-shadow-ring/SKILL.md",
    githubUrl:
      "https://github.com/flornkm/shadow-plugin/blob/main/.claude/skills/smooth-shadow-ring/SKILL.md",
    name: "smooth-shadow-ring",
    topics: ["visual", "craft", "systems", "frontend"],
    description:
      "Style elevated surfaces with smooth shadow ring utilities instead of combining borders or rings with shadows and creating double edges.",
  },
  {
    slug: "prefer-container-queries",
    user: "flornkm",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/flornkm/skills/main/skills/prefer-container-queries/SKILL.md",
    githubUrl:
      "https://github.com/flornkm/skills/blob/main/skills/prefer-container-queries/SKILL.md",
    name: "prefer-container-queries",
    topics: ["frontend", "systems", "visual"],
    description:
      "Enforce Tailwind container queries over viewport breakpoints for responsive components. Use when writing or reviewing responsive Tailwind code, when a component needs to adapt to its available space (cards, sidebars, lists, panels, anything reused in different layouts), or when migrating sm:/md:/lg: classes to @container variants.",
  },
  {
    slug: "webgl-components",
    user: "flornkm",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/flornkm/skills/main/skills/webgl-components/SKILL.md",
    githubUrl:
      "https://github.com/flornkm/skills/blob/main/skills/webgl-components/SKILL.md",
    name: "webgl-components",
    topics: ["3d", "performance", "frontend", "visual"],
    description:
      "Build small, always-on WebGL visuals (identity avatars, ambient orbs, glass and iridescent surfaces, animated textures) that ship inside a normal web app UI without wrecking performance, accessibility, SSR, or layout. Use whenever a shader-, GLSL-, or canvas-driven decorative element is added to a product UI, especially one rendered many times per page or per list; when reviewing or optimizing one; or when debugging one that renders blurry, aliased, all-black, or paints over the surrounding UI on machines without hardware acceleration.",
  },
  {
    slug: "define-goal",
    user: "openai",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/openai/skills/main/skills/.curated/define-goal/SKILL.md",
    githubUrl:
      "https://github.com/openai/skills/blob/main/skills/.curated/define-goal/SKILL.md",
    name: "define-goal",
    topics: ["tooling", "architecture"],
    description:
      "Help the user define a concrete, measurable goal before starting work, especially when they ask to use the goal tool, create a goal, set an objective, clarify success criteria, or turn a fuzzy intention into a quantitative outcome. Use this skill for goal creation and goal refinement only; it does not manage durable snapshots, decision logs, or long-running execution artifacts.",
  },
  {
    slug: "scandinavian-design",
    user: "ericzakariasson",
    repo: "scandinavian-design",
    rawUrl:
      "https://raw.githubusercontent.com/ericzakariasson/scandinavian-design/main/skills/scandinavian-design/SKILL.md",
    githubUrl:
      "https://github.com/ericzakariasson/scandinavian-design/blob/main/skills/scandinavian-design/SKILL.md",
    name: "scandinavian-design",
    topics: ["visual", "taste", "craft", "typography"],
    description:
      "Apply a refined Scandinavian visual system with a neutral black-and-white foundation, restrained sans-serif typography, purposeful product imagery, generous spacing, clear page chapters, and minimal decoration. Use when the user invokes /scandinavian-design or requests a Nordic, monochrome, calm, spacious, restrained, or minimalist interface.",
  },
  {
    slug: "design-review",
    user: "Superfuture",
    repo: "design-review",
    rawUrl:
      "https://raw.githubusercontent.com/Superfuture/design-review/main/design-review/skills/design-review/SKILL.md",
    githubUrl:
      "https://github.com/Superfuture/design-review/blob/main/design-review/skills/design-review/SKILL.md",
    name: "design-review",
    topics: ["visual", "craft", "accessibility", "testing"],
    description:
      "Run a sharp, prioritized design critique of a UI — a URL, a screenshot/image, or a component file — covering visual hierarchy, typography, spacing, color & contrast, motion, component states, responsiveness, accessibility, and brand consistency. Returns findings ranked from blocking to polish, each with a specific fix; can optionally apply the fixes to code. Use when the user asks to review/critique a design, page, screen, component, or screenshot, or to check craft/accessibility before shipping.",
  },
  {
    slug: "seo",
    user: "iannuttall",
    repo: "seo",
    rawUrl:
      "https://raw.githubusercontent.com/iannuttall/seo/main/skills/seo/SKILL.md",
    githubUrl:
      "https://github.com/iannuttall/seo/blob/main/skills/seo/SKILL.md",
    name: "seo",
    topics: ["tooling", "frontend", "performance"],
    description:
      "Use for SEO audits, rankings, keyword research, indexing, metadata, Search Console, GA4, and AI search visibility. Routes to evidence-backed reports through the local SEO CLI and MCP server.",
  },
  {
    slug: "scroll-world",
    user: "oso95",
    repo: "scroll-world",
    rawUrl:
      "https://raw.githubusercontent.com/oso95/scroll-world/main/skills/scroll-world/SKILL.md",
    githubUrl:
      "https://github.com/oso95/scroll-world/blob/main/skills/scroll-world/SKILL.md",
    name: "scroll-world",
    topics: ["3d", "motion", "visual", "interaction", "frontend"],
    description:
      "Build an immersive scroll-scrubbed 3D world landing page for any brand with Higgsfield-generated scenes, seamless camera clips, and a portable scroll-scrub engine.",
  },
  {
    slug: "accessibility-diff",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-diff/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-diff/SKILL.md",
    name: "accessibility-diff",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Regression check that diffs a live page's accessibility violations against a baseline from uncommitted changes or a branch.",
  },
  {
    slug: "accessibility-scan",
    user: "AccessLint",
    repo: "claude-marketplace",
    rawUrl:
      "https://raw.githubusercontent.com/AccessLint/claude-marketplace/main/plugins/accesslint/skills/accessibility-scan/SKILL.md",
    githubUrl:
      "https://github.com/AccessLint/claude-marketplace/blob/main/plugins/accesslint/skills/accessibility-scan/SKILL.md",
    name: "accessibility-scan",
    topics: ["accessibility", "testing", "frontend"],
    description:
      "Run the AccessLint rule engine against a live page and return a worklist of WCAG 2.2 violations grounded to DOM selectors and source locations.",
  },
  {
    slug: "accessibility",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/accessibility/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/accessibility/SKILL.md",
    name: "accessibility",
    topics: ["accessibility", "frontend", "craft"],
    description:
      "Audit and improve web accessibility following WCAG 2.2 guidelines. Use when asked to \"improve accessibility\", \"a11y audit\", \"WCAG compliance\", \"screen reader support\", \"keyboard navigation\", or \"make accessible\".",
  },
  {
    slug: "best-practices",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/best-practices/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/best-practices/SKILL.md",
    name: "best-practices",
    topics: ["performance", "frontend", "craft"],
    description:
      "Apply modern web development best practices for security, compatibility, and code quality. Use when asked to \"apply best practices\", \"security audit\", \"modernize code\", \"code quality review\", or \"check for vulnerabilities\".",
  },
  {
    slug: "core-web-vitals",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/core-web-vitals/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/core-web-vitals/SKILL.md",
    name: "core-web-vitals",
    topics: ["performance", "frontend", "craft"],
    description:
      "Optimize Core Web Vitals (LCP, INP, CLS) for better page experience using field and lab evidence. Use when asked to \"improve Core Web Vitals\", \"fix LCP\", \"reduce CLS\", \"optimize INP\", \"page experience optimization\", or \"fix layout shifts\".",
  },
  {
    slug: "performance",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/performance/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/performance/SKILL.md",
    name: "performance",
    topics: ["performance", "frontend", "craft"],
    description:
      "Optimize web performance for faster loading and better user experience. Use when asked to \"speed up my site\", \"optimize performance\", \"reduce load time\", \"fix slow loading\", \"improve page speed\", or \"performance audit\".",
  },
  {
    slug: "seo",
    user: "addyosmani",
    repo: "web-quality-skills",
    rawUrl:
      "https://raw.githubusercontent.com/addyosmani/web-quality-skills/main/skills/seo/SKILL.md",
    githubUrl:
      "https://github.com/addyosmani/web-quality-skills/blob/main/skills/seo/SKILL.md",
    name: "seo",
    topics: ["performance", "frontend", "craft"],
    description:
      "Optimize for search engine visibility and ranking. Use when asked to \"improve SEO\", \"optimize for search\", \"fix meta tags\", \"add structured data\", \"sitemap optimization\", or \"search engine optimization\".",
  },
  {
    slug: "antfu-design",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/antfu-design/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/antfu-design/SKILL.md",
    name: "antfu-design",
    topics: ["frontend", "craft", "visual"],
    description:
      "antfu-style design conventions, broadened. UnoCSS-first, class-based semantic tokens with dual light/dark for tooling and devtools UIs, plus design-read, anti-slop, and micro-interaction polish for landing pages and product surfaces. Use when building or refactoring any interface with UnoCSS.",
  },
  {
    slug: "nitro",
    user: "antfu",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/antfu/skills/main/skills/nitro/SKILL.md",
    githubUrl:
      "https://github.com/antfu/skills/blob/main/skills/nitro/SKILL.md",
    name: "nitro",
    topics: ["frontend", "craft", "visual"],
    description:
      "Nitro is the framework-agnostic server toolkit (powering Nuxt) for building and deploying web servers anywhere. Use when working with nitro.config, server routes/event handlers, route rules, caching, storage, tasks, websockets, or deploying to Node/Bun/Deno/Cloudflare/Vercel.",
  },
  {
    slug: "figma-code-connect",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-code-connect/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-code-connect/SKILL.md",
    name: "figma-code-connect",
    topics: ["visual", "systems", "frontend"],
    description:
      "Creates and maintains Figma Code Connect template files that map Figma components to code snippets. Use when the user mentions Code Connect, Figma component mapping, design-to-code translation, or asks to create/update .figma.ts or .figma.js files.",
  },
  {
    slug: "figma-create-new-file",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-create-new-file/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-create-new-file/SKILL.md",
    name: "figma-create-new-file",
    topics: ["visual", "systems", "frontend"],
    description:
      "**MANDATORY prerequisite** — you MUST invoke this skill BEFORE every `create_new_file` tool call. NEVER call `create_new_file` directly without loading this skill first. Trigger whenever the user wants a new blank Figma file — a new design, FigJam, or Slides file — or when you need a fresh file before calling `use_figma`. Usage — /figma-create-new-file [editorType] [fileName] (e.g. /figma-create-new-file figjam My Whiteboard, /figma-create-new-file slides Q3 Review)",
  },
  {
    slug: "figma-design-to-code",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-design-to-code/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-design-to-code/SKILL.md",
    name: "figma-design-to-code",
    topics: ["visual", "systems", "frontend"],
    description:
      "**MANDATORY prerequisite** — you MUST invoke this skill BEFORE calling the `get_design_context` Figma MCP tool. You MUST trigger this skill whenever the user wants to implement, build, port, or code up a Figma design as code. Example prompts (not exhaustive) are 'implement this Figma design', 'build this screen from Figma', 'turn this Figma into code', 'design to code'. This skill provides critical instructions and steps to the agent on how to correctly implement Figma designs in code and must NOT be skipped.",
  },
  {
    slug: "figma-generate-diagram",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-generate-diagram/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generate-diagram/SKILL.md",
    name: "figma-generate-diagram",
    topics: ["visual", "systems", "frontend"],
    description:
      "MANDATORY prerequisite — load this skill BEFORE every `generate_diagram` tool call. NEVER call `generate_diagram` directly without loading this skill first. Trigger whenever the user asks to create, generate, draw, render, sketch, or build a diagram — flowchart, architecture diagram, sequence diagram, ERD or entity-relationship diagram, state diagram or state machine, gantt chart, or timeline. Also trigger when the user mentions Mermaid syntax or wants a system architecture, decision tree, dependency graph, API call flow, auth handshake, schema, or pipeline visualized in FigJam. Routes to type-specific guidance, sets universal Mermaid constraints, and tells you when to use a different diagram type or skip the tool entirely (mindmaps, pie charts, class diagrams, etc.).",
  },
  {
    slug: "figma-implement-motion",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-implement-motion/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-implement-motion/SKILL.md",
    name: "figma-implement-motion",
    topics: ["motion", "video", "frontend"],
    description:
      "Translates Figma motion and animations into production-ready application code. Use when implementing animation/motion from a Figma design — user mentions \"implement this motion\", \"add animation from Figma\", \"animate this component\", provides a Figma URL whose node is animated, or when `get_design_context` returns motion data or instructs you to call `get_motion_context`.",
  },
  {
    slug: "figma-swiftui",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-swiftui/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-swiftui/SKILL.md",
    name: "figma-swiftui",
    topics: ["visual", "systems", "frontend"],
    description:
      "SwiftUI ↔ Figma translation. Use whenever the user mentions Swift, SwiftUI, iOS, iPhone, or iPad — in EITHER direction — translating a Figma design into SwiftUI (design → code), or pushing SwiftUI views / screens / tokens back into a Figma file (code → design). Triggers on phrases like 'implement this Figma design in SwiftUI', 'build this screen in Swift', 'push this SwiftUI view to Figma', 'mirror my Swift code in a Figma file', or whenever a Figma URL appears alongside `.swift` files / an `.xcodeproj`. Routes to a direction-specific reference doc; loads alongside `figma-use` for the code → design path.",
  },
  {
    slug: "figma-use-figjam",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-use-figjam/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-use-figjam/SKILL.md",
    name: "figma-use-figjam",
    topics: ["visual", "systems", "frontend"],
    description:
      "This skill helps agents use Figma's use_figma MCP tool in the FigJam context. Can be used alongside figma-use which has foundational context for using the use_figma tool.",
  },
  {
    slug: "figma-use-motion",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-use-motion/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-use-motion/SKILL.md",
    name: "figma-use-motion",
    topics: ["motion", "video", "frontend"],
    description:
      "Motion / animation context for the `use_figma` MCP tool — animating Figma nodes via manual keyframes, animation styles, easing, and timeline duration. Load alongside figma-use whenever a task involves adding, editing, or inspecting animation on a node.",
  },
  {
    slug: "figma-use-slides",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-use-slides/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-use-slides/SKILL.md",
    name: "figma-use-slides",
    topics: ["visual", "systems", "frontend"],
    description:
      "This skill helps agents use Figma's use_figma MCP tool in the Slides context. Can be used alongside figma-use which has foundational context for using the use_figma tool.",
  },
  {
    slug: "generate-project-plan",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/workflow-skills/generate-project-plan/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/workflow-skills/generate-project-plan/SKILL.md",
    name: "generate-project-plan",
    topics: ["frontend", "craft", "visual"],
    description:
      "Generate a FigJam project plan board from a PRD plus codebase context. Interactive flow: research → propose sections → per-section deep research → per-section content + block-shape proposal → create FigJam → skeleton → fill → diagrams → wrap. Each content block (section, nested section, intro callout, table, multi-column text, sticky column, diagram section, metadata strip) has its own subskill reference file. Use when the user asks for 'project plan in FigJam', 'interactive project plan', '/generate-project-plan', or provides a PRD and wants per-section confirmation on content + rendering.",
  },
  {
    slug: "video-interaction-mapper",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/workflow-skills/video-interaction-mapper/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/workflow-skills/video-interaction-mapper/SKILL.md",
    name: "video-interaction-mapper",
    topics: ["motion","video","frontend"],
    description:
      "Analyze a UI screen recording and map interaction states into an annotated Figma Design storyboard with extracted before/after frames.",
  },
  {
    slug: "ascii-animation",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/ascii-animation/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/ascii-animation/SKILL.md",
    name: "ascii-animation",
    topics: ["motion", "video", "frontend"],
    description:
      "This skill should be used when the user asks to \"make an ASCII animation\", \"build a terminal/CLI intro or loader\", \"convert an image or video to ASCII art\", \"add an ASCII shader/post-effect to a canvas or Three.js scene\", \"create retro/hacker text-character motion\", or \"animate text characters with a brightness ramp\". Covers generative ASCII fields, image/video/3D-to-ASCII, and animated character art for both web and terminal.",
  },
  {
    slug: "glassmorphism",
    user: "iart-ai",
    repo: "web-animation-skills",
    rawUrl:
      "https://raw.githubusercontent.com/iart-ai/web-animation-skills/main/skills/glassmorphism/SKILL.md",
    githubUrl:
      "https://github.com/iart-ai/web-animation-skills/blob/main/skills/glassmorphism/SKILL.md",
    name: "glassmorphism",
    topics: ["motion", "video", "frontend"],
    description:
      "This skill should be used when the user asks to \"add a glassmorphism effect\", \"frosted glass UI\", \"Apple liquid glass style\", \"frosted blur card\", \"translucent glass panel animation\", \"make a frosted nav bar\", \"build a glass modal/dialog\", \"animate a glass card on hover\", or \"add a refracting liquid-glass hero\". Covers frosted translucent panels with backdrop-filter blur, edge/specular highlights, SVG liquid-glass refraction, motion on hover/scroll/enter, and accessible reduced-transparency fallbacks.",
  },
  {
    slug: "break",
    user: "jakubkrehel",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/jakubkrehel/skills/main/skills/break/SKILL.md",
    githubUrl:
      "https://github.com/jakubkrehel/skills/blob/main/skills/break/SKILL.md",
    name: "break",
    topics: ["frontend", "craft", "visual"],
    description:
      "Answers \"does this survive?\" for one component. Renders it on a page in every state real use can put it in, and hands that page over as a visual report of what broke.",
  },
  {
    slug: "brandkit",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/brandkit/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/brandkit/SKILL.md",
    name: "brandkit",
    topics: ["visual", "systems", "frontend"],
    description:
      "Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks, and visual-world presentations. Trained for minimalist, cinematic, editorial, dark-tech, luxury, cultural, security, gaming, developer-tool, and consumer-app brand systems. Optimized for intentional logo concepting, refined composition, sparse typography, strong symbolic meaning, premium mockups, art-directed imagery, and flexible grid layouts.",
  },
  {
    slug: "image-to-code-skill",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/image-to-code-skill/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/image-to-code-skill/SKILL.md",
    name: "image-to-code-skill",
    topics: ["visual", "craft", "frontend"],
    description:
      "Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design image(s) itself, deeply analyze them, then implement the website to match them as closely as possible. In Codex, it must prefer large, readable, section-specific images instead of tiny compressed boards, generate fresh standalone images for sections or detail views instead of cropping old ones, avoid lazy under-generation, avoid cards-inside-cards-inside-cards UI, and keep the hero clean, spacious, readable, and visible on a small laptop.",
  },
  {
    slug: "imagegen-frontend-mobile",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/imagegen-frontend-mobile/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-mobile/SKILL.md",
    name: "imagegen-frontend-mobile",
    topics: ["visual", "craft", "frontend"],
    description:
      "Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS, Android, and cross-platform mobile products. Prioritizes clean hierarchy, comfortably readable text, strong multi-screen consistency, controlled color palettes, non-generic creative direction, textured surfaces, image-led composition, tasteful custom iconography, and clean phone mockup framing. By default, screens should be shown inside a subtle premium iPhone or similar phone mockup with a visible frame, while the main focus stays on the app content itself. This skill generates images only. It does not write code.",
  },
  {
    slug: "imagegen-frontend-web",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/imagegen-frontend-web/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/imagegen-frontend-web/SKILL.md",
    name: "imagegen-frontend-web",
    topics: ["visual", "craft", "frontend"],
    description:
      "Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUTPUT RULE — generate ONE separate horizontal image FOR EVERY section. A landing page with 8 sections produces 8 images. Never compress multiple sections into one image. Enforces composition variety (not always left-text / right-image), background-image freedom, varied CTAs, varied hero scales (giant / mid / mini minimalist), narrative concept spine, second-read moments, and a single consistent palette across all images. Optimized for landing pages, marketing sites, and product comps that developers or coding models can accurately recreate.",
  },
  {
    slug: "taste-skill-v1",
    user: "Leonxlnx",
    repo: "taste-skill",
    rawUrl:
      "https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill-v1/SKILL.md",
    githubUrl:
      "https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill-v1/SKILL.md",
    name: "taste-skill-v1",
    topics: ["visual", "craft", "frontend"],
    description:
      "The original v1 taste-skill, preserved for projects depending on its exact behavior. The current default is `design-taste-frontend` (v2 experimental), which is a substantial rewrite. Use this v1 install name only if you need exact backward compatibility.",
  },
  {
    slug: "banner-design",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/banner-design/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/banner-design/SKILL.md",
    name: "banner-design",
    topics: ["visual", "systems", "frontend"],
    description:
      "Design banners for social media, ads, website heroes, creative assets, and print. Multiple art direction options with AI-generated visuals. Actions: design, create, generate banner. Platforms: Facebook, Twitter/X, LinkedIn, YouTube, Instagram, Google Display, website hero, print. Styles: minimalist, gradient, bold typography, photo-based, illustrated, geometric, retro, glassmorphism, 3D, neon, duotone, editorial, collage. Uses ui-ux-pro-max, frontend-design, ai-artist, ai-multimodal skills.",
  },
  {
    slug: "brand",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/brand/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/brand/SKILL.md",
    name: "brand",
    topics: ["visual", "systems", "frontend"],
    description:
      "Brand voice, visual identity, messaging frameworks, asset management, brand consistency. Activate for branded content, tone of voice, marketing assets, brand compliance, style guides.",
  },
  {
    slug: "design",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/design/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/design/SKILL.md",
    name: "design",
    topics: ["visual", "systems", "frontend"],
    description:
      "Comprehensive design skill: brand identity, design tokens, UI styling, logo generation (55 styles, Gemini AI), corporate identity program (50 deliverables, CIP mockups), HTML presentations (Chart.js), banner design (22 styles, social/ads/web/print), icon design (15 styles, SVG, Gemini 3.1 Pro), social photos (HTML→screenshot, multi-platform). Actions: design logo, create CIP, generate mockups, build slides, design banner, generate icon, create social photos, social media images, brand identity, design system. Platforms: Facebook, Twitter, LinkedIn, YouTube, Instagram, Pinterest, TikTok, Threads, Google Ads.",
  },
  {
    slug: "design-system",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/design-system/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/design-system/SKILL.md",
    name: "design-system",
    topics: ["visual", "systems", "frontend"],
    description:
      "Token architecture, component specifications, and slide generation. Three-layer tokens (primitive→semantic→component), CSS variables, spacing/typography scales, component specs, strategic slide creation. Use for design tokens, systematic design, brand-compliant presentations.",
  },
  {
    slug: "slides",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/slides/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/slides/SKILL.md",
    name: "slides",
    topics: ["visual", "systems", "frontend"],
    description:
      "Create strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies.",
  },
  {
    slug: "ui-styling",
    user: "nextlevelbuilder",
    repo: "ui-ux-pro-max-skill",
    rawUrl:
      "https://raw.githubusercontent.com/nextlevelbuilder/ui-ux-pro-max-skill/main/.claude/skills/ui-styling/SKILL.md",
    githubUrl:
      "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-styling/SKILL.md",
    name: "ui-styling",
    topics: ["visual", "systems", "frontend"],
    description:
      "Create beautiful, accessible user interfaces with shadcn/ui components (built on Radix UI + Tailwind), Tailwind CSS utility-first styling, and canvas-based visual designs. Use when building user interfaces, implementing design systems, creating responsive layouts, adding accessible components (dialogs, dropdowns, forms, tables), customizing themes and colors, implementing dark mode, generating visual designs and posters, or establishing consistent styling patterns across applications.",
  },
  {
    slug: "figma-generative-plugins",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-generative-plugins/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-generative-plugins/SKILL.md",
    name: "figma-generative-plugins",
    topics: ["systems", "tooling", "frontend"],
    description:
      "Mandatory prerequisite before create_generative_plugin or update_generative_plugin. Use when creating, authoring, changing, or extending reusable generative Figma plugins with functional UI.",
  },
  {
    slug: "figma-shaders",
    user: "figma",
    repo: "mcp-server-guide",
    rawUrl:
      "https://raw.githubusercontent.com/figma/mcp-server-guide/main/skills/figma-shaders/SKILL.md",
    githubUrl:
      "https://github.com/figma/mcp-server-guide/blob/main/skills/figma-shaders/SKILL.md",
    name: "figma-shaders",
    topics: ["visual", "motion", "frontend"],
    description:
      "Mandatory prerequisite before create_shader or update_shader. Use when authoring shader effects, shader fills, custom effects, or procedural shader backgrounds in Figma Design.",
  },
  {
    slug: "fix-design-system-finding",
    user: "edenspiekermann",
    repo: "Skills",
    rawUrl:
      "https://raw.githubusercontent.com/edenspiekermann/Skills/main/skills/fix-design-system-finding/SKILL.md",
    githubUrl:
      "https://github.com/edenspiekermann/Skills/blob/main/skills/fix-design-system-finding/SKILL.md",
    name: "fix-design-system-finding",
    topics: ["visual", "systems", "frontend"],
    description:
      "Fix a specific design-system integration finding in a Figma screen or component, including missing shared components, local overrides, and unbound tokens.",
  },
  {
    slug: "chalk-logic",
    user: "CaliCastle",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/CaliCastle/skills/main/skills/chalk-logic/SKILL.md",
    githubUrl:
      "https://github.com/CaliCastle/skills/blob/main/skills/chalk-logic/SKILL.md",
    name: "chalk-logic",
    topics: ["visual", "craft", "taste"],
    description:
      "Create Chalk Logic concept-led chalkboard illustrations from briefs. Use for sparse wordless chalkboard explanations, non-diagram editorial chalk compositions, or prompt-only Chalk Logic recipes.",
  },
  {
    slug: "interactive-hit-areas",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/interactive-hit-areas/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/interactive-hit-areas/SKILL.md",
    name: "interactive-hit-areas",
    topics: ["interaction", "frontend", "accessibility"],
    description:
      "Use when interactive elements with visual spacing between them need hover or click to respond across the whole region with no dead zones.",
  },
  {
    slug: "paper-flex",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/paper-flex/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/paper-flex/SKILL.md",
    name: "paper-flex",
    topics: ["systems", "frontend", "visual"],
    description:
      "Convert Paper canvas or design nodes from absolute positioning to flex or auto-layout while preserving SVG/image fidelity, z-order, and screenshot-verified visual parity.",
  },
  {
    slug: "paper-to-code-components",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/paper-to-code-components/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/paper-to-code-components/SKILL.md",
    name: "paper-to-code-components",
    topics: ["systems", "frontend", "visual"],
    description:
      "Use when implementing Paper MCP, Paper-to-code, design-to-code, Viewfinder, or Paper-exported JSX in React/Next.js apps with component candidates, tokens, and shadcn reuse.",
  },
  {
    slug: "reconcile-paper-sync",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/reconcile-paper-sync/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/reconcile-paper-sync/SKILL.md",
    name: "reconcile-paper-sync",
    topics: ["systems", "frontend", "craft"],
    description:
      "Verify and repair a Paper-to-code implementation against its paper-sync canonical render, including fonts, exact tokens, and screenshot diffing.",
  },
  {
    slug: "tailwind-token-consolidation",
    user: "millionco",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/millionco/skills/main/skills/tailwind-token-consolidation/SKILL.md",
    githubUrl:
      "https://github.com/millionco/skills/blob/main/skills/tailwind-token-consolidation/SKILL.md",
    name: "tailwind-token-consolidation",
    topics: ["systems", "visual", "frontend"],
    description:
      "Consolidate, dedupe, or reduce CSS custom properties and Tailwind v4 design tokens in globals.css while preserving the same visual result.",
  },
  {
    slug: "transitions-polish",
    user: "Jakubantalik",
    repo: "transitions.dev",
    rawUrl:
      "https://raw.githubusercontent.com/Jakubantalik/transitions.dev/main/skills/transitions-polish/SKILL.md",
    githubUrl:
      "https://github.com/Jakubantalik/transitions.dev/blob/main/skills/transitions-polish/SKILL.md",
    name: "transitions-polish",
    topics: ["motion", "craft", "frontend"],
    description:
      "Polish and refine existing motion against the transitions.dev motion-token scale — duration, distance, scale, blur, easing, and when each token applies.",
  },
  {
    slug: "react-router-data-mode",
    user: "remix-run",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/remix-run/agent-skills/main/skills/react-router-data-mode/SKILL.md",
    githubUrl:
      "https://github.com/remix-run/agent-skills/blob/main/skills/react-router-data-mode/SKILL.md",
    name: "react-router-data-mode",
    topics: ["frontend", "frameworks", "interaction"],
    description:
      "Build React applications using React Router data mode with createBrowserRouter, loaders, actions, Form, useFetcher, and pending or optimistic UI.",
  },
  {
    slug: "react-router-declarative-mode",
    user: "remix-run",
    repo: "agent-skills",
    rawUrl:
      "https://raw.githubusercontent.com/remix-run/agent-skills/main/skills/react-router-declarative-mode/SKILL.md",
    githubUrl:
      "https://github.com/remix-run/agent-skills/blob/main/skills/react-router-declarative-mode/SKILL.md",
    name: "react-router-declarative-mode",
    topics: ["frontend", "frameworks", "interaction"],
    description:
      "Build React applications using React Router declarative mode with BrowserRouter, Routes, Link, NavLink, and URL or search params without loaders or actions.",
  },
  {
    slug: "animate-ui",
    user: "PrototyperAI",
    repo: "prototyper-ui",
    rawUrl:
      "https://raw.githubusercontent.com/PrototyperAI/prototyper-ui/main/apps/docs/skill/animate-ui/SKILL.md",
    githubUrl:
      "https://github.com/PrototyperAI/prototyper-ui/blob/main/apps/docs/skill/animate-ui/SKILL.md",
    name: "animate-ui",
    topics: ["motion", "interaction", "craft"],
    description:
      "Prototyper UI animation conventions for writing, reviewing, or debugging transition code, overlay enter/exit, press feedback, and prefers-reduced-motion.",
  },
  {
    slug: "migrate-radix-to-base",
    user: "shadcn-ui",
    repo: "ui",
    rawUrl:
      "https://raw.githubusercontent.com/shadcn-ui/ui/main/skills/migrate-radix-to-base/SKILL.md",
    githubUrl:
      "https://github.com/shadcn-ui/ui/blob/main/skills/migrate-radix-to-base/SKILL.md",
    name: "migrate-radix-to-base",
    topics: ["systems", "frontend", "tooling"],
    description:
      "Migrate React projects and shadcn components from Radix UI to Base UI, handling route objects, consumer props, and progressive wrapper migration.",
  },
  {
    slug: "apple-web-app",
    user: "joe-bell",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/joe-bell/skills/main/skills/apple-web-app/SKILL.md",
    githubUrl:
      "https://github.com/joe-bell/skills/blob/main/skills/apple-web-app/SKILL.md",
    name: "apple-web-app",
    topics: ["frontend", "systems", "craft"],
    description:
      "Implement, debug, or audit iPhone/iPad Add to Home Screen and macOS Safari Add to Dock web app UI: safe areas, status bar, theme color, manifest, icons, splash screens, and installed navigation.",
  },
  {
    slug: "pr-lens",
    user: "coldteadotai",
    repo: "pr-lens",
    rawUrl:
      "https://raw.githubusercontent.com/coldteadotai/pr-lens/main/skills/pr-lens/SKILL.md",
    githubUrl:
      "https://github.com/coldteadotai/pr-lens/blob/main/skills/pr-lens/SKILL.md",
    name: "pr-lens",
    topics: ["visual", "systems", "tooling"],
    description:
      "Draw a code change or system as an animated architecture or data-flow diagram for comprehension, pull requests, or standalone explanation.",
  },
  {
    slug: "show-me",
    user: "humanlayer",
    repo: "skills",
    rawUrl:
      "https://raw.githubusercontent.com/humanlayer/skills/main/plugins/show-me/skills/show-me/SKILL.md",
    githubUrl:
      "https://github.com/humanlayer/skills/blob/main/plugins/show-me/skills/show-me/SKILL.md",
    name: "show-me",
    topics: ["visual", "craft", "frontend"],
    description:
      "Help the user understand the current topic visually with concise diagrams, code-shape sketches, Mermaid flows, diffs, and focused HTML artifacts.",
  },
  {
    slug: "lieflat-charts",
    user: "larashero3-dotcom",
    repo: "lieflat-charts",
    rawUrl:
      "https://raw.githubusercontent.com/larashero3-dotcom/lieflat-charts/main/SKILL.md",
    githubUrl:
      "https://github.com/larashero3-dotcom/lieflat-charts/blob/main/SKILL.md",
    name: "lieflat-charts",
    topics: ["visual", "systems", "frontend"],
    description:
      "Template-driven data visualization and standalone HTML report generation using Lupi, Basics, Glance, Maps, and Interactive gallery patterns with Mono or semantic color presets.",
  },
  {
    slug: "refactoring-ui",
    user: "s0xDk",
    repo: "refactoring-ui-skill",
    rawUrl:
      "https://raw.githubusercontent.com/s0xDk/refactoring-ui-skill/main/SKILL.md",
    githubUrl:
      "https://github.com/s0xDk/refactoring-ui-skill/blob/main/SKILL.md",
    name: "refactoring-ui",
    topics: ["visual", "systems", "craft"],
    description:
      "Design and improve user interfaces using Refactoring UI rules for constrained spacing, type, color, shadow scales, hierarchy, and depth.",
  },
  {
    slug: "term-radar",
    user: "SidKH",
    repo: "term-radar",
    rawUrl:
      "https://raw.githubusercontent.com/SidKH/term-radar/main/term-radar/SKILL.md",
    githubUrl:
      "https://github.com/SidKH/term-radar/blob/main/term-radar/SKILL.md",
    name: "term-radar",
    topics: ["tooling", "craft", "frontend"],
    description:
      "When a user describes a concept that matches an established term of art, append a concise Term radar link with a Google Images reference for that term.",
  },
];

const buildInitialPathSlug = (entry: RegistrySourceSkill) => {
  const userSegment = entry.user.toLowerCase();
  return `${userSegment}/${entry.slug}`;
};

export const registry: RegistrySkill[] = [];
const usedPathSlugs = new Set<string>();

for (const entry of registrySource) {
  const userSegment = entry.user.toLowerCase();
  const repoSegment = entry.repo.toLowerCase();
  const sourceKey = userSegment;

  let pathSlug = buildInitialPathSlug(entry);
  if (usedPathSlugs.has(pathSlug)) {
    pathSlug = `${userSegment}/${repoSegment}/${entry.slug}`;
  }

  usedPathSlugs.add(pathSlug);

  registry.push({
    ...entry,
    pathSlug,
    sourceKey,
    sourceLabel: entry.user,
  });
}
