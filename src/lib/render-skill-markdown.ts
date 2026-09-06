import { marked } from "marked";

import { highlightFencedCode } from "./code-highlighter";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

const getSafeUrl = (value: string, baseUrl: string) => {
  if (value.startsWith("#") || value.startsWith("mailto:")) {
    return value;
  }

  try {
    const url = new URL(value, baseUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    // Invalid URLs are rendered as plain link text.
  }

  return undefined;
};

export const renderSkillMarkdown = async (
  markdown: string,
  baseUrl: string,
) => {
  const content = markdown.startsWith("---")
    ? markdown.split("---").slice(2).join("---").trim()
    : markdown;
  const tokens = marked.lexer(content);
  const highlightedCode = new Map<string, string>();

  for (const token of tokens) {
    if (token.type !== "code") {
      continue;
    }

    highlightedCode.set(
      token.raw,
      await highlightFencedCode(token.text, token.lang),
    );
  }

  const renderer = new marked.Renderer();

  renderer.html = () => "";
  renderer.image = () => "";
  renderer.code = ({ raw, lang }) => {
    const highlighted = highlightedCode.get(raw) ?? "";
    const languageClass = lang
      ? ` language-${escapeHtml(lang.trim().split(/\s+/)[0] ?? "")}`
      : "";

    return `<pre class="skill-code-block"><code class="skill-code-block__code [&_.line]:block${languageClass}">${highlighted}</code></pre>`;
  };
  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const safeUrl = getSafeUrl(href, baseUrl);

    if (!safeUrl) {
      return text;
    }

    const titleAttribute = title ? ` title="${escapeHtml(title)}"` : "";
    return `<a href="${escapeHtml(safeUrl)}"${titleAttribute}>${text}</a>`;
  };

  return marked
    .parser(tokens, { renderer })
    .replaceAll(
      "<table>",
      '<div class="skill-table-scroll"><table>',
    )
    .replaceAll("</table>", "</table></div>");
};
