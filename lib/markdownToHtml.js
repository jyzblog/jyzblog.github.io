import { remark } from "remark";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkHtml from "remark-html";

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(remarkPresetLintMarkdownStyleGuide)
    .use(remarkHtml)
    .process(markdown);
  return String(result);
}
