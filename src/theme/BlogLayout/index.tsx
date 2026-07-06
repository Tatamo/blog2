import React, {type ReactNode} from 'react';
import Layout from '@theme/Layout';
import BlogSideMenu from '@site/src/components/BlogSideMenu';
import type {Props} from '@theme/BlogLayout';

// テーマ標準のBlogLayoutを上書きする:
// - 左のBlogSidebarを右側のセクション式サイドメニュー(BlogSideMenu)に置き換える
// - 記事ページの目次(toc)は意図的に描画しない
export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc: _toc, children, ...layoutProps} = props;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col blog-main-col">{children}</main>
          <BlogSideMenu sidebar={sidebar} />
        </div>
      </div>
    </Layout>
  );
}
