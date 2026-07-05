import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

// テーマ標準のNavbarLogoを上書きし、ロゴ画像の代わりに
// 大きなサイトタイトルとサブタイトル(tagline)を縦に並べて表示する
export default function NavbarLogo(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const homeUrl = useBaseUrl('/');
  return (
    <Link to={homeUrl} className={clsx('navbar__brand', styles.brand)}>
      <span className={styles.title}>{siteConfig.title}</span>
      {siteConfig.tagline && (
        <span className={styles.tagline}>{siteConfig.tagline}</span>
      )}
    </Link>
  );
}
