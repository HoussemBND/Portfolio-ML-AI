import type { Status } from "@/lib/projects";

const styles: Record<Status, { label: string; className: string; dot: string }> = {
  live: {
    label: "Live",
    className: "bg-accent-soft text-accent",
    dot: "bg-accent",
  },
  "in-progress": {
    label: "In progress",
    className: "bg-warn-soft text-warn",
    dot: "bg-warn",
  },
  planned: {
    label: "Planned",
    className: "bg-idle-soft text-idle",
    dot: "border border-idle",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 font-mono text-xs font-medium ${s.className}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
