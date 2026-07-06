import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useVisibleBlogSidebarItems,
  BlogSidebarItemList,
} from '@docusaurus/plugin-content-blog/client';
import type {Props as BlogLayoutProps} from '@theme/BlogLayout';
import styles from './styles.module.css';

type SidebarProp = BlogLayoutProps['sidebar'];

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

export default function BlogSideMenu({
  sidebar,
}: {
  sidebar: SidebarProp;
}): ReactNode {
  return (
    <aside className="col col--3 blog-side-col">
      <div className={clsx(styles.sideMenu, 'thin-scrollbar')}>
        {sidebar && sidebar.items.length > 0 && (
          <RecentPostsSection sidebar={sidebar} />
        )}
      </div>
    </aside>
  );
}
