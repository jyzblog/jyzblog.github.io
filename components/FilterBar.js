import React from 'react';
import styles from '../styles/filter.module.css';

export default function FilterBar({ labels, activeFilter, onFilterChange }) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        {labels.map(label => (
          <button
            key={label}
            className={`${styles.filterButton} ${activeFilter === label ? styles.active : ''}`}
            onClick={() => onFilterChange(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
