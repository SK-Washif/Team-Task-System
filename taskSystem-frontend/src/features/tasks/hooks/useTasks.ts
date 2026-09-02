import { useCallback, useEffect, useState } from "react";
import { createTask, fetchTasks, updateTaskStatus } from "../services/taskService";
import type { Task, TaskStatus } from "../types/task.types";

// Track the current loading state of the task data
type LoadState = "idle" | "loading" | "error" | "ready";


export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [state, setState] = useState<LoadState>("idle");
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks and update the loading/error state
    const load = useCallback(async () => {
        setState("loading");
        setError(null);
        try {
            const data = await fetchTasks();
            setTasks(data);
            setState("ready");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setState("error");
        }
    }, []);


    // Load tasks when the hook is first used
    useEffect(() => {
        load();
    }, [load]);

    // Create a new task and add it to the beginning of the list
    const addTask = useCallback(async (input: Omit<Task, "id" | "createdAt">) => {
        const created = await createTask(input);
        setTasks((prev) => [created, ...prev]);
        return created;
    }, []);

    // Update the UI immediately, then save the status change
    const moveTask = useCallback(async (id: string, status: TaskStatus) => {
        const previous = tasks;
        // Optimistic update — UI (dynamic)
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
        try {
            await updateTaskStatus(id, status);
        } catch {
            // Restore the previous list if the update fails
            setTasks(previous);
        }
    }, [tasks]);

    return { tasks, state, error, reload: load, addTask, moveTask };
}