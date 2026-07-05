import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useAnchorTargetClassName} from '@docusaurus/theme-common';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import type {Props} from '@theme/Heading';

// テーマ標準のHeadingを上書きし、見出し横のアンカーリンク(#)を出力しない
export default function Heading({as: As, id, ...props}: Props): ReactNode {
  const brokenLinks = useBrokenLinks();
  const anchorTargetClassName = useAnchorTargetClassName(id);

  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return <As {...props} id={undefined} />;
  }

  // アンカー付きURLへのリンク切れチェックが機能するよう、idは本家と同様に登録する
  brokenLinks.collectAnchor(id);

  return (
    <As
      {...props}
      className={clsx('anchor', anchorTargetClassName, props.className)}
      id={id}>
      {props.children}
    </As>
  );
}
