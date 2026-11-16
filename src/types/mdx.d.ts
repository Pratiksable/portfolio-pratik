// Journal articles are MDX modules. Each module's default export is the
// article body as a React component.
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXContent: ComponentType;
  export default MDXContent;
}
