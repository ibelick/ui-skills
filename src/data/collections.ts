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
    seoTitle: "Practical design principles for UI | UI Skills",
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
    ],
  },
];

export const collectionBySlug = new Map(
  collections.map((collection) => [collection.slug, collection]),
);
