import bash from "@shikijs/langs/bash";
import githubDarkDefault from "@shikijs/themes/github-dark-default";
import githubLightHighContrast from "@shikijs/themes/github-light-high-contrast";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { LanguageRegistration } from "shiki";

export const CODE_HIGHLIGHT_THEME = "github-light-high-contrast";
export const CODE_HIGHLIGHT_FOREGROUND = "#0e1116";
export const SKILL_CODE_THEME = CODE_HIGHLIGHT_THEME;
export const SKILL_CODE_BACKGROUND = "transparent";
export const SKILL_CODE_FOREGROUND = CODE_HIGHLIGHT_FOREGROUND;

export type CodeHighlightLanguage = "bash" | "plaintext";

type BundledLang =
  "bash" | "css" | "html" | "javascript" | "json" | "markdown" | "typescript";

type LanguageLoaderResult = LanguageRegistration | LanguageRegistration[];

const LANG_ALIASES: Record<string, BundledLang | "plaintext"> = {
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  js: "javascript",
  ts: "typescript",
  md: "markdown",
  plaintext: "plaintext",
  text: "plaintext",
  txt: "plaintext",
  plain: "plaintext",
};

const LANG_LOADERS: Record<BundledLang, () => Promise<LanguageLoaderResult>> = {
  bash: async () => bash,
  css: () => import("@shikijs/langs/css").then((module) => module.default),
  html: () => import("@shikijs/langs/html").then((module) => module.default),
  javascript: () =>
    import("@shikijs/langs/javascript").then((module) => module.default),
  json: () => import("@shikijs/langs/json").then((module) => module.default),
  markdown: () =>
    import("@shikijs/langs/markdown").then((module) => module.default),
  typescript: () =>
    import("@shikijs/langs/typescript").then((module) => module.default),
};

let highlighterPromise: Promise<HighlighterCore> | null = null;
const loadedLangPromises = new Map<string, Promise<void>>([
  ["bash", Promise.resolve()],
]);

function getHighlighter(): Promise<HighlighterCore> {
  highlighterPromise ??= createHighlighterCore({
    themes: [githubLightHighContrast, githubDarkDefault],
    langs: [bash],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighterPromise;
}

async function ensureLanguage(lang: string): Promise<string> {
  const normalized = LANG_ALIASES[lang] ?? lang;
  if (normalized === "plaintext") {
    return "plaintext";
  }

  const loader = LANG_LOADERS[normalized as BundledLang];
  if (!loader) {
    return "plaintext";
  }

  let loadPromise = loadedLangPromises.get(normalized);
  if (!loadPromise) {
    loadPromise = (async () => {
      const highlighter = await getHighlighter();
      if (!highlighter.getLoadedLanguages().includes(normalized)) {
        await highlighter.loadLanguage(await loader());
      }
    })();
    loadedLangPromises.set(normalized, loadPromise);
  }
  await loadPromise;
  return normalized;
}

function normalizeLanguage(lang?: string): string {
  const raw = lang?.trim().toLowerCase().split(/\s+/)[0] ?? "";
  if (!raw) {
    return "plaintext";
  }

  return LANG_ALIASES[raw] ?? raw;
}

/** Quote placeholder tokens so Shiki can highlight shell commands safely. */
export function prepareShellForHighlight(code: string): string {
  return code.replace(/ <([^>]+)>/g, " '<$1>'");
}

function extractCodeInnerHtml(html: string): string {
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/);
  return match?.[1]?.trimEnd() ?? "";
}

type HighlightSurface = "ui" | "skill";

const HIGHLIGHT_SURFACES: Record<
  HighlightSurface,
  {
    theme: string;
    foreground: string;
    background: string;
    transparentBackground: boolean;
  }
> = {
  ui: {
    theme: CODE_HIGHLIGHT_THEME,
    foreground: CODE_HIGHLIGHT_FOREGROUND,
    background: "transparent",
    transparentBackground: true,
  },
  skill: {
    theme: SKILL_CODE_THEME,
    foreground: SKILL_CODE_FOREGROUND,
    background: SKILL_CODE_BACKGROUND,
    transparentBackground: true,
  },
};

function withPlaintextForeground(html: string, foreground: string): string {
  return html.replace(
    /<span>([^<]*)<\/span>/g,
    `<span style="color:${foreground}">$1</span>`,
  );
}

async function highlightWithLanguage(
  code: string,
  language: string,
  surface: HighlightSurface = "ui",
): Promise<string> {
  const highlighter = await getHighlighter();
  const resolvedLanguage = await ensureLanguage(language);
  const source =
    resolvedLanguage === "bash" ? prepareShellForHighlight(code) : code;
  const surfaceConfig = HIGHLIGHT_SURFACES[surface];

  const html = highlighter.codeToHtml(source, {
    lang: resolvedLanguage,
    theme: surfaceConfig.theme,
    tokenizeTimeLimit: 0,
    colorReplacements: surfaceConfig.transparentBackground
      ? {
          [surfaceConfig.theme]: {
            "#ffffff": "transparent",
          },
        }
      : undefined,
  });

  const innerHtml = extractCodeInnerHtml(html);
  return resolvedLanguage === "plaintext"
    ? withPlaintextForeground(innerHtml, surfaceConfig.foreground)
    : innerHtml;
}

export async function highlightCode(
  code: string,
  language: CodeHighlightLanguage,
): Promise<string> {
  return highlightWithLanguage(code, language, "ui");
}

export async function highlightFencedCode(
  code: string,
  lang?: string,
): Promise<string> {
  return highlightWithLanguage(code, normalizeLanguage(lang), "skill");
}

export async function highlightShellCommand(code: string): Promise<string> {
  return highlightCode(code, "bash");
}

export async function highlightPlainCode(code: string): Promise<string> {
  return highlightCode(code, "plaintext");
}
