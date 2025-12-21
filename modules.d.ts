declare module "next-compose-plugins" {
  const composePlugins: (...plugins: unknown[]) => unknown;
  export = composePlugins;
}

declare module "some-other-module" {
  const whatever: unknown;
  export = whatever;
}

// Add more module declarations as needed
