// 画像アセットをインポートしたとき、バンドラーが生成するURL文字列として扱う
declare module '*.png' {
  const url: string;
  export default url;
}

// SVGはSVGR経由でReactコンポーネントとしてインポートされる
declare module '*.svg' {
  import type {ComponentType, SVGProps} from 'react';

  const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
