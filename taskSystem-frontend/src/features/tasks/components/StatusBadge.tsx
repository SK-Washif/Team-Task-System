import { STATUS_LABEL, type TaskStatus } from "../types/task.types";

const DOT_COLOR: Record<TaskStatus, string> = {
    backlog: "bg-stage-backlog",
    "in-progress": "bg-stage-progress",
    review: "bg-stage-review",
    done: "bg-stage-done",
};

export function StatusBadge({ status }: { status: TaskStatus }) {
    return (
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[status]}`} aria-hidden="true" />
            {STATUS_LABEL[status]}
        </span>
    );
}
