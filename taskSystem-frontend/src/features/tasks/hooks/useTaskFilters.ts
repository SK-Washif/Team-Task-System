import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import type {
    SortDirection,
    SortKey,
    TaskFilters,
    TaskPriority,
    TaskStatus,
} from "../types/task.types";

// Default filter values used when there is no filter in the URL
const DEFAULTS: TaskFilters = {
    q: "",
    status: "all",
    priority: "all",
    owner: "all",
    overdueOnly: false,
    sort: "dueDate",
    dir: "asc",
    page: 1,
    pageSize: 20,
};

// Allowed status values
const STATUS_VALUES: TaskStatus[] = ["backlog", "in-progress", "review", "done"];
// Allowed priority values
const PRIORITY_VALUES: TaskPriority[] = ["low", "medium", "high", "urgent"];
// Allowed sorting options
const SORT_VALUES: SortKey[] = ["dueDate", "priority", "createdAt", "title"];

export function useTaskFilters() {
    // Read filter values from the URL and update the URL
    const [params, setParams] = useSearchParams();

    // Convert URL parameters into our TaskFilters object
    const filters: TaskFilters = useMemo(() => {

        // Read individual values from the URL
        const status = params.get("status");
        const priority = params.get("priority");
        const sort = params.get("sort");
        const dir = params.get("dir");
        const page = Number(params.get("page"));

        return {
            // Search text, or use empty string if it is missing
            q: params.get("q") ?? DEFAULTS.q,

            // Use the URL status only if it is a valid status
            status: (STATUS_VALUES as string[]).includes(status ?? "")
                ? (status as TaskStatus)
                : "all",

            // Use the URL priority only if it is valid    
            priority: (PRIORITY_VALUES as string[]).includes(priority ?? "")
                ? (priority as TaskPriority)
                : "all",

            // Read selected owner from the URL
            owner: params.get("owner") ?? DEFAULTS.owner,

            // "overdue=1" means overdue filter is enabled
            overdueOnly: params.get("overdue") === "1",

            // Use the URL sort option only if it is valid
            sort: (SORT_VALUES as string[]).includes(sort ?? "")
                ? (sort as SortKey)
                : DEFAULTS.sort,

            // Only "desc" is accepted; otherwise use "asc"
            dir: dir === "desc" ? "desc" : ("asc" as SortDirection),

            // Use the URL page if it is a valid positive number
            page: Number.isFinite(page) && page > 0 ? page : DEFAULTS.page,
            // Page size always stays at 20
            pageSize: DEFAULTS.pageSize,

        };
    }, [params]);


    // Update one or more filters and save them in the URL
    function patch(next: Partial<TaskFilters>, opts: { resetPage?: boolean } = {}) {

        // Combine current filters with the new values
        // When a filter changes, page resets to 1 by default
        const merged = { ...filters, ...next, ...(opts.resetPage !== false && !("page" in next) ? { page: 1 } : {}) };
        // Create a new URL query string
        const sp = new URLSearchParams();

        // Only add values to the URL when they are not default values
        if (merged.q) sp.set("q", merged.q);
        if (merged.status !== "all") sp.set("status", merged.status);
        if (merged.priority !== "all") sp.set("priority", merged.priority);
        if (merged.owner !== "all") sp.set("owner", merged.owner);
        // Use "1" in the URL when overdue filter is enabled
        if (merged.overdueOnly) sp.set("overdue", "1");
        if (merged.sort !== DEFAULTS.sort) sp.set("sort", merged.sort);
        if (merged.dir !== DEFAULTS.dir) sp.set("dir", merged.dir);
        if (merged.page !== 1) sp.set("page", String(merged.page));
        // Update the browser URL with the new filters
        setParams(sp, { replace: false });
    }

    // Remove all filters and return to the default state
    function reset() {
        setParams(new URLSearchParams());
    }


    // Check if the user currently has any active search/filter
    const hasActiveFilters =
        filters.q !== "" ||
        filters.status !== "all" ||
        filters.priority !== "all" ||
        filters.owner !== "all" ||
        filters.overdueOnly;


    // Return everything needed by the task page/components
    return { filters, patch, reset, hasActiveFilters };
}