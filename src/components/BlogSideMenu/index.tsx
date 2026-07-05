import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import XIcon from '@theme/Icon/Socials/X';
import type {Props as BlogLayoutProps} from '@theme/BlogLayout';
import styles from './styles.module.css';

type SidebarProp = BlogLayoutProps['sidebar'];

function RssIcon(props: ComponentProps<'svg'>): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44a15.56 15.56 0 0 1 15.56 15.56h-2.83A12.73 12.73 0 0 0 4 7.27V4.44zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
    </svg>
  );
}

function Section({title, children}: {title: ReactNode; children: ReactNode}) {
  return (
    <section className="margin-bottom--lg">
      <div className={clsx(styles.sectionTitle, 'margin-bottom--md')}>
        {title}
      </div>
      {children}
    </section>
  );
}

function RecentPostsSection({sidebar}: {sidebar: NonNullable<SidebarProp>}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <Section title={sidebar.title}>
      <BlogSidebarItemList
        items={items}
        ulClassName={clsx(styles.itemList, 'clean-list')}
        liClassName={styles.item}
        linkClassName={styles.itemLink}
        linkActiveClassName={styles.itemLinkActive}
      />
    </Section>
  );
}

function LinksSection() {
  const rssUrl = useBaseUrl('/rss.xml');
  return (
    <Section title="リンク">
      <div className={styles.socialLinks}>
        <Link
          className={styles.socialLink}
          href="https://x.com/__tatamo__"
          title="X">
          <XIcon className={styles.socialIcon} />
        </Link>
        {/* Linkだとリンク切れチェックがビルド生成物のrss.xmlを誤検知するため<a>を使う */}
        <a className={styles.socialLink} href={rssUrl} title="RSS">
          <RssIcon className={styles.socialIcon} />
        </a>
      </div>
    </Section>
  );
}

export default function BlogSideMenu({
  sidebar,
}: {
  sidebar: SidebarProp;
}): ReactNode {
  // offsetで右端に寄せ、本文との間に余白を置く
  return (
    <aside className="col col--3 col--offset-1">
      <div className={clsx(styles.sideMenu, 'thin-scrollbar')}>
        {sidebar && sidebar.items.length > 0 && (
          <RecentPostsSection sidebar={sidebar} />
        )}
        <LinksSection />
      </div>
    </aside>
  );
}
