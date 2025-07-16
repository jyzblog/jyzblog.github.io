import { remark } from "remark";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkHtml from "remark-html";

// Separate function to extract headings
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

export default async function markdownToHtml(markdown) {
  // Extract headings first
  const headings = extractHeadings(markdown);
  console.log('Extracted headings from markdown:', headings);
  
  // Process markdown to HTML
  const result = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkHtml)
    .process(markdown);
  
  const html = String(result);
  
  return {
    html: html,
    headings: headings
  };
}
