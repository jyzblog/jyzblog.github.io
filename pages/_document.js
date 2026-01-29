import { Html, Head, Main, NextScript } from 'next/document';

// Inline theme script runs before paint to prevent flash (fixed string, not user input)
const THEME_SCRIPT = `(function(){var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='dark'||t==='light'?t:'light');})();`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
