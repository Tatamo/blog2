import type {Element, Root, RootContent} from 'hast';

/**
 * 引用ブロックの末尾に置いた出典行を figcaption として切り出す rehype プラグイン。
 *
 *   > 引用本文……
 *   >
 *   > — 『書名』 p.406
 *
 * のように、空行で分けた最終段落をダッシュで始めたときだけ出典と見なし、
 *
 *   <figure class="quote"><blockquote>…</blockquote><figcaption>…</figcaption></figure>
 *
 * に組み替える。Markdown に出典を表す記法がないためのつなぎで、HTML としては
 * 引用の帰属を blockquote の外に置くこの形が正しい。目印のダッシュは
 * 「ここから出典」を伝えるためのものなので、表示には残さない。
 */

/** 出典行の目印。全角ダッシュ類とハイフン2つを受け付ける */
const CITATION_MARKER = /^\s*(?:—|―|–|--)\s*/;

const isElement = (node: RootContent): node is Element => node.type === 'element';

/** 出典付きの引用なら figure に組み替えたものを返す。そうでなければ undefined */
function toFigure(blockquote: Element): Element | undefined {
  const elements = blockquote.children.filter(isElement);
  const citation = elements[elements.length - 1];
  // 引用本文が残らない(出典しかない)場合は引用として扱わない
  if (elements.length < 2 || citation?.tagName !== 'p') {
    return undefined;
  }
  const head = citation.children[0];
  if (head?.type !== 'text' || !CITATION_MARKER.test(head.value)) {
    return undefined;
  }
  head.value = head.value.replace(CITATION_MARKER, '');

  // 出典の段落以降(残りは改行のテキストノードのみ)を引用から取り除く
  blockquote.children.splice(blockquote.children.indexOf(citation));

  return {
    type: 'element',
    tagName: 'figure',
    properties: {className: ['quote']},
    children: [
      blockquote,
      {
        type: 'element',
        tagName: 'figcaption',
        properties: {},
        children: citation.children,
      },
    ],
  };
}

export default function rehypeBlockquoteCitation() {
  return (tree: Root): void => {
    const walk = (node: Root | Element): void => {
      node.children = node.children.map((child) => {
        if (!isElement(child)) {
          return child;
        }
        walk(child);
        return child.tagName === 'blockquote' ? toFigure(child) ?? child : child;
      });
    };
    walk(tree);
  };
}
