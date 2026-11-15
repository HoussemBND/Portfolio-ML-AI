"use client";

import { useState } from "react";

/**
 * Click-to-load demo for project write-ups (docs/PRD.md, FR-4). Nothing is
 * fetched from the demo host until the visitor asks for it, which keeps
 * the page fast. Use it in a project's .mdx file:
 *
 *   <Demo src="https://your-space.hf.space" title="Drift report demo" />
 *
 * `fallback` is an optional image or GIF under /public, shown before the
 * demo loads and useful when the demo host is asleep.
 */
export function Demo({
  src,
  title,
  fallback,
  height = 560,
}: {
  src: string;
  title: string;
  fallback?: string;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const host = (() => {
    try {
      return new URL(src).host;
    } catch {
      return src;
    }
  })();

  if (loaded) {
    return (
      <div className="mt-6">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{ height }}
          className="w-full rounded-lg border border-line bg-surface"
        />
        <p className="mt-2 text-sm text-muted">
          Not loading?{" "}
          <a href={src} className="text-accent underline underline-offset-4">
            Open the demo in a new page
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface">
      {fallback && (
        // Local preview image of unknown size, so a plain img is used.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fallback} alt={`Preview of ${title}`} loading="lazy" className="w-full" />
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted">
            Interactive demo, loaded from {host} when you start it.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Load demo
        </button>
      </div>
    </div>
  );
}
