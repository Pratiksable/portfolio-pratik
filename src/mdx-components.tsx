import Link from "next/link";
import { isValidElement, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/journal/callout";
import { CodeBlock } from "@/components/journal/code-block";
import { FlowDiagram } from "@/components/journal/flow-diagram";

// Text content of a React tree. Used to copy a code block's source exactly as
// highlighted, without the markup.
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textOf).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return "";
}

// Every element an article can use. Articles never style their own content:
// presentation lives here, so a new article is just Markdown and components.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ id, children }) => (
      <h2 id={id} className="scroll-mt-24 mt-16 font-display text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ id, children }) => (
      <h3 id={id} className="scroll-mt-24 mt-12 font-display text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="mt-5 leading-relaxed">{children}</p>,
    ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
    ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l border-border pl-5 text-text-muted">{children}</blockquote>
    ),
    a: ({ href, children }) =>
      href && href.startsWith("/") ? (
        <Link href={href} className="text-accent underline underline-offset-4 hover:text-accent-strong">
          {children}
        </Link>
      ) : (
        <a href={href} className="text-accent underline underline-offset-4 hover:text-accent-strong">
          {children}
        </a>
      ),
    pre: (props) => {
      const { children, ...rest } = props;
      const language = (rest as Record<string, unknown>)["data-language"];
      return (
        <CodeBlock code={textOf(children)} language={typeof language === "string" ? language : null}>
          <pre {...rest} className="p-4 text-sm leading-relaxed">
            {children}
          </pre>
        </CodeBlock>
      );
    },
    Callout,
    FlowDiagram,
    ...components,
  };
}
