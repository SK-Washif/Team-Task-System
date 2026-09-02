import React, { type RefObject } from "react";

import {
    PRIORITY_LABEL,
    PRIORITY_ORDER,
    STATUS_LABEL,
    STATUS_ORDER,
    type TaskFilters,
} from "../types/task.types";

interface FilterFieldsProps {
    filters: TaskFilters;
    owners: string[];
    onChange: (next: Partial<TaskFilters>) => void;
    layout?: "row" | "stack";
    firstFilterRef?: RefObject<HTMLSelectElement | null>;
}

export function FilterFields({
    filters,
    owners,
    onChange,
    layout = "row",
    firstFilterRef,
}: FilterFieldsProps) {
    const wrapClass = layout === "row" ? "flex flex-wrap gap-2" : "flex flex-col gap-4";
    const fieldClass = layout === "row" ? "w-40" : "w-full";

    return (
        <div className={wrapClass}>
            <Field label="Status" layout={layout} className={fieldClass}>
                <select
                    ref={layout === "stack" ? (firstFilterRef as any) : undefined}
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint"
                    value={filters.status}
                    onChange={(e) => onChange({ status: e.target.value as TaskFilters["status"] })}
                    aria-label="Filter by status"
                >
                    <option value="all">All statuses</option>
                    {STATUS_ORDER.map((s) => (
                        <option key={s} value={s}>
                            {STATUS_LABEL[s]}
                        </option>
                    ))}
                </select>
            </Field>

            <Field label="Priority" layout={layout} className={fieldClass}>
                <select
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint"
                    value={filters.priority}
                    onChange={(e) => onChange({ priority: e.target.value as TaskFilters["priority"] })}
                    aria-label="Filter by priority"
                >
                    <option value="all">All priorities</option>
                    {PRIORITY_ORDER.map((p) => (
                        <option key={p} value={p}>
                            {PRIORITY_LABEL[p]}
                        </option>
                    ))}
                </select>
            </Field>

            <Field label="Owner" layout={layout} className={fieldClass}>
                <select
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint"
                    value={filters.owner}
                    onChange={(e) => onChange({ owner: e.target.value })}
                    aria-label="Filter by owner"
                >
                    <option value="all">Everyone</option>
                    <option value="unassigned">Unassigned</option>
                    {owners.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </Field>

            <Field label="Sort by" layout={layout} className={fieldClass}>
                <select
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint"
                    value={filters.sort}
                    onChange={(e) => onChange({ sort: e.target.value as TaskFilters["sort"] })}
                    aria-label="Sort by"
                >
                    <option value="dueDate">Due date</option>
                    <option value="priority">Priority</option>
                    <option value="createdAt">Date created</option>
                    <option value="title">Title</option>
                </select>
            </Field>

            <Field label="Direction" layout={layout} className={fieldClass}>
                <select
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint"
                    value={filters.dir}
                    onChange={(e) => onChange({ dir: e.target.value as TaskFilters["dir"] })}
                    aria-label="Sort direction"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </Field>

            <label className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-ink transition-colors hover:bg-line-soft has-focus-visible:outline-2 has-focus-visible:outline-ink">
                <input
                    type="checkbox"
                    checked={filters.overdueOnly}
                    onChange={(e) => onChange({ overdueOnly: e.target.checked })}
                    className="h-4 w-4 accent-ink"
                />
                Overdue only
            </label>
        </div>
    );
}

function Field({
    label,
    layout,
    className,
    children,
}: {
    label: string;
    layout: "row" | "stack";
    className: string;
    children: React.ReactNode;
}) {
    if (layout === "row") {
        return <div className={className}>{children}</div>;
    }
    return (
        <div className={className}>
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
            {children}
        </div>
    );
}