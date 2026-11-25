export type FoundationColor = { name: string; value: string };
export type FoundationTypography = {
  name: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
};
export type FoundationValue = { name: string; value: string };

function frontmatter(markdown: string) {
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n|$)/);
  return match?.[1] ?? "";
}

function section(markdown: string, key: string) {
  const lines = frontmatter(markdown).split(/\r?\n/);
  const start = lines.findIndex((line) => new RegExp(`^${key}:\\s*$`, "i").test(line));
  if (start < 0) return [];
  const values: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (line.trim() && !/^\s{2}/.test(line)) break;
    values.push(line);
  }
  return values;
}

function clean(value: string) {
  return value
    .replace(/(\S)\s+#.*$/, "$1")
    .replace(/^['"]|['"]$/g, "")
    .trim();
}

function markdownSection(markdown: string, pattern: RegExp) {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((line) => /^#{1,6}\s+/.test(line) && pattern.test(line));
  if (start < 0) return [];
  const level = lines[start].match(/^(#+)/)?.[1].length ?? 2;
  const end = lines.slice(start + 1).findIndex((line) => {
    const headingLevel = line.match(/^(#+)\s+/)?.[1].length;
    return headingLevel !== undefined && headingLevel <= level;
  });
  return lines.slice(start + 1, end < 0 ? undefined : start + 1 + end);
}

function tableRows(lines: string[]) {
  return lines
    .filter((line) => /^\s*\|/.test(line) && !/^\s*\|\s*:?-+\s*(?:\|\s*:?-+\s*)+\|?\s*$/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => clean(cell.replace(/[`*_]/g, ""))))
    .filter((cells) => cells.length > 1);
}

function tableBlocks(lines: string[]) {
  const blocks: string[][] = [];
  let block: string[] = [];
  for (const line of lines) {
    if (/^\s*\|/.test(line)) {
      block.push(line);
    } else if (block.length > 0) {
      blocks.push(block);
      block = [];
    }
  }
  if (block.length > 0) blocks.push(block);
  return blocks;
}

function cssDimension(value: string, source: string) {
  const cleanValue = value.trim();
  if (/[a-z%]+$/i.test(cleanValue)) return cleanValue;
  const unit = source.match(/(?:px|rem|em|%)/i)?.[0];
  return unit ? `${cleanValue}${unit}` : cleanValue;
}

function firstUnit(value: string) {
  return value
    .replace(/\s+\([^)]*\)\s*$/, "")
    .trim()
    .split(/\s+\/\s+/)[0];
}

export function parseDesignMdFoundations(markdown: string) {
  const colors: FoundationColor[] = [];
  for (const line of section(markdown, "colors")) {
    const objectMatch = line.match(/^\s{2,}["']?([^"':]+)["']?\s*:\s*\{\s*light:\s*["']?([^,"'}]+)["']?/i);
    if (objectMatch) {
      colors.push({ name: clean(objectMatch[1]), value: clean(objectMatch[2]) });
      continue;
    }
    const match = line.match(/^\s{2,}["']?([^"':]+)["']?\s*:\s*["']?((?:#[\da-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|lch\([^)]*\)|lab\([^)]*\)|color\([^)]*\)))['"]?/i);
    if (match) colors.push({ name: clean(match[1]), value: clean(match[2]) });
  }
  if (colors.length === 0) {
    for (const rows of tableBlocks(markdownSection(markdown, /colou?rs?|palette|الألوان|لوحة الألوان/i)).map(tableRows)) {
      for (const cells of rows.slice(1)) {
        const value = cells.find((cell) => /^(?:#|rgba?\(|hsla?\(|oklch\(|oklab\(|lch\(|lab\(|color\()/i.test(cell));
        if (value) colors.push({ name: cells[0], value });
      }
    }
  }
  for (const line of section(markdown, "theme")) {
    const match = line.match(/^\s{2,}["']?([^"':]+)["']?\s*:\s*["']?((?:#[\da-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|lch\([^)]*\)|lab\([^)]*\)|color\([^)]*\)))['"]?/i);
    if (match && /color|brand|background|foreground|border/i.test(match[1])) {
      const color = { name: clean(match[1]), value: clean(match[2]) };
      if (!colors.some((item) => item.name === color.name && item.value === color.value)) colors.push(color);
    }
  }
  if (colors.length === 0) {
    for (const match of markdown.matchAll(/^\s*-\s+\*\*([^*]+)\*\*\s*\(\s*`((?:#[\da-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|lch\([^)]*\)|lab\([^)]*\)|color\([^)]*\)))`\s*\)/gim)) {
      colors.push({ name: clean(match[1]), value: clean(match[2]) });
    }
  }
  if (colors.length === 0) {
    for (const match of markdown.matchAll(/--([\w-]*(?:color|background|foreground|accent|border|stroke)[\w-]*)\s*:\s*((?:#[\da-f]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|oklch\([^)]*\)))/gim)) {
      colors.push({ name: match[1], value: match[2].trim() });
    }
  }

  const typography: FoundationTypography[] = [];
  const typographyLines = section(markdown, "typography");
  const aliases = new Map<string, string>();
  const typographyDocs = markdownSection(markdown, /typograph|type scale|الخطوط|التايبوغرافي/i);
  let documentedFamily: string | undefined;
  const typographyBlock = markdown.match(/(?:^|\n)typography:\s*\n([\s\S]*?)(?=\n\S|$)/i)?.[1] ?? "";
  const yamlFamily = typographyBlock.match(/^\s+(?:sans|font_family|font-family):\s*["']?(.+?)["']?\s*(?:#.*)?$/im)?.[1];
  if (yamlFamily) documentedFamily = clean(yamlFamily);
  for (const rows of tableBlocks(typographyDocs).map(tableRows)) {
    const header = rows[0]?.map((cell) => cell.toLowerCase()) ?? [];
    if (!header.includes("property") || !header.includes("value")) continue;
    const propertyIndex = header.indexOf("property");
    const valueIndex = header.indexOf("value");
    const familyRow = rows.slice(1).find((cells) => cells[propertyIndex]?.toLowerCase() === "family");
    if (familyRow?.[valueIndex]) documentedFamily = familyRow[valueIndex];
  }
  for (const line of typographyLines) {
    const alias = line.match(/^\s+["']?(font-(?:sans|serif|mono|display))["']?\s*:\s*["']?(.+?)["']?\s*$/i);
    if (alias) aliases.set(alias[1], clean(alias[2]));
  }
  // Prefer the typography definitions in frontmatter whenever the source
  // provides them. Markdown tables are only a fallback for files without a
  // frontmatter typography section; otherwise they can mask documented
  // family and weight values with incomplete prose tables.
  const hasNestedTypography = typographyLines.some((line) => /^\s{2}["']?[\w-]+["']?\s*:\s*$/.test(line));
  if (typographyLines.length === 0 || !hasNestedTypography) {
    const lines = markdownSection(markdown, /typograph|type scale|الخطوط|التايبوغرافي/i);
    const typographyTables = tableBlocks(lines);
    if (typographyTables.length === 0) {
      typographyTables.push(...tableBlocks(markdown.split(/\r?\n/)));
    }
    for (const rows of typographyTables.map(tableRows)) {
      const header = rows[0]?.map((cell) => cell.toLowerCase()) ?? [];
      // A font-family reference table describes reusable stacks, not type
      // styles. Keep it out of the rendered type scale so entries such as
      // --font-display do not become default-sized “Aa” specimens.
      if (header.some((cell) => /stack|family/.test(cell)) && header.some((cell) => /token|variable|utility/.test(cell))) continue;
      // A weight reference table is metadata for the type scale, not a set of
      // specimens. Only tables with a size, line-height, or family column can
      // describe a complete typography style.
      if (!header.some((cell) => /size|line|leading|family|font/.test(cell))) continue;
      for (const cells of rows.slice(1)) {
        const style: FoundationTypography = { name: cells[0] };
        for (const [index, cell] of cells.entries()) {
          const column = header[index] ?? "";
          if (/(?:^|\s)(?:font|family|stack)(?:\s|$)/.test(column) && !/size|weight/.test(column)) style.fontFamily = cell;
          if (/size/.test(column) && !/line/.test(column)) style.fontSize = cell;
          if (/weight/.test(column)) style.fontWeight = cell;
          if (/line|leading/.test(column) && !/size|desktop|mobile|taille/.test(column)) style.lineHeight = cell;
          if (/letter|tracking/.test(column)) style.letterSpacing = cell;
          if (!/mobile/.test(column) && /desktop.*(?:size|taille|line)|(?:size|taille).*line/.test(column)) {
            const scale = cell.match(/([\d.]+(?:px|rem|em|%)?)\s*\/\s*([\d.]+(?:px|rem|em|%)?)/i);
            if (scale) {
              style.fontSize = cssDimension(scale[1], cell);
              style.lineHeight = cssDimension(scale[2], cell);
            }
          }
        }
        if (documentedFamily && !style.fontFamily) style.fontFamily = documentedFamily;
        if (Object.keys(style).length > 1) typography.push(style);
      }
    }
  }
  const propertyNames: Record<string, keyof FoundationTypography> = {
    fontfamily: "fontFamily",
    "font-family": "fontFamily",
    fontsize: "fontSize",
    "font-size": "fontSize",
    fontweight: "fontWeight",
    "font-weight": "fontWeight",
    lineheight: "lineHeight",
    "line-height": "lineHeight",
    letterspacing: "letterSpacing",
    "letter-spacing": "letterSpacing",
    tracking: "letterSpacing",
  };
  for (const line of typographyLines) {
    const match = line.match(/^\s{2}["']?([\w-]+)["']?\s*:\s*\{([^{}]+)\}\s*,?\s*$/);
    if (!match) continue;
    const style: FoundationTypography = { name: match[1] };
    for (const pair of match[2].split(/,\s*(?=[\w-]+\s*:)/)) {
      const property = pair.match(/^\s*["']?([\w-]+)["']?\s*:\s*(.*?)\s*$/);
      if (!property) continue;
      const key = propertyNames[property[1].toLowerCase()];
      if (!key) continue;
      const value = clean(property[2]);
      style[key] = key === "fontFamily" ? aliases.get(value) ?? value : value;
    }
    if (Object.keys(style).length > 1) typography.push(style);
  }
  let current: FoundationTypography | undefined;
  for (const line of typographyLines) {
    const heading = line.match(/^\s{2}["']?([\w-]+)["']?\s*:\s*$/);
    if (heading) {
      current = { name: heading[1] };
      typography.push(current);
      continue;
    }
    const property = line.match(/^\s{4}([\w-]+):\s*(.+)$/);
    if (!current || !property) continue;
    const key = propertyNames[property[1].toLowerCase()];
    if (key) current[key] = key === "fontFamily" ? aliases.get(clean(property[2])) ?? clean(property[2]) : clean(property[2]);
  }

  const parseValues = (key: string, headingPattern: RegExp) => {
    const yamlValues = section(markdown, key).flatMap((line) => {
    const match = line.match(/^\s{2,}["']?([\w-]+)["']?\s*:\s*["']?([^"']+?)["']?\s*$/);
      return match ? [{ name: match[1], value: firstUnit(clean(match[2])) }] : [];
    });
    if (yamlValues.length > 0) return yamlValues;
    const rows = tableRows(markdownSection(markdown, headingPattern)).slice(1);
    const parsed = rows.flatMap((cells) => {
      if (key === "rounded") {
        const name = cells.find((cell) => /^rounded-/i.test(cell.trim()));
        const value = cells.find((cell) => /^(?:[\d.]+(?:px|rem|em|%|vh|vw)?)/i.test(cell.trim()));
        return name && value ? [{ name: name.trim(), value: firstUnit(value) }] : [];
      }
      const value = cells.find((cell, index) => index > 0 && /^(?:[+-]?[\d.]+(?:px|rem|em|%|vh|vw)?|rounded-[\w-]+|radius-[\w-]+)$/i.test(cell.trim()));
      return cells.length > 1 && value ? [{ name: cells[0], value: firstUnit(value) }] : [];
    });
    if (parsed.length > 0) return parsed;
    return [];
  };

  const yamlFlowRadius = markdown.match(/radius_px:\s*\{([^}]+)\}/i)?.[1];
  const flowShapes = yamlFlowRadius
    ? yamlFlowRadius.split(",").flatMap((pair) => {
        const match = pair.match(/\s*([\w-]+)\s*:\s*([\d.]+)/);
        return match ? [{ name: match[1], value: `${match[2]}px` }] : [];
      })
    : [];
  const spacingScale = [...markdown.matchAll(/`?(?:space|spacing)[-_]([\w-]+)`?\s*[=:]\s*`?([\d.]+(?:px|rem|em))/gi)].map((match) => ({ name: match[1], value: match[2] }));

  return {
    colors,
    typography,
    spacing: spacingScale.length > 0 ? spacingScale : parseValues("spacing", /spacing system|layout & spacing|sizing scale|المسافات|التباعد/i),
    shapes: flowShapes.length > 0 ? flowShapes : parseValues("rounded", /radius|rounded|shape|الحواف|الزوايا/i),
  };
}
