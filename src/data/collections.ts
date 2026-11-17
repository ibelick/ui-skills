export type CollectionSkill = {
  slug: string;
  pathSlug?: string;
  role: string;
};

export type Collection = {
  slug: string;
  title: string;
  keyword: string;
  seoTitle: string;
  cardDescription: string;
  metaDescription: string;
  intro: string;
  /** Ordered selection guidance, when a collection represents a workflow. */
  workflow?: { title: string; description: string }[];
  playbook: string[];
  skills: CollectionSkill[];
  agentCapabilities: string[];
  relatedSlugs: string[];
};

export const collections: Collection[] = [
  {
    slug: "mobile-app-design",
    title: "Mobile App Design",
    keyword: "mobile app design",
    seoTitle: "Mobile app design UI patterns | UI Skills",
    cardDescription:
      "Improve mobile screens with better hierarchy, touch targets, accessible controls, and restrained motion.",
    metaDescription:
      "Explore UI skills for mobile app design, including touch targets, screen hierarchy, accessibility, responsive layouts, and motion.",
    intro:
      "Use practical UI skills to improve mobile app screens, from touch comfort and screen hierarchy to accessible controls and responsive motion.",
    playbook: [
      "use-large-touch-targets",
      "inset-primary-actions",
      "give-targets-breathing-room",
      "keep-secondary-text-readable",
      "use-structural-skeletons",
      "show-visible-focus-rings",
    ],
    skills: [
      {
        slug: "swiftui-ui-patterns",
        pathSlug: "dimillian/swiftui-ui-patterns",
        role: "Use native SwiftUI patterns for mobile screens and navigation.",
      },
      {
        slug: "figma-swiftui",
        pathSlug: "figma/figma-swiftui",
        role: "Translate iOS and iPad interface direction into SwiftUI.",
      },
      {
        slug: "apple-web-app",
        pathSlug: "joe-bell/apple-web-app",
        role: "Handle Apple safe areas, installed web apps, icons, and system UI.",
      },
      {
        slug: "react-native-best-practices",
        pathSlug: "callstackincubator/react-native-best-practices",
        role: "Build performant React Native screens and interactions.",
      },
      {
        slug: "better-accessibility",
        pathSlug: "jakubkrehel/better-accessibility",
        role: "Make touch controls and mobile flows accessible.",
      },
      {
        slug: "interaction-design",
        pathSlug: "wshobson/interaction-design",
        role: "Design clear mobile feedback and interaction behavior.",
      },
      {
        slug: "accessible-animation",
        pathSlug: "iart-ai/accessible-animation",
        role: "Respect reduced-motion preferences in mobile transitions.",
      },
      {
        slug: "improve-ui",
        pathSlug: "ibelick/improve-ui",
        role: "Prioritize the highest-impact improvements on a mobile screen.",
      },
    ],
    agentCapabilities: [
      "Review mobile screens for hierarchy, spacing, touch targets, accessibility, and motion.",
      "Improve navigation, primary actions, and feedback for smaller screens.",
      "Apply comfortable, responsive patterns across mobile flows.",
      "Generate mobile frontend code with an intentional visual direction.",
    ],
    relatedSlugs: [
      "button-design",
      "form-design",
      "website-navigation-design",
      "visual-hierarchy",
    ],
  },
  {
    slug: "website-layout",
    title: "Website Layout",
    keyword: "website layout",
    seoTitle: "Website layout for clear UI structure | UI Skills",
    cardDescription:
      "Build clearer website layouts with stronger hierarchy, spacing, responsive structure, and stable content flow.",
    metaDescription:
      "Learn practical UI skills for website layout, including composition, spacing, responsive structure, hierarchy, and layout stability.",
    intro:
      "Build clearer website layouts with practical guidance for composition, spacing, responsive structure, hierarchy, and stable content flow.",
    playbook: [
      "group-with-space-not-lines",
      "reserve-space-with-aspect-ratio",
      "cap-line-length",
      "use-text-balance",
      "clamp-overflowing-titles",
      "give-targets-breathing-room",
    ],
    skills: [
      {
        slug: "layout",
        pathSlug: "pbakaus/layout",
        role: "Strengthen composition, spacing, and page rhythm.",
      },
      {
        slug: "better-layout",
        pathSlug: "jakubkrehel/better-layout",
        role: "Build responsive structure and clear content grouping.",
      },
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Turn a layout direction into a polished interface.",
      },
      {
        slug: "swiss-design",
        pathSlug: "zeke/swiss-design",
        role: "Use disciplined grids, typography, and editorial composition.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review responsive behavior and interface quality.",
      },
      {
        slug: "frontend-ui-engineering",
        pathSlug: "addyosmani/frontend-ui-engineering",
        role: "Implement maintainable responsive UI structures.",
      },
    ],
    agentCapabilities: [
      "Diagnose weak composition, spacing, alignment, and content flow.",
      "Rework page layouts while preserving the existing content and purpose.",
      "Apply responsive structure across desktop, tablet, and mobile views.",
      "Generate frontend layouts that follow a clear visual system.",
    ],
    relatedSlugs: [
      "visual-hierarchy",
      "landing-page-design",
      "dashboard-ui",
      "design-principles",
    ],
  },
  {
    slug: "visual-hierarchy",
    title: "Visual Hierarchy",
    keyword: "visual hierarchy",
    seoTitle: "Visual hierarchy in UI design | UI Skills",
    cardDescription:
      "Make interfaces easier to scan with better type, spacing, contrast, emphasis, and content order.",
    metaDescription:
      "Improve visual hierarchy in UI design with practical guidance for typography, spacing, contrast, emphasis, and content order.",
    intro:
      "Make interfaces easier to scan by strengthening typography, spacing, contrast, emphasis, and the order in which content is understood.",
    playbook: [
      "use-text-balance",
      "tighten-heading-line-height",
      "keep-secondary-text-readable",
      "limit-accent-color-usage",
      "cap-line-length",
      "use-sentence-case-labels",
    ],
    skills: [
      {
        slug: "better-typography",
        pathSlug: "jakubkrehel/better-typography",
        role: "Create clearer type hierarchy and reading rhythm.",
      },
      {
        slug: "swiss-design",
        pathSlug: "zeke/swiss-design",
        role: "Use grid and editorial structure to reinforce hierarchy.",
      },
      {
        slug: "typeset",
        pathSlug: "pbakaus/typeset",
        role: "Strengthen typography systems and reading cadence.",
      },
      {
        slug: "refactoring-ui",
        pathSlug: "s0xdk/refactoring-ui",
        role: "Tune spacing, type, color, shadow, and depth relationships.",
      },
      {
        slug: "improve-ui",
        pathSlug: "ibelick/improve-ui",
        role: "Identify verified hierarchy problems before changing code.",
      },
      {
        slug: "ui-ux-pro-max",
        pathSlug: "nextlevelbuilder/ui-ux-pro-max",
        role: "Explore stronger visual directions for complex interfaces.",
      },
    ],
    agentCapabilities: [
      "Find unclear emphasis, weak contrast, type scale problems, and crowded layouts.",
      "Improve how users scan and understand interface content.",
      "Establish a clearer order between headings, supporting text, and actions.",
      "Make important information and decisions easier to find.",
    ],
    relatedSlugs: [
      "website-layout",
      "design-principles",
      "ui-design-tips",
      "landing-page-design",
    ],
  },
  {
    slug: "design-principles",
    title: "Design Principles",
    keyword: "design principles",
    seoTitle: "Design principles for practical UI | UI Skills",
    cardDescription:
      "Apply design principles that improve clarity, consistency, usability, visual balance, and accessibility.",
    metaDescription:
      "Apply practical design principles to UI with guidance for clarity, consistency, usability, visual balance, and accessibility.",
    intro:
      "Apply practical design principles to make interfaces clearer, more consistent, easier to use, visually balanced, and accessible.",
    playbook: [
      "group-with-space-not-lines",
      "pair-status-with-labels",
      "use-concentric-border-radius",
      "reserve-brand-color-for-links",
      "show-visible-focus-rings",
      "use-sentence-case-labels",
    ],
    skills: [
      {
        slug: "baseline-ui",
        pathSlug: "ibelick/baseline-ui",
        role: "Apply dependable interface conventions during implementation.",
      },
      {
        slug: "better-interface",
        pathSlug: "jakubkrehel/better-interface",
        role: "Improve the foundations of usability and visual quality.",
      },
      {
        slug: "refactoring-ui",
        pathSlug: "s0xdk/refactoring-ui",
        role: "Apply concrete heuristics for spacing, type, color, and depth.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Apply practical interface and accessibility standards.",
      },
      {
        slug: "wcag-audit-patterns",
        pathSlug: "wshobson/wcag-audit-patterns",
        role: "Make accessibility a core part of interface design.",
      },
      {
        slug: "distill",
        pathSlug: "pbakaus/distill",
        role: "Simplify noisy interfaces without losing useful structure.",
      },
    ],
    agentCapabilities: [
      "Evaluate interfaces for clarity, consistency, usability, and accessibility.",
      "Turn broad design principles into specific implementation decisions.",
      "Resolve visual inconsistencies without adding unnecessary complexity.",
      "Guide new UI work with practical, repeatable principles.",
    ],
    relatedSlugs: [
      "visual-hierarchy",
      "ui-design-tips",
      "design-system-guidelines",
      "website-layout",
    ],
  },
  {
    slug: "landing-page-design",
    title: "Landing Page Design",
    keyword: "landing page design",
    seoTitle: "Landing page design UI patterns | UI Skills",
    cardDescription:
      "Design landing pages with clear messaging, focused hierarchy, responsive sections, and stronger conversion paths.",
    metaDescription:
      "Explore landing page design skills for messaging, hero sections, visual hierarchy, responsive layouts, trust, and conversion flow.",
    intro:
      "Design landing pages around clear messaging, focused hierarchy, responsive sections, trust signals, and a deliberate conversion path.",
    playbook: [
      "use-text-balance",
      "reserve-space-with-aspect-ratio",
      "stagger-infrequent-entrances",
      "avoid-glow-primary-actions",
      "cap-line-length",
      "reserve-brand-color-for-links",
    ],
    skills: [
      {
        slug: "landing-page",
        pathSlug: "mengto/landing-page",
        role: "Build a landing page around hierarchy and conversion flow.",
      },
      {
        slug: "landing-page-design",
        pathSlug: "elayadesign/landing-page-design",
        role: "Plan conversion copy, SEO, and visual system together.",
      },
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Implement a polished, distinctive frontend surface.",
      },
      {
        slug: "compact-landing",
        pathSlug: "danilaa1/compact-landing",
        role: "Keep landing pages focused and low-noise.",
      },
      {
        slug: "better-layout",
        pathSlug: "jakubkrehel/better-layout",
        role: "Keep page sections composed and easy to scan.",
      },
      {
        slug: "shape",
        pathSlug: "pbakaus/shape",
        role: "Plan feature UX before committing to the page structure.",
      },
    ],
    agentCapabilities: [
      "Improve hero messaging, page hierarchy, spacing, trust, and calls to action.",
      "Shape sections around a clearer visitor journey.",
      "Strengthen responsive composition and conversion flow.",
      "Generate landing page code that matches the intended direction.",
    ],
    relatedSlugs: [
      "website-layout",
      "pricing-page-design",
      "visual-hierarchy",
      "ai-generated-ui",
    ],
  },
  {
    slug: "button-design",
    title: "Button Design",
    keyword: "button design",
    seoTitle: "Button design and interaction states | UI Skills",
    cardDescription:
      "Design buttons with clear priority, comfortable targets, accessible states, and useful interaction feedback.",
    metaDescription:
      "Improve button design with guidance for hierarchy, touch targets, focus states, feedback, accessibility, and interaction quality.",
    intro:
      "Design buttons with clear priority, comfortable targets, accessible focus and loading states, and feedback that matches the action.",
    playbook: [
      "use-large-touch-targets",
      "add-scale-on-press",
      "avoid-glow-primary-actions",
      "show-visible-focus-rings",
      "give-targets-breathing-room",
      "animate-icon-state-changes",
    ],
    skills: [
      {
        slug: "better-accessibility",
        pathSlug: "jakubkrehel/better-accessibility",
        role: "Improve hit areas, keyboard access, and button states.",
      },
      {
        slug: "interaction-design",
        pathSlug: "wshobson/interaction-design",
        role: "Design press, hover, loading, and feedback behavior.",
      },
      {
        slug: "fixing-accessibility",
        pathSlug: "ibelick/fixing-accessibility",
        role: "Audit focus, keyboard, and ARIA behavior.",
      },
      {
        slug: "micro-interaction",
        pathSlug: "iart-ai/micro-interaction",
        role: "Add concise feedback for button state changes.",
      },
      {
        slug: "build-primitive",
        pathSlug: "prototyperai/build-primitive",
        role: "Build robust, accessible button primitives.",
      },
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Give button priority and polish a clear visual treatment.",
      },
    ],
    agentCapabilities: [
      "Diagnose unclear button priority, sizing, contrast, and interaction feedback.",
      "Define useful hover, focus, loading, disabled, and pressed states.",
      "Improve touch targets and keyboard accessibility.",
      "Apply button patterns consistently across a product.",
    ],
    relatedSlugs: [
      "form-design",
      "website-navigation-design",
      "mobile-app-design",
      "design-principles",
    ],
  },
  {
    slug: "form-design",
    title: "Form Design",
    keyword: "form design",
    seoTitle: "Form design for usable interfaces | UI Skills",
    cardDescription:
      "Create forms with visible labels, clear validation, accessible controls, and focused submission actions.",
    metaDescription:
      "Improve form design with practical UI skills for labels, validation, keyboard access, touch comfort, errors, and recovery.",
    intro:
      "Create forms that are easier to complete with visible labels, clear validation, accessible controls, and focused recovery from errors.",
    playbook: [
      "label-every-form-field",
      "show-errors-beside-fields",
      "use-large-touch-targets",
      "show-visible-focus-rings",
      "pair-status-with-labels",
      "use-sentence-case-labels",
    ],
    skills: [
      {
        slug: "fixing-accessibility",
        pathSlug: "ibelick/fixing-accessibility",
        role: "Fix labels, focus management, and form errors.",
      },
      {
        slug: "better-accessibility",
        pathSlug: "jakubkrehel/better-accessibility",
        role: "Improve inclusive form behavior and touch comfort.",
      },
      {
        slug: "wcag-audit-patterns",
        pathSlug: "wshobson/wcag-audit-patterns",
        role: "Audit form patterns against accessibility standards.",
      },
      {
        slug: "build-primitive",
        pathSlug: "prototyperai/build-primitive",
        role: "Build stateful, accessible form controls.",
      },
      {
        slug: "micro-interaction",
        pathSlug: "iart-ai/micro-interaction",
        role: "Design clear validation and submission feedback.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review form usability and responsive behavior.",
      },
      {
        slug: "clarify",
        pathSlug: "pbakaus/clarify",
        role: "Write clearer labels, instructions, and validation messages.",
      },
      {
        slug: "audit-and-fix",
        pathSlug: "accesslint/audit-and-fix",
        role: "Audit and remediate accessibility issues in form controls.",
      },
    ],
    agentCapabilities: [
      "Find problems with labels, grouping, validation, focus, and error recovery.",
      "Make complex forms easier to understand and complete.",
      "Improve keyboard, touch, and screen-reader interactions.",
      "Implement clear field, submission, and feedback states.",
    ],
    relatedSlugs: [
      "button-design",
      "mobile-app-design",
      "empty-state-design",
      "design-principles",
    ],
  },
  {
    slug: "videos",
    title: "Videos",
    keyword: "product videos",
    seoTitle: "Product videos, launch films, and motion graphics | UI Skills",
    cardDescription:
      "Ship product launch videos, social motion ads, HyperFrames clips, and Remotion films with agent skills built for design engineers.",
    metaDescription:
      "Product videos and launch films for SaaS and frontend teams: HyperFrames HTML-to-MP4, Remotion render pipelines, motion-graphics overlays, brag launch cuts, shotcraft promos, and Lottie motion.",
    intro:
      "Build product videos when static UI is not enough — launch films, paid social motion ads, demo reels, and short shareable cuts. These skills cover HyperFrames and Remotion pipelines, story beats, motion overlays, UI capture, and export-ready MP4 output.",
    playbook: [
      "use-structural-skeletons",
      "use-ease-out-on-enter",
      "stagger-infrequent-entrances",
      "keep-exits-subtle",
      "use-interruptible-transitions",
      "restrain-high-frequency-motion",
    ],
    skills: [
      {
        slug: "hyperframes",
        pathSlug: "heygen-com/hyperframes",
        role: "Start HyperFrames workflows for HTML/GSAP compositions rendered to MP4.",
      },
      {
        slug: "video-shotcraft",
        pathSlug: "vincentwei1021/video-shotcraft",
        role: "Build cinematic product videos from shot cards and real UI captures.",
      },
      {
        slug: "product-launch-video",
        pathSlug: "memex-lab/product-launch-video",
        role: "Storyboard and build spectacular Remotion launch and promo films.",
      },
      {
        slug: "product-film",
        pathSlug: "rieranthony/product-film",
        role: "Build showreel-grade product films in Remotion from the real design system.",
      },
      {
        slug: "blueprint-animation",
        pathSlug: "moguzbulbul/blueprint-animation",
        role: "Animate a single screen to explain UX decisions step by step for case studies.",
      },
      {
        slug: "motion-ad",
        pathSlug: "danny/motion-ad",
        role: "Render short motion-graphics ads for social as MP4 from GSAP timelines.",
      },
      {
        slug: "motion-graphics",
        pathSlug: "heygen-com/motion-graphics",
        role: "Design kinetic type, stats, and lower-third overlays in HyperFrames.",
      },
      {
        slug: "remotion-to-hyperframes",
        pathSlug: "heygen-com/remotion-to-hyperframes",
        role: "Port Remotion source to HyperFrames when migrating stacks.",
      },
      {
        slug: "remotion-best-practices",
        pathSlug: "remotion-dev/remotion-best-practices",
        role: "Apply Remotion patterns for React-based video composition.",
      },
      {
        slug: "remotion-create",
        pathSlug: "remotion-dev/remotion-create",
        role: "Scaffold new Remotion video projects.",
      },
      {
        slug: "remotion-render",
        pathSlug: "remotion-dev/remotion-render",
        role: "Export finished Remotion compositions to video.",
      },
      {
        slug: "brag",
        pathSlug: "latent-spaces/brag",
        role: "Turn a shipped project into a launch video with motion and music.",
      },
      {
        slug: "brag-slim",
        pathSlug: "latent-spaces/brag-slim",
        role: "Produce a lightweight launch cut without bundled asset dependencies.",
      },
      {
        slug: "3dicon",
        pathSlug: "samyost1/3dicon",
        role: "Animate icons into transparent looping WebP assets.",
      },
      {
        slug: "text-to-lottie",
        pathSlug: "diffusionstudio/text-to-lottie",
        role: "Generate polished Lottie motion from text prompts.",
      },
      {
        slug: "scroll-world",
        pathSlug: "oso95/scroll-world",
        role: "Build scroll-scrubbed cinematic landing experiences with generated scenes.",
      },
      {
        slug: "video-interaction-mapper",
        pathSlug: "figma/video-interaction-mapper",
        role: "Map interaction intent from reference video into implementable motion.",
      },
      {
        slug: "screenshot",
        pathSlug: "danny/screenshot",
        role: "Capture UI frames from live pages for review and compositing.",
      },
    ],
    agentCapabilities: [
      "Plan product launch videos and social cuts with clear story beats and brand constraints.",
      "Render HyperFrames HTML/GSAP compositions and Remotion React timelines to MP4.",
      "Build launch films, motion overlays, and shotcraft promos from live product UI.",
      "Port between Remotion and HyperFrames when a stack migration is required.",
      "Generate Lottie, scroll-scrub, and looping icon motion for marketing surfaces.",
    ],
    relatedSlugs: [
      "landing-page-design",
      "ai-generated-ui",
      "visual-hierarchy",
      "website-layout",
    ],
  },
  {
    slug: "dashboard-ui",
    title: "Dashboard UI",
    keyword: "dashboard ui",
    seoTitle: "Dashboard UI layout and data hierarchy | UI Skills",
    cardDescription:
      "Design dashboards with scannable data, balanced density, clear hierarchy, and resilient interface states.",
    metaDescription:
      "Explore dashboard UI skills for data hierarchy, information density, navigation, readability, loading states, and empty states.",
    intro:
      "Design dashboard UI that makes dense information easier to scan through stronger data hierarchy, balanced density, navigation, and resilient states.",
    playbook: [
      "use-tabular-nums-for-data",
      "clamp-overflowing-titles",
      "group-with-space-not-lines",
      "use-structural-skeletons",
      "give-empty-states-one-action",
      "use-sentence-case-labels",
    ],
    skills: [
      {
        slug: "better-layout",
        pathSlug: "jakubkrehel/better-layout",
        role: "Organize dense information without making it feel crowded.",
      },
      {
        slug: "interface-design",
        pathSlug: "dammyjay93/interface-design",
        role: "Structure dashboards, admin panels, and SaaS interfaces.",
      },
      {
        slug: "harden",
        pathSlug: "pbakaus/harden",
        role: "Cover loading, error, and empty states before launch.",
      },
      {
        slug: "ui-ux-pro-max",
        pathSlug: "nextlevelbuilder/ui-ux-pro-max",
        role: "Improve professional dashboard patterns and workflows.",
      },
      {
        slug: "lieflat-charts",
        pathSlug: "larashero3-dotcom/lieflat-charts",
        role: "Present data visualizations clearly inside reports and dashboards.",
      },
      {
        slug: "frontend-ui-engineering",
        pathSlug: "addyosmani/frontend-ui-engineering",
        role: "Implement responsive and maintainable dashboard surfaces.",
      },
    ],
    agentCapabilities: [
      "Organize dense information into clearer data and navigation hierarchies.",
      "Improve readability across tables, metrics, filters, and controls.",
      "Design resilient loading, empty, error, and overflow states.",
      "Generate dashboard layouts that remain usable across screen sizes.",
    ],
    relatedSlugs: [
      "website-layout",
      "empty-state-design",
      "visual-hierarchy",
      "design-system-guidelines",
    ],
  },
  {
    slug: "pricing-page-design",
    title: "Pricing Page Design",
    keyword: "pricing page design",
    seoTitle: "Pricing page design for clear decisions | UI Skills",
    cardDescription:
      "Make pricing pages easier to compare with clearer plans, readable details, and focused conversion paths.",
    metaDescription:
      "Improve pricing page design with UI patterns for plan comparison, price clarity, trust, responsive reading, and conversion.",
    intro:
      "Make pricing pages easier to understand and compare with clear plan structure, readable details, trust signals, and focused actions.",
    playbook: [
      "use-tabular-nums-for-data",
      "group-with-space-not-lines",
      "reserve-brand-color-for-links",
      "cap-line-length",
      "use-text-balance",
      "avoid-glow-primary-actions",
    ],
    skills: [
      {
        slug: "pricing-page",
        pathSlug: "mengto/pricing-page",
        role: "Structure plans around comparison and conversion.",
      },
      {
        slug: "landing-page-design",
        pathSlug: "elayadesign/landing-page-design",
        role: "Strengthen pricing messaging, trust, and conversion flow.",
      },
      {
        slug: "better-typography",
        pathSlug: "jakubkrehel/better-typography",
        role: "Make prices, features, and terms easier to compare.",
      },
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Implement a polished pricing surface with clear hierarchy.",
      },
      {
        slug: "clarify",
        pathSlug: "pbakaus/clarify",
        role: "Write clear plan names, feature descriptions, and CTAs.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review responsive comparison and usability.",
      },
      {
        slug: "improve-ui",
        pathSlug: "ibelick/improve-ui",
        role: "Prioritize the highest-impact pricing page improvements.",
      },
      {
        slug: "compact-landing",
        pathSlug: "danilaa1/compact-landing",
        role: "Keep pricing layouts focused with clear CTA hierarchy.",
      },
    ],
    agentCapabilities: [
      "Clarify plan differences, pricing, feature comparison, and recommended choices.",
      "Reduce friction in the path from evaluation to sign-up.",
      "Improve responsive comparison without hiding important details.",
      "Build pricing interfaces with clear hierarchy and trustworthy presentation.",
    ],
    relatedSlugs: [
      "landing-page-design",
      "website-layout",
      "button-design",
      "visual-hierarchy",
    ],
  },
  {
    slug: "website-navigation-design",
    title: "Website Navigation Design",
    keyword: "website navigation design",
    seoTitle: "Website navigation design patterns | UI Skills",
    cardDescription:
      "Create predictable navigation with clear destinations, responsive menus, accessible focus, and easy wayfinding.",
    metaDescription:
      "Improve website navigation design with practical patterns for menus, wayfinding, keyboard access, focus, and responsive behavior.",
    intro:
      "Create website navigation with clear destinations, predictable menus, accessible keyboard and focus behavior, and reliable wayfinding.",
    playbook: [
      "show-visible-focus-rings",
      "anchor-popovers-to-triggers",
      "fade-menus-out",
      "fade-scroll-edges",
      "use-large-touch-targets",
      "use-interruptible-transitions",
    ],
    skills: [
      {
        slug: "interaction-design",
        pathSlug: "wshobson/interaction-design",
        role: "Design clear navigation behavior and feedback.",
      },
      {
        slug: "fixing-accessibility",
        pathSlug: "ibelick/fixing-accessibility",
        role: "Audit focus, keyboard navigation, and menu semantics.",
      },
      {
        slug: "better-layout",
        pathSlug: "jakubkrehel/better-layout",
        role: "Give navigation controls a clear spatial structure.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review wayfinding, active states, and responsive menus.",
      },
      {
        slug: "apple-web-app",
        pathSlug: "joe-bell/apple-web-app",
        role: "Handle navigation for installed Apple web-app experiences.",
      },
      {
        slug: "adapt",
        pathSlug: "pbakaus/adapt",
        role: "Adapt navigation patterns across device contexts.",
      },
    ],
    agentCapabilities: [
      "Identify confusing menus, unclear destinations, and inconsistent active states.",
      "Improve wayfinding across desktop and mobile navigation.",
      "Design predictable keyboard, focus, menu, and responsive behavior.",
      "Apply navigation patterns that scale as the site grows.",
    ],
    relatedSlugs: [
      "button-design",
      "website-layout",
      "mobile-app-design",
      "form-design",
    ],
  },
  {
    slug: "ai-generated-ui",
    title: "AI Generated UI",
    keyword: "ai generated ui",
    seoTitle: "AI generated UI refinement skills | UI Skills",
    cardDescription:
      "Turn AI-generated interface concepts into consistent, distinctive, accessible, production-ready UI.",
    metaDescription:
      "Refine AI generated UI with skills for visual direction, prompt quality, design consistency, accessibility, and production readiness.",
    intro:
      "Turn AI-generated UI concepts into usable products by improving visual direction, consistency, accessibility, and production readiness.",
    playbook: [
      "limit-accent-color-usage",
      "use-concentric-border-radius",
      "use-text-balance",
      "use-structural-skeletons",
      "avoid-glow-primary-actions",
      "use-shadow-for-elevation",
    ],
    skills: [
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Create distinctive UI without settling for generic output.",
      },
      {
        slug: "design-first-ui-prompting",
        pathSlug: "mengto/design-first-ui-prompting",
        role: "Turn a product goal into a constrained visual direction.",
      },
      {
        slug: "ui-ux-pro-max",
        pathSlug: "nextlevelbuilder/ui-ux-pro-max",
        role: "Explore visual systems, styles, and interface directions.",
      },
      {
        slug: "variant",
        pathSlug: "jakubkrehel/variant",
        role: "Compare genuinely different interface directions.",
      },
      {
        slug: "design-lab",
        pathSlug: "0xdesign/design-lab",
        role: "Use feedback-driven exploration to refine generated UI.",
      },
      {
        slug: "improve-ui",
        pathSlug: "ibelick/improve-ui",
        role: "Critique generated UI against product evidence.",
      },
      {
        slug: "shape",
        pathSlug: "pbakaus/shape",
        role: "Turn rough concepts into clearer product UX plans.",
      },
      {
        slug: "taste-skill",
        pathSlug: "leonxlnx/taste-skill",
        role: "Push generated UI toward stronger visual judgment and craft.",
      },
    ],
    agentCapabilities: [
      "Critique generated interfaces for generic styling, inconsistency, and usability gaps.",
      "Turn rough concepts into coherent product screens.",
      "Apply a deliberate visual direction across generated components.",
      "Convert generated ideas into accessible, production-ready frontend code.",
    ],
    relatedSlugs: [
      "landing-page-design",
      "ui-design-tips",
      "design-system-guidelines",
      "visual-hierarchy",
      "deslop",
    ],
  },
  {
    slug: "ui-design-tips",
    title: "UI Design Tips",
    keyword: "ui design tips",
    seoTitle: "Practical UI design tips | UI Skills",
    cardDescription:
      "Improve everyday interface decisions across hierarchy, spacing, typography, accessibility, and visual polish.",
    metaDescription:
      "Get practical UI design tips for improving hierarchy, spacing, typography, accessibility, consistency, and interface polish.",
    intro:
      "Improve everyday interface decisions with practical guidance for hierarchy, spacing, typography, accessibility, consistency, and polish.",
    playbook: [
      "use-text-balance",
      "give-targets-breathing-room",
      "keep-secondary-text-readable",
      "use-shadow-for-elevation",
      "group-with-space-not-lines",
      "use-sentence-case-labels",
    ],
    skills: [
      {
        slug: "baseline-ui",
        pathSlug: "ibelick/baseline-ui",
        role: "Apply a concise baseline for everyday UI decisions.",
      },
      {
        slug: "better-interface",
        pathSlug: "jakubkrehel/better-interface",
        role: "Improve quality across the interface, not just one component.",
      },
      {
        slug: "polish",
        pathSlug: "pbakaus/polish",
        role: "Run a final pass for spacing, alignment, and consistency.",
      },
      {
        slug: "refactoring-ui",
        pathSlug: "s0xdk/refactoring-ui",
        role: "Apply practical heuristics for common visual problems.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review general UI quality and usability.",
      },
      {
        slug: "frontend-design",
        pathSlug: "anthropics/frontend-design",
        role: "Give everyday UI improvements a coherent visual direction.",
      },
    ],
    agentCapabilities: [
      "Diagnose everyday problems with spacing, typography, color, hierarchy, and polish.",
      "Prioritize the changes that will improve the interface most.",
      "Apply small, consistent refinements across components.",
      "Turn broad feedback into focused implementation tasks.",
    ],
    relatedSlugs: [
      "design-principles",
      "visual-hierarchy",
      "website-layout",
      "button-design",
    ],
  },
  {
    slug: "empty-state-design",
    title: "Empty State Design",
    keyword: "empty state design",
    seoTitle: "Empty state design patterns | UI Skills",
    cardDescription:
      "Design empty states that explain the situation and give users one clear, useful next action.",
    metaDescription:
      "Improve empty state design with UI guidance for messaging, onboarding, recovery, accessibility, and clear next actions.",
    intro:
      "Design empty states that explain the situation clearly, support recovery, and give users one useful next action.",
    playbook: [
      "give-empty-states-one-action",
      "use-structural-skeletons",
      "keep-secondary-text-readable",
      "show-visible-focus-rings",
      "use-large-touch-targets",
      "pair-status-with-labels",
    ],
    skills: [
      {
        slug: "harden",
        pathSlug: "pbakaus/harden",
        role: "Cover empty states, edge cases, and recovery paths.",
      },
      {
        slug: "better-writing",
        pathSlug: "jakubkrehel/better-writing",
        role: "Write helpful, concise empty-state copy.",
      },
      {
        slug: "baseline-ui",
        pathSlug: "ibelick/baseline-ui",
        role: "Keep the state focused on one useful action.",
      },
      {
        slug: "interaction-design",
        pathSlug: "wshobson/interaction-design",
        role: "Design useful recovery and feedback behavior.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Review state usability and accessibility.",
      },
      {
        slug: "ui-ux-pro-max",
        pathSlug: "nextlevelbuilder/ui-ux-pro-max",
        role: "Improve the visual composition of state-based UI.",
      },
    ],
    agentCapabilities: [
      "Clarify what an empty state means and what users can do next.",
      "Improve messaging, onboarding, recovery, and call-to-action placement.",
      "Design useful empty, loading, error, and first-use experiences.",
      "Give each state one clear and accessible next action.",
    ],
    relatedSlugs: [
      "form-design",
      "dashboard-ui",
      "ui-design-tips",
      "button-design",
    ],
  },
  {
    slug: "design-system-guidelines",
    title: "Design System Guidelines",
    keyword: "design system guidelines",
    seoTitle: "Design system guidelines for UI teams | UI Skills",
    cardDescription:
      "Create consistent design system guidelines for components, tokens, patterns, documentation, and implementation.",
    metaDescription:
      "Build design system guidelines with practical skills for tokens, components, documentation, consistency, governance, and scale.",
    intro:
      "Create design system guidelines that keep components, tokens, patterns, documentation, and implementation decisions consistent as the product grows.",
    playbook: [
      "use-concentric-border-radius",
      "reserve-brand-color-for-links",
      "match-icon-stroke-weight",
      "use-sentence-case-labels",
      "group-with-space-not-lines",
      "pair-status-with-labels",
    ],
    skills: [
      {
        slug: "design-system",
        pathSlug: "nextlevelbuilder/design-system",
        role: "Define tokens and component specifications.",
      },
      {
        slug: "create-design-md",
        pathSlug: "ibelick/create-design-md",
        role: "Document real design evidence from an existing product.",
      },
      {
        slug: "build-primitive",
        pathSlug: "prototyperai/build-primitive",
        role: "Build accessible, reusable component foundations.",
      },
      {
        slug: "frontend-ui-engineering",
        pathSlug: "addyosmani/frontend-ui-engineering",
        role: "Implement scalable UI patterns across a product.",
      },
      {
        slug: "shadcn",
        pathSlug: "shadcn-ui/shadcn",
        role: "Compose reusable components without losing consistency.",
      },
      {
        slug: "better-interface",
        pathSlug: "jakubkrehel/better-interface",
        role: "Review system output for consistency and quality.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Set cross-component interface and accessibility standards.",
      },
      {
        slug: "figma-generate-library",
        pathSlug: "figma/figma-generate-library",
        role: "Create tokens, variants, and reusable component libraries.",
      },
    ],
    agentCapabilities: [
      "Identify drift across tokens, components, patterns, and documentation.",
      "Extract design decisions from an existing interface.",
      "Apply consistent rules to new components and screens.",
      "Document guidelines that remain practical for implementation and scale.",
    ],
    relatedSlugs: [
      "design-principles",
      "ai-generated-ui",
      "ui-design-tips",
      "visual-hierarchy",
      "design-engineering",
      "web-development-best-practices",
    ],
  },
  {
    slug: "web-development-best-practices",
    title: "Web development best practices",
    keyword: "web development best practices",
    seoTitle:
      "Web development best practices: agent skills and checks | UI Skills",
    cardDescription:
      "Review semantic HTML, accessibility, performance, security, SEO, and browser behavior with a focused set of agent skills.",
    metaDescription:
      "Apply web development best practices with a practical review workflow and agent skills for semantic HTML, accessibility, performance, security, SEO, and testing.",
    intro:
      "Use this collection to review an existing website before shipping. Start with a quality audit, choose the skills that address its findings, and verify the changes in a real browser. These skills support a review; they do not replace security testing or guarantee compliance.",
    workflow: [
      {
        title: "Establish a baseline",
        description:
          "Start with web-quality-audit to identify issues and record evidence. Prioritize broken user journeys and high-impact findings rather than running every skill at once.",
      },
      {
        title: "Check structure and accessibility",
        description:
          "Use semantic-html-first for controls and document structure, then audit-and-fix for accessibility findings. Use web-design-guidelines when you also need an interface and usability review.",
      },
      {
        title: "Review loading and implementation risks",
        description:
          "Use web-perf to investigate loading and responsiveness with browser traces, and best-practices for security, compatibility, and code-quality checks. Measure again after making changes.",
      },
      {
        title: "Check search visibility and verify behavior",
        description:
          "Use fixing-metadata for titles, social previews, canonical URLs, and structured data. Use vitest for unit tests, playwright-cli for browser flows, and e2e for end-to-end tests on web and mobile written as plain-language steps. For interactive runtime investigation, browser-testing-with-devtools requires Chrome DevTools MCP.",
      },
    ],
    playbook: [
      "reserve-space-with-aspect-ratio",
      "show-visible-focus-rings",
      "label-every-form-field",
      "show-errors-beside-fields",
      "keep-secondary-text-readable",
      "use-structural-skeletons",
    ],
    skills: [
      {
        slug: "web-quality-audit",
        pathSlug: "addyosmani/web-quality-audit",
        role: "Start here to establish a baseline across performance, accessibility, best practices, and SEO.",
      },
      {
        slug: "semantic-html-first",
        pathSlug: "kemiljk/semantic-html-first",
        role: "Use when controls or custom components need the right HTML semantics and accessible behavior.",
      },
      {
        slug: "audit-and-fix",
        pathSlug: "accesslint/audit-and-fix",
        role: "Use to detect, prioritize, and fix accessibility violations in an existing interface.",
      },
      {
        slug: "web-perf",
        pathSlug: "elithrar/web-perf",
        role: "Use browser traces and network evidence to investigate loading, interaction latency, and layout shifts.",
      },
      {
        slug: "best-practices",
        pathSlug: "addyosmani/best-practices",
        role: "Use to review security, browser compatibility, and maintainability concerns in the implementation.",
      },
      {
        slug: "fixing-metadata",
        pathSlug: "ibelick/fixing-metadata",
        role: "Use before publishing to check titles, descriptions, canonical URLs, social previews, and structured data.",
      },
      {
        slug: "browser-testing-with-devtools",
        pathSlug: "addyosmani/browser-testing-with-devtools",
        role: "Use to verify key flows in a real browser and inspect runtime evidence. Requires Chrome DevTools MCP.",
      },
      {
        slug: "web-design-guidelines",
        pathSlug: "vercel-labs/web-design-guidelines",
        role: "Use to review interface usability, accessible interactions, and responsive behavior against web interface guidelines.",
      },
      {
        slug: "vitest",
        pathSlug: "antfu/vitest",
        role: "Use for unit tests, fixtures, mocks, and coverage in projects that use Vitest.",
      },
      {
        slug: "playwright-cli",
        pathSlug: "microsoft/playwright-cli",
        role: "Use for repeatable browser flows, test generation, and traces with the Playwright CLI.",
      },
      {
        slug: "e2e",
        pathSlug: "e2e-inc/e2e",
        role: "Use for end-to-end tests on web, iOS, and Android that mix plain-language agent steps with exact assertions.",
      },
    ],
    agentCapabilities: [
      "Establish a quality baseline and turn findings into prioritized changes.",
      "Review semantics, accessibility, loading performance, compatibility, and search metadata.",
      "Verify important browser flows and compare results after changes.",
    ],
    relatedSlugs: ["design-engineering", "form-design", "website-layout"],
  },
  {
    slug: "design-engineering",
    title: "Design engineering",
    keyword: "design engineering",
    seoTitle:
      "Design engineering skills: from design to production | UI Skills",
    cardDescription:
      "Translate design intent into working interfaces, define interaction behavior, and verify production quality.",
    metaDescription:
      "Explore design engineering agent skills for translating design intent into code, defining interactions, testing component states, accessibility, and motion.",
    intro:
      "Design engineering connects interface design with frontend implementation. Use these skills when a design needs to become a working product: preserve its intent, resolve behavior missing from mockups, and verify the result. Unlike a design-system collection, this workflow focuses on delivering a particular interface rather than governing a component library.",
    workflow: [
      {
        title: "Translate the design intent",
        description:
          "Use design-engineering to connect design decisions to production components. Use build-design to match a Figma file or design image, and figma-code-connect when design components need mappings to code. Use sync-figma-token when code tokens and Figma variables drift, and frontend-ui-engineering for responsive structure.",
      },
      {
        title: "Define behavior beyond the mockup",
        description:
          "Use interaction-contracts to specify triggers, state changes, interruption, persistence, and recovery. Use balise-ux-writing to make labels, errors, and feedback explain that behavior clearly.",
      },
      {
        title: "Inspect component states and motion",
        description:
          "Use component-canvas to compare existing live component variants. Use 60fps-animation to avoid layout thrashing and improve animation performance with compositor-friendly techniques.",
      },
      {
        title: "Prepare the interface for real use",
        description:
          "Use fixing-accessibility for keyboard, focus, labels, and form issues, then harden for empty states, errors, edge cases, and localization resilience. Finish with design-review for a prioritized critique of the actual interface, not just the mockup.",
      },
    ],
    playbook: [
      "use-large-touch-targets",
      "give-targets-breathing-room",
      "show-visible-focus-rings",
      "use-structural-skeletons",
      "give-empty-states-one-action",
      "reserve-space-with-aspect-ratio",
    ],
    skills: [
      {
        slug: "design-engineering",
        pathSlug: "kemiljk/design-engineering",
        role: "Start here when translating design intent into production components or aligning design and engineering decisions.",
      },
      {
        slug: "frontend-ui-engineering",
        pathSlug: "addyosmani/frontend-ui-engineering",
        role: "Use for responsive implementation, component architecture, and maintainable frontend patterns.",
      },
      {
        slug: "interaction-contracts",
        pathSlug: "kemiljk/interaction-contracts",
        role: "Use when a mockup leaves triggers, state changes, interruption, or recovery behavior unresolved.",
      },
      {
        slug: "component-canvas",
        pathSlug: "ibelick/component-canvas",
        role: "Use to inspect existing live components and compare their variants in a pan-and-zoom workspace.",
      },
      {
        slug: "60fps-animation",
        pathSlug: "iart-ai/60fps-animation",
        role: "Use to reduce layout thrashing and build smoother animations with compositor-friendly techniques.",
      },
      {
        slug: "fixing-accessibility",
        pathSlug: "ibelick/fixing-accessibility",
        role: "Use to fix keyboard navigation, focus management, labels, contrast, and form errors.",
      },
      {
        slug: "harden",
        pathSlug: "pbakaus/harden",
        role: "Use before release to handle empty states, errors, edge cases, onboarding, and localization resilience.",
      },
      {
        slug: "sync-figma-token",
        pathSlug: "firebenders/sync-figma-token",
        role: "Use to compare and sync code tokens with Figma variables, reviewing drift before applying changes.",
      },
      {
        slug: "build-design",
        pathSlug: "jakubkrehel/build-design",
        role: "Use to implement a Figma design or reference image with the project's existing tokens and components.",
      },
      {
        slug: "figma-code-connect",
        pathSlug: "figma/figma-code-connect",
        role: "Use when Figma components need maintained mappings to their production code through Code Connect.",
      },
      {
        slug: "balise-ux-writing",
        pathSlug: "mrstev3n/balise-ux-writing",
        role: "Use to write or refine user-facing labels, onboarding, errors, and state messages without changing product behavior.",
      },
      {
        slug: "design-review",
        pathSlug: "superfuture/design-review",
        role: "Use for a prioritized critique of hierarchy, spacing, typography, states, responsiveness, and accessibility.",
      },
    ],
    agentCapabilities: [
      "Translate interface design into responsive, maintainable components.",
      "Specify interaction behavior and recovery paths beyond static mockups.",
      "Inspect component variants and diagnose animation performance issues.",
      "Prepare prototypes for real use with accessible controls and resilient states.",
    ],
    relatedSlugs: [
      "web-development-best-practices",
      "design-system-guidelines",
      "website-layout",
    ],
  },
  {
    slug: "deslop",
    title: "Deslop",
    keyword: "deslop",
    seoTitle: "Deslop skills for human writing | UI Skills",
    cardDescription:
      "Remove AI writing tells from drafts, docs, and reviews while keeping the author's meaning and voice.",
    metaDescription:
      "Browse deslop skills that detect and remove AI writing patterns from prose, docs, and reviews while preserving voice.",
    intro:
      "Use these skills when a draft sounds generated. They detect AI writing tells and rewrite prose so it keeps the author's meaning, density, and voice. Pick one skill for a pass. Running several at once tends to sand the voice back off.",
    workflow: [
      {
        title: "Find the tells before rewriting",
        description:
          "Start with no-ai-slop when you want a diagnosis without a rewrite, or anti-slop and humanize when you also need a docs-folder audit. Note the patterns that actually show up in this draft.",
      },
      {
        title: "Rewrite while keeping the voice",
        description:
          "Use deslop, stop-slop, unslop, or slopbeth to edit the draft in place. Use blader/humanizer when you want the pass grounded in Wikipedia's signs of AI writing. Keep the original claims, names, and structure.",
      },
      {
        title: "Match a specific voice",
        description:
          "Use Aboudjem's humanizer when you need a scored rewrite in one of its voice profiles, or anti-ai-slop-writing when the draft should avoid a banned vocabulary and vary its structure on purpose.",
      },
      {
        title: "Clean the agent's own replies",
        description:
          "Use slopgent when the problem is the assistant's chat voice: plain, action-first replies that still keep the precision and uncertainty the answer needs.",
      },
    ],
    playbook: [
      "use-sentence-case-labels",
      "cap-line-length",
      "use-text-balance",
      "keep-secondary-text-readable",
      "pair-status-with-labels",
      "give-empty-states-one-action",
    ],
    skills: [
      {
        slug: "deslop",
        pathSlug: "stephenturner/deslop",
        role: "Remove AI writing patterns so a draft sounds like a specific person wrote it.",
      },
      {
        slug: "humanizer",
        pathSlug: "aboudjem/humanizer",
        role: "Score 53 AI writing patterns and rewrite in one of five voice profiles.",
      },
      {
        slug: "anti-ai-slop-writing",
        pathSlug: "jalaalrd/anti-ai-slop-writing",
        role: "Write or revise text that avoids banned AI vocabulary and repetitive structure.",
      },
      {
        slug: "stop-slop",
        pathSlug: "hardikpandya/stop-slop",
        role: "Strip predictable AI tells while drafting, editing, or reviewing prose.",
      },
      {
        slug: "no-ai-slop",
        pathSlug: "petergyang/no-ai-slop",
        role: "Sharpen a draft in the author's voice, or flag slop without rewriting it.",
      },
      {
        slug: "humanizer",
        pathSlug: "blader/humanizer",
        role: "Rewrite AI-sounding text from Wikipedia's signs of AI writing without changing the meaning.",
      },
      {
        slug: "unslop",
        pathSlug: "cursor/unslop",
        role: "Edit out machine patterns and put a more human voice back into the text.",
      },
      {
        slug: "slopbeth",
        pathSlug: "ehmo/slopbeth",
        role: "Remove AI-writing tells while preserving meaning, voice, and density.",
      },
      {
        slug: "anti-slop",
        pathSlug: "elithrar/anti-slop",
        role: "Detect and remove AI tells in blogs, docs, emails, and reports.",
      },
      {
        slug: "humanize",
        pathSlug: "aashaexo/humanize",
        role: "Clean AI-generated prose and audit a docs folder for content, language, style, and rhetoric slop.",
      },
      {
        slug: "slopgent",
        pathSlug: "ehmo/slopgent",
        role: "Shape the agent's own replies to be plain and action-first without dropping precision.",
      },
    ],
    agentCapabilities: [
      "Detect AI writing tells in drafts, docs, emails, and reviews before changing the text.",
      "Rewrite prose so it keeps the original meaning, density, and author voice.",
      "Score patterns and match a chosen voice profile when the draft needs a specific sound.",
      "Audit a docs folder or the agent's own replies for slop.",
    ],
    relatedSlugs: ["ai-generated-ui", "ui-design-tips", "empty-state-design"],
  },
];

export const collectionBySlug = new Map(
  collections.map((collection) => [collection.slug, collection]),
);
