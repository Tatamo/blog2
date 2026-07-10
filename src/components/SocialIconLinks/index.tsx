import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import GitHubIcon from '@theme/Icon/Socials/GitHub';
import XIcon from '@theme/Icon/Socials/X';
import BoothIcon from '@site/src/assets/booth.svg';
import styles from './styles.module.css';

function RssIcon(props: ComponentProps<'svg'>): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44a15.56 15.56 0 0 1 15.56 15.56h-2.83A12.73 12.73 0 0 0 4 7.27V4.44zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
    </svg>
  );
}

// アイコンリンクの横並びの行。中に並べるリンクは呼び出し側が選ぶ。
// アイコンの色は設置場所に馴染むよう周囲から継承する
export function SocialIconRow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): ReactNode {
  return <div className={clsx(styles.socialLinks, className)}>{children}</div>;
}

// ブログのRSSフィード
export function RssLink(): ReactNode {
  const rssUrl = useBaseUrl('/rss.xml');
  return (
    // Linkだとリンク切れチェックがビルド生成物のrss.xmlを誤検知するため<a>を使う
    <a className={styles.socialLink} href={rssUrl} title="RSS">
      <RssIcon className={styles.socialIcon} />
    </a>
  );
}

// 著者(Tatamo)のXアカウント
export function XLink(): ReactNode {
  return (
    <Link
      className={styles.socialLink}
      href="https://x.com/__tatamo__"
      title="X">
      <XIcon className={styles.socialIcon} />
    </Link>
  );
}

// 著者(Tatamo)のGitHubプロフィール
export function GitHubProfileLink(): ReactNode {
  return (
    <Link
      className={styles.socialLink}
      href="https://github.com/Tatamo"
      title="GitHub">
      <GitHubIcon className={styles.socialIcon} />
    </Link>
  );
}

// 著者(Tatamo)のBOOTHショップ
export function BoothLink(): ReactNode {
  return (
    <Link
      className={styles.socialLink}
      href="https://tatamo.booth.pm/"
      title="BOOTH">
      <BoothIcon className={styles.socialIcon} />
    </Link>
  );
}

// ブログのソースリポジトリ
export function GitHubRepoLink(): ReactNode {
  return (
    <Link
      className={styles.socialLink}
      href="https://github.com/Tatamo/blog2"
      title="GitHub">
      <GitHubIcon className={styles.socialIcon} />
    </Link>
  );
}
