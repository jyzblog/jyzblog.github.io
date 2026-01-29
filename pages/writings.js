import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import FilterBar from '../components/FilterBar';
import styles from '../styles/content.module.css';
import { getAllPosts, getAllLabels } from '../lib/api'


function Posts({posts, labels}) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.labels && post.labels.includes(activeFilter));
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Fragment>
      <Nav />
      {labels.length > 0 && (
        <FilterBar 
          labels={labels} 
          activeFilter={activeFilter} 
          onFilterChange={handleFilterChange} 
        />
      )}
      <div className={styles.content}>
        <ul>
          {filteredPosts.map(({title, description, date, slug, labels: postLabels }) => (
            <li key={title}>
              <strong>
                <Link href={'/writings/[slug]'} as={`/writings/${slug}`} target="_blank" rel="noopener noreferrer">
                  {title}
                </Link>
              </strong>{' '}
              (<small>{date}</small>)
              {postLabels && postLabels.length > 0 && (
                <span className={styles.labels}>
                  {postLabels.map(label => (
                    <span key={label} className={styles.label}>
                      {label}
                    </span>
                  ))}
                </span>
              )}
              <p className={styles.post}>{description}</p>
            </li>
          ))}
        </ul>
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
      'slug',
      'labels'
    ]);
    const labels = getAllLabels(posts);
    return {
      props: { posts, labels },
    }
  }