import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '../styles/nav.module.css';

function nav() {
  // Dark mode state and effect
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // On mount, check localStorage
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
      document.body.setAttribute('data-theme', saved);
    } else {
      setTheme('system');
      document.body.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    let nextTheme;
    if (theme === 'dark') nextTheme = 'light';
    else if (theme === 'light') nextTheme = 'system';
    else nextTheme = 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'system') {
      localStorage.removeItem('theme');
      document.body.removeAttribute('data-theme');
    } else {
      localStorage.setItem('theme', nextTheme);
      document.body.setAttribute('data-theme', nextTheme);
    }
  };

  const themeLabel = theme === 'system' ? '🌓' : theme === 'dark' ? '🌙' : '☀️';
  const themeTitle = theme === 'system' ? 'System' : theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <nav className={styles.nav}>
      <Link href="/" as={'/'}>
        Home
      </Link>{' '}
      |{' '}
      <Link href="/books" as={'/books'}>
        Books
      </Link>{' '}
      |{' '}
      <Link href="/writings" as={'/writings'}>
        Notes
      </Link>
      {' '}|{' '}
      <button
        onClick={toggleTheme}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2em',
          marginLeft: '10px',
          verticalAlign: 'middle',
        }}
        title={`Theme: ${themeTitle}`}
        aria-label="Toggle dark mode"
      >
        {themeLabel}
      </button>
    </nav>
  );
}

export default nav;
