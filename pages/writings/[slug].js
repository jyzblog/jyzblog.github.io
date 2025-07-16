import React, { Fragment, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Nav from '../../components/nav';
import TOC from '../../components/TOC';
import styles from '../../styles/content.module.css';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

function Post({ content, headings }) {
  useEffect(() => {
    // Add IDs to headings after component mounts
    if (headings && headings.length > 0) {
      headings.forEach((heading) => {
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        allHeadings.forEach((element) => {
          if (element.textContent.trim() === heading.text) {
            element.id = heading.id;
          }
        });
      });
    }
  }, [headings]);

  return (
    <Fragment>
      <Nav />
      <div className={styles.postContainer}>
        <TOC headings={headings} />
        <article className={styles.content}>
          <ReactMarkdown children={content} />
        </article>
      </div>
    </Fragment>
  );
}

export default Post;

export async function getStaticProps({ params: { slug } }) {
  const post = getPostBySlug(slug, ['title', 'date', 'slug', 'content']);
  const markdownResult = await markdownToHtml(post?.content || '');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = post.date.toLocaleDateString('en-US', options);

  // Keep all headings from the markdown content (they're all content headings)
  const contentHeadings = markdownResult.headings;

  return {
    props: {
      content: `# ${post.title}\n*${formattedDate}*\n${post.content}`,
      headings: contentHeadings,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}
