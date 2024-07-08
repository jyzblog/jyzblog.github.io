import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import Nav from '../../components/nav';
import styles from '../../styles/content.module.css';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

function Post({ content }) {
  return (
    <Fragment>
      <Nav />
      <article className={styles.content}>
        <ReactMarkdown children={content} />
      </article>
    </Fragment>
  );
}

export default Post;

export async function getStaticProps({ params: { slug } }) {
  const post = getPostBySlug(slug, ['title', 'date', 'slug', 'content']);
  const content = await markdownToHtml(post?.content || '');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = post.date.toLocaleDateString('en-US', options);

  return {
    props: {
      content: `# ${post.title}\n*${formattedDate}*\n${content}`,
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
