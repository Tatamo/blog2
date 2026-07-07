import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import type {Props as BlogLayoutProps} from '@theme/BlogLayout';
import styles from './styles.module.css';

type SidebarProp = BlogLayoutProps['sidebar'];

function RecentPostsSection({sidebar}: {sidebar: NonNullable<SidebarProp>}) {
  const items = useVisibleBlogSidebarItems(sidebar.items);
  return (
    <section className={styles.menuCard}>
      <div className={clsx(styles.sectionTitle, 'margin-bottom--md')}>
        {sidebar.title}
      </div>
      <BlogSidebarItemList
        items={items}
        ulClassName={clsx(styles.itemList, 'clean-list')}
        liClassName={styles.item}
        linkClassName={styles.itemLink}
        linkActiveClassName={styles.itemLinkActive}
      />
    </section>
  );
}

export default function BlogSideMenu({
  sidebar,
}: {
  sidebar: SidebarProp;
}): ReactNode {
  return (
    <aside className="col col--3 blog-side-col">
      <div className={clsx(styles.sideMenu, 'thin-scrollbar')}>
        <Link className={clsx(styles.menuCard, styles.aboutLink)} to="/about">
          About
        </Link>
        {sidebar && sidebar.items.length > 0 && (
          <RecentPostsSection sidebar={sidebar} />
        )}
      </div>
    </aside>
  );
}
