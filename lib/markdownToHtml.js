import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkRehype from "remark-rehype";

// Extract headings from markdown and generate IDs (used for TOC and for injecting into HTML)
function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#+\s*/, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      headings.push({
        level,
        text,
        id
      });
    }
  }

  return headings;
}

// Inject id attributes into heading tags in HTML (same order as extractHeadings)
function injectHeadingIds(html, headings) {
  let index = 0;
  return html.replace(/<h([1-6])([^>]*)>/g, (match, level, rest) => {
    const heading = headings[index++];
    if (heading && heading.level === parseInt(level, 10)) {
      return `<h${level} id="${heading.id}"${rest}>`;
    }
    return match;
  });
}

export default async function markdownToHtml(markdown) {
  const headings = extractHeadings(markdown);

  const result = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  let html = typeof result.value === 'string' ? result.value : String(result);
  html = injectHeadingIds(html, headings);

  return {
    html,
    headings
  };
}
