/**
 * Convert markdown post content into plain text suitable for TTS.
 */

function stripMarkdown(markdown) {
  let text = markdown || '';

  // Remove fenced code blocks entirely (not useful spoken aloud)
  text = text.replace(/```[\s\S]*?```/g, ' ');
  text = text.replace(/~~~[\s\S]*?~~~/g, ' ');

  // Inline code → keep content
  text = text.replace(/`([^`]+)`/g, '$1');

  // Images → alt text if present
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, (_, alt) => (alt ? alt : ' '));

  // Links → keep label
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Headings, blockquotes, list markers
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/^>\s?/gm, '');
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Emphasis / bold
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');
  text = text.replace(/~~(.*?)~~/g, '$1');

  // Horizontal rules
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})\s*$/gm, ' ');

  // HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Collapse whitespace
  text = text.replace(/\r\n/g, '\n');
  text = text.replace(/[ \t]+\n/g, '\n');
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.replace(/[ \t]{2,}/g, ' ');

  return text.trim();
}

/**
 * @param {string} markdown
 * @param {{ title?: string, dateLine?: string }} [meta]
 * @returns {string}
 */
export function markdownToSpeech(markdown, meta = {}) {
  const parts = [];
  if (meta.title) parts.push(meta.title);
  if (meta.dateLine) {
    // Strip italic markers from date line like "*Author | Date*"
    parts.push(meta.dateLine.replace(/^\*|\*$/g, '').trim());
  }
  const body = stripMarkdown(markdown);
  if (body) parts.push(body);
  return parts.join('\n\n');
}
