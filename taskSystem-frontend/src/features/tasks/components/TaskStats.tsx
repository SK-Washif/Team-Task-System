import { useMemo } from "react";
import type { Task } from "../types/task.types";
import { isOverdue } from "../utils/task.utils";

interface TaskStatsProps {
  tasks: Task[];
  onFilterClick: (kind: "overdue" | "unassigned" | "urgent") => void;
}

export function TaskStats({ tasks, onFilterClick }: TaskStatsProps) {
  const counts = useMemo(() => {
    return {
      total: tasks.length,
      overdue: tasks.filter(isOverdue).length,
      unassigned: tasks.filter((t) => !t.ownerName && t.status !== "done").length,
      urgent: tasks.filter((t) => t.priority === "urgent" && t.status !== "done").length,
    };
  }, [tasks]);

  const items: Array<{
    key: "overdue" | "unassigned" | "urgent";
    label: string;
    value: number;
    tone: string;
  }> = [
    { key: "overdue", label: "Overdue", value: counts.overdue, tone: "text-danger" },
    { key: "unassigned", label: "Unassigned", value: counts.unassigned, tone: "text-ink" },
    { key: "urgent", label: "Urgent", value: counts.urgent, tone: "text-priority-urgent" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Task summary">
      <div className="rounded-md border border-line px-3 py-2 text-sm">
        <span className="font-semibold text-ink">{counts.total}</span>{" "}
        <span className="text-ink-soft">total</span>
      </div>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onFilterClick(item.key)}
          className="rounded-md border border-line px-3 py-2 text-sm transition-colors hover:bg-line-soft active:bg-line focus-ring"
        >
          <span className={`font-semibold ${item.tone}`}>{item.value}</span>{" "}
          <span className="text-ink-soft">{item.label}</span>
        </button>
      ))}
    </div>
  );
}