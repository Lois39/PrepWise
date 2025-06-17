
declare module 'react-helmet' {
  import * as React from 'react';

  interface HelmetProps {
    htmlAttributes?: React.HTMLAttributes<HTMLHtmlElement>;
    title?: string;
    titleTemplate?: string;
    defaultTitle?: string;
    base?: React.BaseHTMLAttributes<HTMLBaseElement>;
    link?: React.LinkHTMLAttributes<HTMLLinkElement>[];
    meta?: React.MetaHTMLAttributes<HTMLMetaElement>[];
    script?: React.ScriptHTMLAttributes<HTMLScriptElement>[];
    noscript?: any;
    style?: React.StyleHTMLAttributes<HTMLStyleElement>[];
    onChangeClientState?: (newState: any, addedTags: any, removedTags: any) => void;
    children?: React.ReactNode;
  }

  export class Helmet extends React.Component<HelmetProps> {
    static renderStatic(): {
      base: any;
      bodyAttributes: any;
      htmlAttributes: any;
      link: any;
      meta: any;
      noscript: any;
      script: any;
      style: any;
      title: any;
    };
  }

  export default Helmet;
}
