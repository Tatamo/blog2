import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Navbar/MobileSidebar/Layout';

// テーマ標準のMobileSidebar/Layoutを上書きし、サブメニュー用の2枚目の
// パネルを描画しない。ブログ専用構成ではサブメニュー(docsサイドバー等)に
// 中身が入ることがなく、「メインメニューに戻る」ボタンだけが残るため
export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu: _secondaryMenu,
}: Props): ReactNode {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
      )}>
      {header}
      <div className="navbar-sidebar__items">
        <div
          className={clsx(
            ThemeClassNames.layout.navbar.mobileSidebar.panel,
            'navbar-sidebar__item menu',
          )}>
          {primaryMenu}
        </div>
      </div>
    </div>
  );
}
