import type { ComponentProps } from "react";
import { Demo } from "./demo";

/** Styles for the write-up body of a project page (rendered from MDX). */
export const mdxComponents = {
  Demo,
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 text-lg font-semibold" {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="mt-4 leading-relaxed" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-1.5 pl-5 leading-relaxed" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-accent underline underline-offset-4" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-4 border-l-2 border-line pl-4 text-muted" {...props} />
  ),
  code: (props: ComponentProps<"code">) => (
    <code
      className="rounded bg-idle-soft px-1 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border-b border-line py-2 pr-4 font-semibold" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-b border-line py-2 pr-4 align-top" {...props} />
  ),
  img: (props: ComponentProps<"img">) => (
    // Project images are local files of unknown size, so a plain img is used.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-6 rounded-lg border border-line"
      loading="lazy"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};
