import React, { Fragment } from 'react';
import Nav from '../../components/nav';
import TOC from '../../components/TOC';
import styles from '../../styles/content.module.css';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

function Post({ content, headings }) {
  return (
    <Fragment>
      <Nav />
      <div className={styles.postContainer}>
        <TOC headings={headings} />
        <article
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Fragment>
  );
}

export default Post;

export async function getStaticProps({ params: { slug } }) {
  const post = getPostBySlug(slug, ['title', 'date', 'slug', 'content', 'description']);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = post.date.toLocaleDateString('en-US', options);

  // Extract author from description field (format: "Excerpts from "Book Title" by Author Name")
  let author = '';
  if (post.description) {
    const match = post.description.match(/by\s+(.+)$/);
    if (match) {
      author = match[1].trim();
    }
  }

  const dateLine = author ? `*${author} | ${formattedDate}*` : `*${formattedDate}*`;
  const fullMarkdown = `# ${post.title}\n${dateLine}\n${post.content}`;
  const markdownResult = await markdownToHtml(fullMarkdown);

  return {
    props: {
      content: markdownResult.html,
      headings: markdownResult.headings,
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
