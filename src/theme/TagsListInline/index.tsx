import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Tag from '@theme/Tag';
import type {Props} from '@theme/TagsListInline';

import styles from './styles.module.css';

// テーマ標準のTagsListInlineを上書きし、「タグ:」のラベルを表示せず
// タグのリンクだけを並べる
export default function TagsListInline({tags}: Props): ReactNode {
  return (
    <ul className={clsx(styles.tags, 'padding--none')}>
      {tags.map((tag) => (
        <li key={tag.permalink} className={styles.tag}>
          <Tag {...tag} />
        </li>
      ))}
    </ul>
  );
}
