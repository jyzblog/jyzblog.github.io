import React, { Fragment } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import styles from '../styles/content.module.css';

function NotFound() {
  return (
    <Fragment>
      <Nav />
      <div className={styles.content}>
        <h2>Page Not Found</h2>
        <p>
          The page you're looking for doesn't exist.{' '}
          <Link href="/">Head back home</Link>.
        </p>
      </div>
    </Fragment>
  );
}

export default NotFound;
