import { createHighlighter } from 'shiki';

const LIGHT_THEME = 'github-light';
const DARK_THEME = 'github-dark';

// Shiki highlighters are expensive to create; keep one process-wide instance.
const highlighterPromise = createHighlighter({
  themes: [LIGHT_THEME, DARK_THEME],
  langs: ['markdown'],
});

export async function highlightMarkdownSource(markdown: string) {
  const highlighter = await highlighterPromise;

  return highlighter.codeToHtml(markdown, {
    lang: 'markdown',
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
  });
}
