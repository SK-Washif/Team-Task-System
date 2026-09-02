import { type RefObject } from "react";
import type { Task, TaskStatus } from "../types/task.types";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { StatusSelect } from "./StatusSelect";
import { formatDueDate } from "../utils/task.utils";
import { isOverdue, isDueToday } from "../utils/task.utils";

interface TaskTableProps {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
  onOpen: (task: Task) => void;
  rowRefs?: RefObject<Map<string, HTMLTableRowElement>>;
}

export function TaskTable({ tasks, onMove, onOpen, rowRefs }: TaskTableProps) {
  const setRowRef = (id: string) => (el: HTMLTableRowElement | null) => {
    if (!rowRefs?.current) return;
    if (el) {
      rowRefs.current.set(id, el);
    } else {
      rowRefs.current.delete(id);
    }
  };

  return (
    <div className="hidden overflow-hidden rounded-lg border border-line md:block">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-line-soft text-left text-xs font-medium uppercase tracking-wide text-ink-soft">
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Due</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-line">
          {tasks.map((task) => {
            const overdue = isOverdue(task);
            const dueToday = isDueToday(task);
            return (
              <tr
                key={task.id}
                ref={setRowRef(task.id)}
                tabIndex={0}
                role="row"
                aria-label={`Open ${task.title}`}
                onClick={() => onOpen(task)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onOpen(task);
                }}
                className="cursor-pointer transition-colors hover:bg-line-soft focus-ring focus-visible:bg-line-soft"
              >
                <td className="max-w-0 px-4 py-3">
                  <div className="flex items-start gap-2">
                    {overdue && (
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger"
                        title="Overdue"
                        aria-label="Overdue"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink" title={task.title}>
                        {task.title}
                      </p>
                      <p className="text-xs text-ink-faint">{task.id}</p>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  {task.ownerName ? (
                    <span className="text-ink-soft">{task.ownerName}</span>
                  ) : (
                    <span className="text-ink-faint italic">Unassigned</span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>

                <td className="whitespace-nowrap px-4 py-3">
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
                </td>

                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={task.status} />
                    <StatusSelect
                      value={task.status}
                      taskTitle={task.title}
                      onChange={(status) => onMove(task.id, status)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}