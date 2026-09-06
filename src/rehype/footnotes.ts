import type {Element, Root, RootContent} from 'hast';

/**
 * 脚注まわりの調整を行う rehype プラグイン。
 *
 * 1. 本文中の注釈番号(a[data-footnote-ref])に、対応する脚注の本文を
 *    title 属性として埋め込む。マウスオーバーでブラウザ標準の
 *    ツールチップとして内容が表示される。脚注の本体はページ末尾の
 *    section[data-footnotes] にあり、番号のリンクとは DOM 上で離れているため、
 *    ビルド時に文字列をコピーしてくる必要がある。
 * 2. 注釈番号が[^1][^2]のように直に連続する箇所の2つ目に印を付ける。
 *    「1と2」が「12」に見えないよう custom.css で間隔をあけるためだが、
 *    CSSの隣接セレクタは要素どうしの隣接しか見ないため、間にテキストのある
 *    (=本文中で離れている)注釈番号まで対象になってしまう。
 *    「間に何もない」の判定はここで行う。
 */

/** 注釈番号が直に連続するときの2つ目に付くクラス。custom.css と対で使う */
const ADJACENT_REF_CLASS = 'footnote-ref-adjacent';

const isElement = (node: RootContent | Root): node is Element =>
  node.type === 'element';

const hasProperty = (element: Element, name: string): boolean =>
  element.properties != null && name in element.properties;

/** 本文中の注釈番号(上付きの<sup>)かどうか */
const isFootnoteRef = (node: RootContent): boolean =>
  isElement(node) &&
  node.tagName === 'sup' &&
  node.children.some((child) => isElement(child) && hasProperty(child, 'dataFootnoteRef'));

/** 要素の文字列表現。戻りリンク(↩)は脚注の内容ではないので除く */
function textOf(node: RootContent | Root): string {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.type === 'element' && hasProperty(node, 'dataFootnoteBackref')) {
    return '';
  }
  if (node.type === 'element' || node.type === 'root') {
    return node.children.map(textOf).join('');
  }
  return '';
}

function markAdjacentRefs(children: RootContent[]): void {
  children.forEach((child, index) => {
    if (index === 0 || !isFootnoteRef(child) || !isFootnoteRef(children[index - 1]!)) {
      return;
    }
    const sup = child as Element;
    const className = sup.properties.className;
    sup.properties.className = Array.isArray(className)
      ? [...className, ADJACENT_REF_CLASS]
      : [ADJACENT_REF_CLASS];
  });
}

export default function rehypeFootnotes() {
  return (tree: Root): void => {
    /** 脚注定義の id → 内容の文字列 */
    const definitions = new Map<string, string>();
    /** title を付ける対象。定義より先に出現するので一旦ためておく */
    const references: Element[] = [];

    const collect = (node: RootContent | Root, inFootnotes: boolean): void => {
      let inside = inFootnotes;
      if (isElement(node)) {
        if (hasProperty(node, 'dataFootnotes')) {
          inside = true;
        }
        if (hasProperty(node, 'dataFootnoteRef')) {
          references.push(node);
        } else if (inside && node.tagName === 'li') {
          const id = node.properties?.id;
          if (typeof id === 'string') {
            definitions.set(id, textOf(node).replace(/\s+/g, ' ').trim());
          }
        }
      }
      if (isElement(node) || node.type === 'root') {
        markAdjacentRefs(node.children);
        node.children.forEach((child) => collect(child, inside));
      }
    };
    collect(tree, false);

    for (const reference of references) {
      const href = reference.properties?.href;
      if (typeof href !== 'string' || !href.startsWith('#')) {
        continue;
      }
      const text = definitions.get(decodeURIComponent(href.slice(1)));
      if (text) {
        reference.properties.title = text;
      }
    }
  };
}
