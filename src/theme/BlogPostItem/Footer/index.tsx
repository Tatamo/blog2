import React, {useEffect, useRef, type ReactNode} from 'react';
import FooterOriginal from '@theme-original/BlogPostItem/Footer';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const WIDGETS_SRC = 'https://platform.x.com/widgets.js';

declare global {
  interface Window {
    twttr?: {widgets: {load: (element?: HTMLElement | null) => void}};
  }
}

// X公式のシェアボタン(widgets.jsがアンカーを埋め込みボタンに変換する)。
// SPAのページ遷移で後からマウントされた場合はスクリプトの自動走査に
// 拾われないため、公式APIのtwttr.widgets.loadを明示的に呼ぶ
function XShareButton({url}: {url: string}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load(containerRef.current);
      return;
    }
    if (!document.querySelector(`script[src="${WIDGETS_SRC}"]`)) {
      // スクリプトの初回実行時にDOM全体が走査されるため、
      // マウント済みのこのボタンはloadを呼ばなくても処理される
      const script = document.createElement('script');
      script.src = WIDGETS_SRC;
      script.async = true;
      script.setAttribute('charset', 'utf-8');
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <a
        href="https://x.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-size="large"
        data-url={url}
        data-via="__tatamo__"
        data-show-count="false">
        Post
      </a>
    </div>
  );
}

// テーマ標準のBlogPostItem/Footerをラップし、個別記事ページの末尾に
// Xでポストするボタンを追加する(一覧ページには表示しない)
export default function FooterWrapper(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {siteConfig} = useDocusaurusContext();

  if (!isBlogPostPage) {
    return <FooterOriginal />;
  }

  return (
    <>
      <FooterOriginal />
      <div className={styles.share}>
        <XShareButton url={siteConfig.url + metadata.permalink} />
      </div>
    </>
  );
}
