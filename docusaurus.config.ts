import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {ElementContent} from 'hast';
import rehypeBlockquoteCitation from './src/rehype/blockquoteCitation';
import rehypeFootnotes from './src/rehype/footnotes';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'わたしろぐ2',
  tagline: '私録その2',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blog.tatamo.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: 'Tatamo', // Usually your GitHub org/user name.
  projectName: 'blog2', // Usually your repo name.

  onBrokenLinks: 'throw',

  markdown: {
    // 脚注(remark-gfm)の既定値は英語表記なので日本語に差し替える
    remarkRehypeOptions: {
      // ページ末尾の脚注セクションの見出し。custom.css の .sr-only で
      // 視覚的には隠し、読み上げにだけ残している
      footnoteLabel: '脚注',
      footnoteBackLabel: (referenceIndex: number, rereferenceIndex: number) =>
        `本文に戻る ${referenceIndex + 1}${
          rereferenceIndex > 1 ? `-${rereferenceIndex}` : ''
        }`,
      // 戻りリンクの記号。U+21A9 は絵文字表現を持つため、環境によっては
      // 絵文字フォントで描画される。U+FE0E(テキスト異体字セレクタ)を
      // 付けて文字としての表示を指示する。
      // 同じ脚注が複数箇所から参照されたときに連番を添えるのは既定と同じ
      footnoteBackContent: (
        _referenceIndex: number,
        rereferenceIndex: number,
      ): ElementContent | ElementContent[] => {
        const backArrow: ElementContent = {type: 'text', value: '↩\uFE0E'};
        return rereferenceIndex > 1
          ? [
              backArrow,
              {
                type: 'element',
                tagName: 'sup',
                properties: {},
                children: [{type: 'text', value: String(rereferenceIndex)}],
              },
            ]
          : backArrow;
      },
    },
  },

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: {
          routeBasePath: '/',
          rehypePlugins: [rehypeFootnotes, rehypeBlockquoteCitation],
          blogTitle: 'わたしろぐ2',
          blogDescription: "Tatamo's weblog",
          blogSidebarTitle: '最近の記事',
          showReadingTime: false,
          postsPerPage: 5,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'わたしろぐ2',
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          rehypePlugins: [rehypeFootnotes, rehypeBlockquoteCitation],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      items: [],
    },
    footer: {
      copyright: `Copyright © ${new Date().getFullYear()} Tatamo. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
