import { PRIORITY_LABEL, type TaskPriority } from "../types/task.types";

const STYLES: Record<TaskPriority, string> = {
  low: "text-ink-soft border-line",
  medium: "text-priority-medium border-blue-200 bg-blue-50",
  high: "text-priority-high border-orange-200 bg-orange-50",
  urgent: "text-priority-urgent border-red-200 bg-red-50",
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[priority]}`}
    >
      {PRIORITY_LABEL[priority]}
    </span>
  );
}
