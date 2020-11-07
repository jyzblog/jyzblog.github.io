import React, { Fragment } from 'react';
import Nav from '../components/nav';

import styles from '../styles/content.module.css';

function books() {
  return <Fragment>
    <Nav />
    <div className={styles.content}>
      <p>Books I love:</p>
      <ul>
        <li>Americana: A 400-Year History of American Capitalism</li>
      </ul>
    </div>
  </Fragment>
}

export default books;