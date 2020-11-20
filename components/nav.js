import React from 'react';
import Link from 'next/link';

import styles from '../styles/nav.module.css';

function nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" as={'/'}>
        <a>Home</a>
      </Link>{' '}
      |{' '}
      <Link href="/books" as={'/books'}>
        <a>Books</a>
      </Link>{' '}
      |{' '}
      <Link href="/writings" as={'/writings'}>
        <a>Writings</a>
      </Link>
    </nav>
  );
}

export default nav;
