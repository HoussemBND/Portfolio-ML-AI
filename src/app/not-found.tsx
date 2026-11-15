import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-warn">404 · test failed</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        This page does not exist
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        The address may be mistyped, or the page may have moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Go to home
        </Link>
        <Link
          href="/projects"
          className="rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink"
        >
          View projects
        </Link>
      </div>
    </section>
  );
}
