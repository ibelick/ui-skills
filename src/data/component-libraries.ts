import type { DirectoryLink } from "./directory-links";

export type ComponentCollection =
  | "production"
  | "primitives"
  | "copy-paste"
  | "motion"
  | "tailwind"
  | "generative-ui";

export type ComponentLibrary = {
  name: string;
  description: string;
  websiteUrl: string;
  githubRepo?: string;
  collection: ComponentCollection;
  bestFor: string;
  framework: string;
  styling: string;
  ownership: string;
  featured?: boolean;
};

export const componentCollections: Array<{
  slug: ComponentCollection;
  routeSlug: string;
  title: string;
  controlTitle: string;
  description: string;
  intro: string;
  seoTitle: string;
  metaDescription: string;
  relatedLinks?: DirectoryLink[];
}> = [
  {
    slug: "production",
    routeSlug: "react",
    title: "React component libraries",
    controlTitle: "React",
    description:
      "Complete UI systems for teams shipping dashboards, products, and applications with a consistent component model.",
    intro:
      "Compare established React component libraries for teams that need polished defaults, broad coverage, and a consistent foundation for product interfaces.",
    seoTitle: "React Component Libraries",
    metaDescription:
      "Browse curated React component libraries for dashboards, products, and application interfaces.",
  },
  {
    slug: "primitives",
    routeSlug: "primitives",
    title: "React primitives",
    controlTitle: "Primitives",
    description:
      "Low-level building blocks for teams that want to own the visual language while relying on robust interaction behavior.",
    intro:
      "Find accessible, unstyled React primitives for teams that want full control over visual language, tokens, and component composition.",
    seoTitle: "React Primitives",
    metaDescription:
      "Browse React primitives for accessible interactions, headless components, and custom design systems.",
  },
  {
    slug: "copy-paste",
    routeSlug: "shadcn",
    title: "shadcn components",
    controlTitle: "shadcn",
    description:
      "Source-first component collections that let you copy, adapt, and keep the implementation inside your own codebase.",
    intro:
      "Explore source-first shadcn component collections and copy-paste building blocks that stay inside your codebase and remain easy to customize.",
    seoTitle: "Shadcn Components",
    metaDescription:
      "Browse curated shadcn components and copy-paste UI collections for React and Tailwind CSS projects.",
    relatedLinks: [
      {
        label: "All component libraries",
        href: "/components",
        description:
          "Browse every curated component library and UI system in one directory.",
      },
      {
        label: "shadcn/ui skills",
        href: "/skills/shadcn-ui-development",
        description:
          "Find agent skills for composing, styling, and migrating shadcn/ui components.",
      },
    ],
  },
  {
    slug: "motion",
    routeSlug: "motion",
    title: "Animated and creative components",
    controlTitle: "Motion",
    description:
      "Motion-rich components and interaction patterns for expressive landing pages, product moments, and visual experiments.",
    intro:
      "Compare animated React components, including Aceternity UI, for expressive landing pages and product moments.",
    seoTitle: "Animated React Components",
    metaDescription:
      "Browse animated React components, including Aceternity UI, for motion-rich interfaces and landing pages.",
  },
  {
    slug: "tailwind",
    routeSlug: "tailwind-css",
    title: "Tailwind CSS component libraries",
    controlTitle: "Tailwind CSS",
    description:
      "Utility-first component systems and ready-made patterns for teams building with Tailwind CSS.",
    intro:
      "Find Tailwind CSS component libraries and ready-made UI patterns for marketing sites, dashboards, and web applications.",
    seoTitle: "Tailwind CSS Component Libraries",
    metaDescription:
      "Browse Tailwind CSS component libraries, UI systems, and ready-made patterns for modern web projects.",
  },
  {
    slug: "generative-ui",
    routeSlug: "generative-ui",
    title: "Generative UI and AI components",
    controlTitle: "AI UI",
    description:
      "Components for chat, agent workflows, tool calls, and AI interfaces that need more than a standard form or dashboard.",
    intro:
      "Explore generative UI components for chat, streaming responses, tool calls, agent workflows, and AI-native product interfaces.",
    seoTitle: "Generative UI Components",
    metaDescription:
      "Browse generative UI and AI components for chat interfaces, agent workflows, tool calls, and streaming experiences.",
  },
];

export const componentLibraries: ComponentLibrary[] = [
  {
    name: "Base UI",
    description:
      "Unstyled React components from the MUI team for building accessible interfaces without inheriting a visual theme.",
    websiteUrl: "https://base-ui.com/",
    githubRepo: "mui/base-ui",
    collection: "primitives",
    bestFor: "Modern custom systems",
    framework: "React",
    styling: "Bring your own CSS",
    ownership: "Installed package",
    featured: true,
  },
  {
    name: "React Aria",
    description:
      "Hooks and components for building inclusive React interfaces with detailed control over interaction and behavior.",
    websiteUrl: "https://react-spectrum.adobe.com/react-aria/",
    githubRepo: "adobe/react-spectrum",
    collection: "primitives",
    bestFor: "Interaction-heavy products",
    framework: "React",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "Ariakit",
    description:
      "Accessible, unstyled React components and hooks for building custom interfaces with complete control over behavior and styling.",
    websiteUrl: "https://ariakit.org/",
    githubRepo: "ariakit/ariakit",
    collection: "primitives",
    bestFor: "Accessible custom systems",
    framework: "React",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "Radix UI",
    description:
      "Unstyled React primitives for menus, dialogs, popovers, tabs, and other difficult interface behaviors.",
    websiteUrl: "https://www.radix-ui.com/",
    githubRepo: "radix-ui/primitives",
    collection: "primitives",
    bestFor: "Custom design systems",
    framework: "React",
    styling: "Bring your own CSS",
    ownership: "Installed package",
    featured: true,
  },
  {
    name: "Headless UI",
    description:
      "Unstyled, accessible UI primitives designed to pair closely with Tailwind CSS and custom visual systems.",
    websiteUrl: "https://headlessui.com/",
    githubRepo: "tailwindlabs/headlessui",
    collection: "primitives",
    bestFor: "Tailwind-based applications",
    framework: "React and Vue",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "Ark UI",
    description:
      "Headless, state-machine-powered components for React, Vue, Solid, and Svelte applications.",
    websiteUrl: "https://ark-ui.com/",
    githubRepo: "chakra-ui/ark",
    collection: "primitives",
    bestFor: "Multi-framework systems",
    framework: "React, Vue, Solid, and Svelte",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "Floating UI",
    description:
      "Low-level positioning and interaction primitives for tooltips, popovers, dropdowns, and floating elements.",
    websiteUrl: "https://floating-ui.com/",
    githubRepo: "floating-ui/floating-ui",
    collection: "primitives",
    bestFor: "Floating element behavior",
    framework: "JavaScript, React, Vue, and more",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "shadcn/ui",
    description:
      "A source-first collection of beautifully composed components that you copy into your own React and Tailwind codebase.",
    websiteUrl: "https://ui.shadcn.com/",
    githubRepo: "shadcn-ui/ui",
    collection: "copy-paste",
    bestFor: "Owning and customizing source code",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
    featured: true,
  },
  {
    name: "Chakra UI",
    description:
      "Composable React components with a straightforward styling API for accessible, themeable application interfaces.",
    websiteUrl: "https://chakra-ui.com/",
    githubRepo: "chakra-ui/chakra-ui",
    collection: "production",
    bestFor: "Fast product prototyping",
    framework: "React",
    styling: "Style props and tokens",
    ownership: "Installed package",
  },
  {
    name: "Mantine",
    description:
      "A large React component and hooks library with polished defaults for dashboards, tools, and internal products.",
    websiteUrl: "https://mantine.dev/",
    githubRepo: "mantinedev/mantine",
    collection: "production",
    bestFor: "Dashboards and internal tools",
    framework: "React",
    styling: "CSS modules and styles API",
    ownership: "Installed package",
  },
  {
    name: "Ant Design",
    description:
      "An enterprise-focused React system with dense data components, patterns, and a comprehensive visual language.",
    websiteUrl: "https://ant.design/",
    githubRepo: "ant-design/ant-design",
    collection: "production",
    bestFor: "Data-heavy enterprise products",
    framework: "React",
    styling: "Design tokens and CSS-in-JS",
    ownership: "Installed package",
  },
  {
    name: "Material UI",
    description:
      "A comprehensive React component library with production-ready components, theming, accessibility, and Material Design foundations.",
    websiteUrl: "https://mui.com/material-ui/",
    githubRepo: "mui/material-ui",
    collection: "production",
    bestFor: "Production React applications",
    framework: "React",
    styling: "Emotion and CSS",
    ownership: "Installed package",
  },
  {
    name: "PrimeReact",
    description:
      "A broad React UI component library with enterprise-ready inputs, data tables, overlays, charts, and layout components.",
    websiteUrl: "https://primereact.org/",
    githubRepo: "primefaces/primereact",
    collection: "production",
    bestFor: "Enterprise application interfaces",
    framework: "React",
    styling: "Themes and CSS",
    ownership: "Installed package",
  },
  {
    name: "HeroUI",
    description:
      "A modern React component library with polished defaults, accessible behavior, and Tailwind-friendly theming.",
    websiteUrl: "https://www.heroui.com/",
    githubRepo: "heroui-inc/heroui",
    collection: "production",
    bestFor: "Modern product interfaces",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Installed package",
  },
  {
    name: "Untitled UI React",
    description:
      "A large open-source React component collection built with Tailwind CSS and React Aria for polished, accessible product interfaces.",
    websiteUrl: "https://www.untitledui.com/react/",
    githubRepo: "untitleduico/react",
    collection: "production",
    bestFor: "Tailwind product interfaces",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Park UI",
    description:
      "Styled components built on Ark UI and Panda CSS for teams that want a polished multi-framework foundation.",
    websiteUrl: "https://park-ui.com/",
    githubRepo: "chakra-ui/park-ui",
    collection: "production",
    bestFor: "Panda CSS design systems",
    framework: "React and more",
    styling: "Panda CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Fluent UI",
    description:
      "Microsoft's React and web component system for accessible, enterprise-scale applications and product surfaces.",
    websiteUrl: "https://react.fluentui.dev/",
    githubRepo: "microsoft/fluentui",
    collection: "production",
    bestFor: "Enterprise product interfaces",
    framework: "React and web components",
    styling: "Fluent design tokens",
    ownership: "Installed package",
  },
  {
    name: "Shopify Polaris",
    description:
      "Shopify's design system for app surfaces, now centered on technology-agnostic Web Components for current development.",
    websiteUrl: "https://polaris.shopify.com/",
    githubRepo: "Shopify/polaris-react-archive",
    collection: "production",
    bestFor: "Shopify app interfaces",
    framework: "Web Components",
    styling: "Polaris tokens and CSS",
    ownership: "Installed package and components",
  },
  {
    name: "Motion",
    description:
      "A production-grade animation library for React, JavaScript, and Vue with gestures, springs, layout, and scroll effects.",
    websiteUrl: "https://motion.dev/",
    githubRepo: "motiondivision/motion",
    collection: "motion",
    bestFor: "Production UI animation",
    framework: "React, JavaScript, and Vue",
    styling: "Animation APIs",
    ownership: "Installed package",
  },
  {
    name: "React Spring",
    description:
      "A spring-physics animation library for fluid React, web, native, Three.js, and other interactive experiences.",
    websiteUrl: "https://www.react-spring.dev/",
    githubRepo: "pmndrs/react-spring",
    collection: "motion",
    bestFor: "Physics-based interaction",
    framework: "React and React Native",
    styling: "Animation APIs",
    ownership: "Installed package",
  },
  {
    name: "GSAP",
    description:
      "A framework-agnostic animation platform for high-performance UI, SVG, scroll, text, and interactive web motion.",
    websiteUrl: "https://gsap.com/",
    githubRepo: "greensock/GSAP",
    collection: "motion",
    bestFor: "Advanced web animation",
    framework: "JavaScript and frontend frameworks",
    styling: "Animation APIs and plugins",
    ownership: "Installed package",
  },
  {
    name: "Anime.js",
    description:
      "A lightweight JavaScript animation engine for CSS properties, SVG, DOM attributes, timelines, and draggable interactions.",
    websiteUrl: "https://animejs.com/",
    githubRepo: "juliangarnier/anime",
    collection: "motion",
    bestFor: "Flexible web animation",
    framework: "JavaScript and web",
    styling: "Animation APIs",
    ownership: "Installed package",
  },
  {
    name: "Motion Primitives",
    description:
      "A collection of animated React components and motion patterns for expressive interfaces and product moments.",
    websiteUrl: "https://motion-primitives.com/",
    githubRepo: "ibelick/motion-primitives",
    collection: "motion",
    bestFor: "Polished interface motion",
    framework: "React",
    styling: "Tailwind CSS and Motion",
    ownership: "Copy source into project",
    featured: true,
  },
  {
    name: "21st.dev",
    description:
      "A community-driven registry of shadcn-compatible components, blocks, and interface ideas for React projects.",
    websiteUrl: "https://21st.dev/",
    collection: "copy-paste",
    bestFor: "Discovering community components",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "shadcnblocks",
    description:
      "A large collection of shadcn/ui blocks for assembling marketing pages, dashboards, and application shells.",
    websiteUrl: "https://www.shadcnblocks.com/",
    githubRepo: "shadcnblocks/shadcn-ui-blocks",
    collection: "copy-paste",
    bestFor: "Page sections and starter layouts",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Intent UI",
    description:
      "Copy-and-paste React components built on React Aria Components and Tailwind CSS with accessible behavior and flexible styling.",
    websiteUrl: "https://intentui.com/",
    githubRepo: "irsyadadl/intentui",
    collection: "copy-paste",
    bestFor: "Accessible shadcn-style interfaces",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "ReUI",
    description:
      "A design-forward shadcn/ui platform with reusable React and Tailwind components, blocks, and patterns for production interfaces.",
    websiteUrl: "https://reui.io/",
    githubRepo: "keenthemes/reui",
    collection: "tailwind",
    bestFor: "React and Tailwind product UI",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Blocks.so",
    description:
      "Open-source website blocks designed for installation into shadcn/ui projects through a registry workflow.",
    websiteUrl: "https://blocks.so/",
    collection: "copy-paste",
    bestFor: "Open-source landing page blocks",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Coss UI",
    description:
      "Copy-paste components built on Base UI for teams that want polished patterns with a modern primitive layer.",
    websiteUrl: "https://coss.com/ui",
    githubRepo: "cosscom/ui",
    collection: "copy-paste",
    bestFor: "Base UI component composition",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Torph",
    description:
      "A dependency-free animated text component for morphing labels, numbers, and changing interface copy.",
    websiteUrl: "https://torph.lochie.me/",
    githubRepo: "lochie/torph",
    collection: "motion",
    bestFor: "Animated text transitions",
    framework: "React, Vue, Svelte, and web",
    styling: "Component styles",
    ownership: "Installed package",
  },
  {
    name: "Transitions.dev",
    description:
      "A library of crafted CSS and React motion patterns for cards, modals, menus, text, and interface state changes.",
    websiteUrl: "https://transitions.dev/",
    githubRepo: "Jakubantalik/transitions.dev",
    collection: "motion",
    bestFor: "Production-ready UI transitions",
    framework: "CSS and React",
    styling: "CSS and Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "loading.dev",
    description:
      "A lightweight React library of polished loading indicators, spinners, and reduced-motion-aware loaders.",
    websiteUrl: "https://loading.dev/",
    githubRepo: "jakubkrehel/loading",
    collection: "motion",
    bestFor: "Loading indicators and spinners",
    framework: "React",
    styling: "Component styles",
    ownership: "Installed package",
  },
  {
    name: "Aceternity UI",
    description:
      "Animated React and Tailwind components for landing pages, hero sections, backgrounds, and visual storytelling.",
    websiteUrl: "https://ui.aceternity.com/",
    collection: "motion",
    bestFor: "High-impact landing pages",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
    featured: true,
  },
  {
    name: "Magic UI",
    description:
      "Animated components and effects for building distinctive marketing pages with React and Tailwind CSS.",
    websiteUrl: "https://magicui.design/",
    githubRepo: "magicuidesign/magicui",
    collection: "motion",
    bestFor: "Marketing page effects",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "React Bits",
    description:
      "Creative, animated React components for text, backgrounds, interactions, and memorable frontend details.",
    websiteUrl: "https://www.reactbits.dev/",
    collection: "motion",
    bestFor: "Creative interaction details",
    framework: "React",
    styling: "CSS and Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Fancy Components",
    description:
      "Playful React components and physics-inspired effects for interfaces that need a more expressive visual language.",
    websiteUrl: "https://www.fancycomponents.dev/",
    collection: "motion",
    bestFor: "Playful visual experiments",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "Cult UI",
    description:
      "Animated React components and interaction patterns for landing pages, portfolios, and product surfaces.",
    websiteUrl: "https://www.cult-ui.com/",
    collection: "motion",
    bestFor: "Distinctive landing pages",
    framework: "React",
    styling: "Tailwind CSS and Motion",
    ownership: "Copy source into project",
  },
  {
    name: "Number Flow",
    description:
      "Smooth animated number transitions for dashboards, counters, pricing, and data-rich interfaces.",
    websiteUrl: "https://number-flow.barvian.me/",
    githubRepo: "barvian/number-flow",
    collection: "motion",
    bestFor: "Animated metrics and counters",
    framework: "React and web",
    styling: "Component styles",
    ownership: "Installed package",
  },
  {
    name: "Tweakpane",
    description:
      "A compact, dependency-free control pane for fine-tuning parameters and monitoring values in interactive experiences.",
    websiteUrl: "https://tweakpane.github.io/docs/",
    githubRepo: "cocopon/tweakpane",
    collection: "production",
    bestFor: "Interactive controls and creative tools",
    framework: "JavaScript and web",
    styling: "Component styles",
    ownership: "Installed package",
  },
  {
    name: "daisyUI",
    description:
      "A class-based component library that adds semantic component names and themes to Tailwind CSS projects.",
    websiteUrl: "https://daisyui.com/",
    githubRepo: "saadeghi/daisyui",
    collection: "tailwind",
    bestFor: "Fast Tailwind prototypes",
    framework: "HTML and frontend frameworks",
    styling: "Tailwind CSS classes",
    ownership: "Installed plugin",
  },
  {
    name: "Flowbite",
    description:
      "A broad Tailwind CSS component system with interactive patterns, documentation, and framework integrations.",
    websiteUrl: "https://flowbite.com/",
    githubRepo: "themesberg/flowbite",
    collection: "tailwind",
    bestFor: "Tailwind application UI",
    framework: "HTML, React, Vue, and more",
    styling: "Tailwind CSS classes",
    ownership: "Installed package",
  },
  {
    name: "Preline UI",
    description:
      "A Tailwind CSS component library with practical patterns for dashboards, marketing pages, and complex interfaces.",
    websiteUrl: "https://preline.co/",
    githubRepo: "htmlstreamofficial/preline",
    collection: "tailwind",
    bestFor: "Dashboards and marketing UI",
    framework: "HTML and frontend frameworks",
    styling: "Tailwind CSS classes",
    ownership: "Installed plugin",
  },
  {
    name: "TailGrids",
    description:
      "A collection of responsive Tailwind CSS components and blocks for landing pages, applications, and admin panels.",
    websiteUrl: "https://tailgrids.com/",
    githubRepo: "TailGrids/tailgrids",
    collection: "tailwind",
    bestFor: "Responsive page blocks",
    framework: "HTML and frontend frameworks",
    styling: "Tailwind CSS classes",
    ownership: "Copy source into project",
  },
  {
    name: "prompt-kit",
    description:
      "React components for chat, prompts, messages, and AI interfaces built around modern generative UI patterns.",
    websiteUrl: "https://www.prompt-kit.com/",
    collection: "generative-ui",
    bestFor: "Chat and AI interfaces",
    githubRepo: "ibelick/prompt-kit",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
    featured: true,
  },
  {
    name: "Beautiful UI",
    description:
      "AI-native React primitives for loading states, thinking traces, streaming text, approvals, tools, and structured outputs.",
    websiteUrl: "https://www.beautifului.dev/",
    githubRepo: "TurboKach/ai-native-react-components",
    collection: "generative-ui",
    bestFor: "AI-native interface primitives",
    framework: "React",
    styling: "Tailwind CSS",
    ownership: "Copy source into project",
  },
  {
    name: "AICSS",
    description:
      "React, Vue, and Svelte components for AI agent conversations, including thinking states, tool calls, and streaming output.",
    websiteUrl: "https://aicss.dev/",
    githubRepo: "kvnkld/aicss",
    collection: "generative-ui",
    bestFor: "AI agent conversations",
    framework: "React, Vue, and Svelte",
    styling: "CSS and component styles",
    ownership: "Installed package and source",
  },
  {
    name: "CopilotKit",
    description:
      "A frontend stack for agent-native applications with chat, shared state, human-in-the-loop workflows, and generative UI.",
    websiteUrl: "https://www.copilotkit.ai/",
    githubRepo: "CopilotKit/CopilotKit",
    collection: "generative-ui",
    bestFor: "Agent-native applications",
    framework: "React, Angular, Vue, and more",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "assistant-ui",
    description:
      "Composable React primitives for building AI chat experiences, assistants, and streaming message interfaces.",
    websiteUrl: "https://www.assistant-ui.com/",
    githubRepo: "assistant-ui/assistant-ui",
    collection: "generative-ui",
    bestFor: "Production AI assistants",
    framework: "React",
    styling: "Tailwind CSS and Radix UI",
    ownership: "Installed package and source",
  },
  {
    name: "React Flow",
    description:
      "A customizable React library for node-based editors, diagrams, workflows, and visual builders.",
    websiteUrl: "https://reactflow.dev/",
    githubRepo: "xyflow/xyflow",
    collection: "production",
    bestFor: "Node-based editors",
    framework: "React and Svelte",
    styling: "CSS and bring your own styles",
    ownership: "Installed package",
  },
  {
    name: "TanStack Table",
    description:
      "Headless table and datagrid logic for sorting, filtering, grouping, selection, and virtualization.",
    websiteUrl: "https://tanstack.com/table",
    githubRepo: "TanStack/table",
    collection: "primitives",
    bestFor: "Data grids and complex tables",
    framework: "React and more",
    styling: "Bring your own CSS",
    ownership: "Installed package",
  },
  {
    name: "Recharts",
    description:
      "A declarative React chart library built on SVG and D3 for dashboards, reports, and data-rich interfaces.",
    websiteUrl: "https://recharts.org/",
    githubRepo: "recharts/recharts",
    collection: "production",
    bestFor: "React charts and dashboards",
    framework: "React",
    styling: "Component props and CSS",
    ownership: "Installed package",
  },
  {
    name: "visx",
    description:
      "Low-level React visualization components that combine D3 calculations with composable, reusable SVG primitives.",
    websiteUrl: "https://visx.airbnb.tech/",
    githubRepo: "airbnb/visx",
    collection: "production",
    bestFor: "Custom React visualizations",
    framework: "React",
    styling: "SVG and bring your own styles",
    ownership: "Installed package",
  },
  {
    name: "Tremor",
    description:
      "Copy-and-paste React and Tailwind components for accessible dashboards, charts, data tables, and analytics interfaces.",
    websiteUrl: "https://www.tremor.so/",
    githubRepo: "tremorlabs/tremor",
    collection: "production",
    bestFor: "Dashboards and data interfaces",
    framework: "React",
    styling: "Tailwind CSS and Radix UI",
    ownership: "Copy source into project",
  },
  {
    name: "Sandpack",
    description:
      "A component toolkit for building live-running code editors, previews, and interactive documentation experiences.",
    websiteUrl: "https://sandpack.codesandbox.io/",
    githubRepo: "codesandbox/sandpack",
    collection: "production",
    bestFor: "Live code playgrounds",
    framework: "React and web",
    styling: "Themes and bring your own CSS",
    ownership: "Installed package",
  },
];
