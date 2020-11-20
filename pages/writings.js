import React, { Fragment } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import styles from '../styles/content.module.css';
import { getAllPosts } from '../lib/api'


function Posts({posts}) {
  return (
    <Fragment>
      <Nav />
      <div className={styles.content}>
        {posts.map(({title, description, date, slug }) => (
          <ul key={title}>
            <li>
              <strong>
                <Link href={'/writings/[slug]'} as={`/writings/${slug}`} target="_blank" rel="noopener noreferrer">
                  <a>
                    {title}
                  </a>
                </Link>
              </strong>{' '}
              (<small>{date}</small>)<p className={styles.post}>{description}</p>
            </li>
          </ul>
        ))}
      </div>
    </Fragment>
  );
}

export default Posts;

export const getStaticProps = async () => {
    const posts = getAllPosts([
      'title',
      'date',
      'description',
      'slug'
    ])  
    return {
      props: { posts },
    }
  }