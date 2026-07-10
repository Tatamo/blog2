import React, {type ReactNode} from 'react';
import {
  SocialIconRow,
  XLink,
  GitHubProfileLink,
  BoothLink,
} from '@site/src/components/SocialIconLinks';
import avatarUrl from '@site/src/assets/avatar.png';
import styles from './styles.module.css';

// Aboutページに置く著者カード。かつてauthors.ymlで表示していた
// 著者情報(アバター・名前・SNSアイコン)と同じ構成
export default function AuthorCard(): ReactNode {
  return (
    <div className={styles.authorCard}>
      <img className={styles.avatar} src={avatarUrl} alt="Tatamoのアバター" />
      <div>
        <div className={styles.name}>Tatamo</div>
        <SocialIconRow>
          <XLink />
          <GitHubProfileLink />
          <BoothLink />
        </SocialIconRow>
      </div>
    </div>
  );
}
