import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'わたしろぐ2',
  tagline: '私録その2',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://tatamo.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/blog2/',
  trailingSlash: false,

  // GitHub pages deployment config.
  organizationName: 'Tatamo', // Usually your GitHub org/user name.
  projectName: 'blog2', // Usually your repo name.

  onBrokenLinks: 'throw',

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
          blogTitle: 'わたしろぐ2',
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
      items: [
        {to: '/about', label: 'About', position: 'right'},
      ],
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
