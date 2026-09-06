import React, {type ReactNode} from 'react';

// 引用元の表記。引用ブロックの直後に置いて使う
//
//   > 引用本文……
//
//   <QuoteSource>『書名』 p.406</QuoteSource>
//
// 出典は引用の面の外(下)に置く見せ方なので、引用を包む必要がなく単独で成立する。
// スタイルは引用本体との位置関係で決まるため、CSSモジュールではなく
// src/css/custom.css の .quote-source にまとめている
export default function QuoteSource({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <p className="quote-source">{children}</p>;
}
