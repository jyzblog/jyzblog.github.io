import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from '../styles/nav.module.css';

function nav() {
  // Dark mode state and effect
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Sync React state with theme already set by blocking script in _document
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const themeLabel = theme === 'dark' ? '🌙' : '☀️';
  const themeTitle = theme.charAt(0).toUpperCase() + theme.slice(1);

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
