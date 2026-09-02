import type { Task } from "../types/task.types";

const DAY_MS = 24 * 60 * 60 * 1000;

// chech task overdue 
export function isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === "done") return false;
    return new Date(task.dueDate).getTime() < startOfToday();
}

// check due date today or not 
export function isDueToday(task: Task): boolean {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate).getTime();
    return due >= startOfToday() && due < startOfToday() + DAY_MS;
}

function startOfToday(): number {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

// Format month date, year  
export function formatDueDate(iso?: string): string {
    if (!iso) return "No due date";
    const d = new Date(iso);
    const today = new Date();
    const sameYear = d.getFullYear() === today.getFullYear();
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: sameYear ? undefined : "numeric",
    });
}


// when the task create (day ago) 
export function formatRelativeCreated(iso: string): string {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / DAY_MS);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}