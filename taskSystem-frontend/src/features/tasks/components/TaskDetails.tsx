import type { Task, TaskStatus } from "../types/task.types";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { StatusSelect } from "./StatusSelect";
import { formatDueDate, formatRelativeCreated, isOverdue } from "../utils/task.utils";

interface TaskDetailProps {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
  onClose: () => void;
}

export function TaskDetail({ task, onMove, onClose }: TaskDetailProps) {
  const overdue = isOverdue(task);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-ink-faint">{task.id}</p>
        <h3 className="mt-0.5 text-base font-medium text-ink">{task.title}</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        {overdue && (
          <span className="rounded-full border border-red-200 bg-danger-bg px-2.5 py-1 text-xs font-medium text-danger">
            Overdue
          </span>
        )}
      </div>

      {task.description && (
        <p className="rounded-md bg-line-soft px-3 py-2.5 text-sm text-ink-soft">{task.description}</p>
      )}

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs text-ink-faint">Owner</dt>
          <dd className="mt-0.5 text-ink">
            {task.ownerName ?? <span className="italic text-ink-faint">Unassigned</span>}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-faint">Due date</dt>
          <dd className={`mt-0.5 ${overdue ? "font-medium text-danger" : "text-ink"}`}>
            {formatDueDate(task.dueDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-faint">Created</dt>
          <dd className="mt-0.5 text-ink">{formatRelativeCreated(task.createdAt)}</dd>
        </div>
      </dl>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">Move to</span>
          <StatusSelect value={task.status} taskTitle={task.title} onChange={(status) => onMove(task.id, status)} />
        </div>
        <button
          onClick={onClose}
          className="text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-ring rounded-md px-2 py-1"
        >
          Close
        </button>
      </div>
    </div>
  );
}
