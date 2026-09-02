import type { Task, TaskFilters } from "../types/task.types";
import { PRIORITY_ORDER } from "../types/task.types";
import { isOverdue } from "./task.utils";

export function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
    let result = tasks;

    //Search (q)
    if (filters.q.trim()) {
        const q = filters.q.trim().toLowerCase();
        result = result.filter(
            (t) =>
                t.title.toLowerCase().includes(q) ||
                t.id.toLowerCase().includes(q) ||
                (t.ownerName ?? "").toLowerCase().includes(q)
        );
    }

    //filter status
    if (filters.status !== "all") {
        result = result.filter((t) => t.status === filters.status);
    }

    // filter priority
    if (filters.priority !== "all") {
        result = result.filter((t) => t.priority === filters.priority);
    }

    // filter owner
    if (filters.owner !== "all") {
        result =
            filters.owner === "unassigned"
                ? result.filter((t) => !t.ownerName)
                : result.filter((t) => t.ownerName === filters.owner);
    }

    // filter only overdue
    if (filters.overdueOnly) {
        result = result.filter(isOverdue);
    }

    // sorting asc, dsc
    const dir = filters.dir === "asc" ? 1 : -1;
    result = [...result].sort((a, b) => {
        switch (filters.sort) {
            case "title":
                return a.title.localeCompare(b.title) * dir;
            case "priority":
                return (PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority)) * dir;
            case "createdAt":
                return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
            case "dueDate":
            default: {
                if (!a.dueDate && !b.dueDate) return 0;
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir;
            }
        }
    });

    return result;
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
}