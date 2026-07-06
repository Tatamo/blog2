import React, {type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';
import {
  SocialIconRow,
  RssLink,
  GitHubRepoLink,
} from '@site/src/components/SocialIconLinks';
import styles from './styles.module.css';

// テーマ標準のFooterを上書きし、設定由来のリンク欄の代わりに
// ブログに属するアイコンリンク(RSS・ソースリポジトリ)を表示する
function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, style} = footer;
  return (
    <FooterLayout
      style={style}
      links={
        <SocialIconRow className={styles.footerSocials}>
          <RssLink />
          <GitHubRepoLink />
        </SocialIconRow>
      }
      logo={null}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
