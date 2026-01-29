import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/content.module.css';

const TOC = ({ headings }) => {
  const [activeId, setActiveId] = useState('');
  const tocContainerRef = useRef(null);
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0.1
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Auto-scroll TOC to keep active item visible
  useEffect(() => {
    if (activeId && activeItemRef.current && tocContainerRef.current) {
      const container = tocContainerRef.current;
      const activeItem = activeItemRef.current;
      
      // Calculate the position to scroll to
      const containerScrollTop = container.scrollTop;
      const itemOffsetTop = activeItem.offsetTop;
      const containerHeight = container.clientHeight;
      const itemHeight = activeItem.offsetHeight;
      
      // Calculate the ideal scroll position to center the item
      const idealScrollTop = itemOffsetTop - (containerHeight / 2) + (itemHeight / 2);
      
      // Only scroll if the item is not already in a good position
      const currentItemTop = itemOffsetTop - containerScrollTop;
      const currentItemBottom = currentItemTop + itemHeight;
      
      const isItemVisible = currentItemTop >= 0 && currentItemBottom <= containerHeight;
      const isItemCentered = Math.abs(currentItemTop - (containerHeight - itemHeight) / 2) < 50;
      
      if (!isItemVisible || !isItemCentered) {
        container.scrollTo({
          top: Math.max(0, idealScrollTop),
          behavior: 'smooth'
        });
      }
    }
  }, [activeId]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.tocContainer} ref={tocContainerRef}>
      <div className={styles.tocTitle}>Table of Contents</div>
      <ul className={styles.tocList}>
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          const indentLevel = heading.level - 1;
          
          return (
            <li
              key={index}
              className={`${styles.tocItem} ${isActive ? styles.tocActive : ''}`}
              style={{ paddingLeft: `${indentLevel * 16}px` }}
              ref={isActive ? activeItemRef : null}
            >
              <a
                href={`#${heading.id}`}
                className={styles.tocLink}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(heading.id);
                }}
                aria-current={isActive ? 'location' : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TOC; 