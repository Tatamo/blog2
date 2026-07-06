import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import ContentVisibility from '@theme/ContentVisibility';
import EditMetaRow from '@theme/EditMetaRow';
import type {Props} from '@theme/MDXPage';

// テーマ標準のMDXPageを上書きする:
// - ブログページと同じコンテナ・カラム構成にして、本文の横位置と幅を揃える
//   (標準はcontainer--fluid+中央寄せで、ブログとは本文の位置がずれる)
// - 目次(toc)はサイト方針に合わせて描画しない
export default function MDXPage(props: Props): ReactNode {
  const {content: MDXPageContent} = props;
  const {metadata, assets} = MDXPageContent;
  const {
    title,
    editUrl,
    description,
    frontMatter,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;
  const {keywords, wrapperClassName} = frontMatter;
  const image = assets.image ?? frontMatter.image;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  return (
    <HtmlClassNameProvider
      className={clsx(
        wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
        ThemeClassNames.page.mdxPage,
      )}>
      <Layout>
        <PageMetadata
          title={title}
          description={description}
          keywords={keywords}
          image={image}
        />
        <main className="container margin-vert--lg">
          <div className="row">
            <div className="col blog-main-col">
              <ContentVisibility metadata={metadata} />
              <article>
                <MDXContent>
                  <MDXPageContent />
                </MDXContent>
              </article>
              {canDisplayEditMetaRow && (
                <EditMetaRow
                  className={clsx(
                    'margin-top--sm',
                    ThemeClassNames.pages.pageFooterEditMetaRow,
                  )}
                  editUrl={editUrl}
                  lastUpdatedAt={lastUpdatedAt}
                  lastUpdatedBy={lastUpdatedBy}
                />
              )}
            </div>
          </div>
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
