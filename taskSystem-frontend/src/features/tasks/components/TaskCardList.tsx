import { type RefObject } from "react";
import type { Task, TaskStatus } from "../types/task.types";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { StatusSelect } from "./StatusSelect";
import { formatDueDate, isDueToday, isOverdue } from "../utils/task.utils";

interface TaskCardListProps {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onOpen: (task: Task) => void;
  cardRefs?: RefObject<Map<string, HTMLDivElement>>;
}

export function TaskCardList({ tasks, onMove, onOpen, cardRefs }: TaskCardListProps) {
  const setCardRef = (id: string) => (el: HTMLDivElement | null) => {
    if (!cardRefs?.current) return;
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  };

  return (
    <div className="flex flex-col gap-2 md:hidden">
      {tasks.map((task) => {
        const overdue = isOverdue(task);
        const dueToday = isDueToday(task);
        return (
          <div
            key={task.id}
            ref={setCardRef(task.id)}
            className="rounded-lg border border-line bg-white p-4 transition-colors hover:bg-line-soft"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open ${task.title}`}
              onClick={() => onOpen(task)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onOpen(task);
              }}
              className="cursor-pointer text-left focus-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug text-ink">{task.title}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{task.id}</p>
                </div>
                {overdue && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger" aria-label="Overdue" />
                )}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <StatusBadge status={task.status} />
                <PriorityBadge priority={task.priority} />
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                <span className="text-ink-soft">
                  {task.ownerName ?? <span className="italic text-ink-faint">Unassigned</span>}
                </span>
                <span
                  className={
                    overdue
                      ? "font-medium text-danger"
                      : dueToday
                        ? "font-medium text-priority-high"
                        : "text-ink-soft"
                  }
                >
                  {formatDueDate(task.dueDate)}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <StatusSelect
                value={task.status}
                taskTitle={task.title}
                onChange={(status) => onMove(task.id, status)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}