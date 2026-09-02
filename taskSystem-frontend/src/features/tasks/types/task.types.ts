export type TaskStatus = "backlog" | "in-progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
    id: string;
    title: string;
    description?: string;
    ownerName?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string; // ISO date
    createdAt: string; // ISO date
}

export const STATUS_ORDER: TaskStatus[] = [
    "backlog",
    "in-progress",
    "review",
    "done",
];

export const STATUS_LABEL: Record<TaskStatus, string> = {
    backlog: "Backlog",
    "in-progress": "In progress",
    review: "In review",
    done: "Done",
};

export const PRIORITY_ORDER: TaskPriority[] = [
    "low",
    "medium",
    "high",
    "urgent",
];

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    urgent: "Urgent",
};

export type SortKey = "dueDate" | "priority" | "createdAt" | "title";
export type SortDirection = "asc" | "desc";

export interface TaskFilters {
    q: string;
    status: TaskStatus | "all";
    priority: TaskPriority | "all";
    owner: string; // "all" | "unassigned" | exact owner name
    overdueOnly: boolean;
    sort: SortKey;
    dir: SortDirection;
    page: number;
    pageSize: number;
}