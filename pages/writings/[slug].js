import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import Nav from '../../components/nav';
import TOC from '../../components/TOC';
import ChapterSpeakButton from '../../components/ChapterSpeakButton';
import styles from '../../styles/content.module.css';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import { extractHeadings } from '../../lib/markdownToHtml';
import { splitMarkdownByH1 } from '../../lib/markdownToSpeech';

const AudioPlayer = dynamic(() => import('../../components/AudioPlayer'), {
  ssr: false,
});

function childrenToText(children) {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (child?.props?.children) {
        return childrenToText(child.props.children);
      }
      return '';
    })
    .join('');
}

function Post({ content, headings, slug }) {
  const [speakRequest, setSpeakRequest] = useState(null);
  const [activeChapterTitle, setActiveChapterTitle] = useState(null);

  const chapterMarkdownByTitle = useMemo(() => {
    const map = new Map();
    // First h1 is the prepended post title — skip it for chapter buttons
    for (const section of splitMarkdownByH1(content).slice(1)) {
      map.set(section.title, section.markdown);
    }
    return map;
  }, [content]);

  const headingIdByText = useMemo(() => {
    const map = new Map();
    (headings || []).forEach((heading) => {
      if (!map.has(heading.text)) {
        map.set(heading.text, heading.id);
      }
    });
    return map;
  }, [headings]);

  const handleSpeakRequestHandled = useCallback(() => {
    setSpeakRequest(null);
  }, []);

  const handleActiveLabelChange = useCallback((label) => {
    setActiveChapterTitle(label);
  }, []);

  const handleChapterSpeak = useCallback((title, markdown) => {
    setActiveChapterTitle(title);
    setSpeakRequest({
      id: Date.now(),
      label: title,
      markdown,
    });
  }, []);

  useEffect(() => {
    setSpeakRequest(null);
    setActiveChapterTitle(null);
  }, [slug, content]);

  useEffect(() => {
    // Add IDs to headings that were not assigned via custom renderers
    if (headings && headings.length > 0) {
      headings.forEach((heading) => {
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        allHeadings.forEach((element) => {
          const titleEl = element.querySelector(`.${styles.chapterTitleText}`);
          const text = (titleEl?.textContent || element.textContent || '').trim();
          if (text === heading.text && !element.id) {
            element.id = heading.id;
          }
        });
      });
    }
  }, [headings]);

  const markdownComponents = useMemo(
    () => ({
      h1: ({ node: _node, children, ...props }) => {
        const text = childrenToText(children).trim();
        const chapterMarkdown = chapterMarkdownByTitle.get(text);
        const id = headingIdByText.get(text);

        return (
          <h1 id={id} className={styles.chapterHeading} {...props}>
            <span className={styles.chapterTitleText}>{children}</span>
            {chapterMarkdown ? (
              <ChapterSpeakButton
                label={`Listen to ${text}`}
                active={activeChapterTitle === text}
                onClick={() => handleChapterSpeak(text, chapterMarkdown)}
              />
            ) : null}
          </h1>
        );
      },
    }),
    [
      activeChapterTitle,
      chapterMarkdownByTitle,
      handleChapterSpeak,
      headingIdByText,
    ],
  );

  return (
    <Fragment>
      <Nav />
      <div className={styles.postContainer}>
        <TOC headings={headings} />
        <article className={styles.content}>
          <AudioPlayer
            content={content}
            slug={slug}
            speakRequest={speakRequest}
            onSpeakRequestHandled={handleSpeakRequestHandled}
            onActiveLabelChange={handleActiveLabelChange}
          />
          <ReactMarkdown components={markdownComponents}>
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </Fragment>
  );
}

export default Post;

export function getStaticProps({ params: { slug } }) {
  const post = getPostBySlug(slug, ['title', 'date', 'slug', 'content', 'description']);
  const contentHeadings = extractHeadings(post?.content || '');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = post.date.toLocaleDateString('en-US', options);

  let author = '';
  if (post.description) {
    const match = post.description.match(/by\s+(.+)$/);
    if (match) {
      author = match[1].trim();
    }
  }

  const dateLine = author ? `*${author} | ${formattedDate}*` : `*${formattedDate}*`;

  return {
    props: {
      content: `# ${post.title}\n${dateLine}\n${post.content}`,
      headings: contentHeadings,
      slug,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
