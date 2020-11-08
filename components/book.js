import React from 'react';
import styles from '../styles/content.module.css';

function book(props) {
  const hashtags = [...props.hashtags];
  const hashtagStr = hashtags.map((h) => `#${h}`).join(' ');

  return (
    <li>
      <a href={props.address} target="_blank" rel="noopener noreferrer">
        <span className={styles.title}>{props.title}</span>
      </a>{' '}
      <small>({props.author})</small>
      <div className={styles.hashtags}>{hashtagStr}</div>
    </li>
  );
}

export default book;
