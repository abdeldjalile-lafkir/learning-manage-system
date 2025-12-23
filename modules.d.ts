declare module "next-compose-plugins" {
  const composePlugins: (...plugins: unknown[]) => unknown;
  export = composePlugins;
}

declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
}
