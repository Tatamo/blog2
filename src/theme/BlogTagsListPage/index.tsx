import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import Tag from '@theme/Tag';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';
import type {Props} from '@theme/BlogTagsListPage';
import styles from './styles.module.css';

// テーマ標準のBlogTagsListPageを上書きし、アルファベットごとの分類や
// 区切りなしで、すべてのタグをフラットに並べる(タグ数が少ない想定のため)
export default function BlogTagsListPage({tags, sidebar}: Props): ReactNode {
  const title = translateTagsPageTitle();
  const sortedTags = [...tags].sort((a, b) => a.label.localeCompare(b.label));
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
      <BlogLayout sidebar={sidebar}>
        <Heading as="h1">{title}</Heading>
        <ul className={clsx('padding--none', 'margin-vert--lg')}>
          {sortedTags.map((tag) => (
            <li key={tag.permalink} className={styles.tag}>
              <Tag {...tag} />
            </li>
          ))}
        </ul>
      </BlogLayout>
    </HtmlClassNameProvider>
  );
}
