import React from 'react';
import Link from 'next/link';

import styles from '../styles/nav.module.css';

function nav() {
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
        Writings
      </Link>
    </nav>
  );
}

export default nav;
