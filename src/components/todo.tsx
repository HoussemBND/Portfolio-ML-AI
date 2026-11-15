/** Visible marker for a fact the PRD lists as an open TODO. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-dashed border-warn bg-warn-soft px-1.5 py-0.5 align-middle font-mono text-[0.72em] font-medium leading-tight text-warn">
      TODO: {children}
    </span>
  );
}
