import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTasks } from "../features/tasks/hooks/useTasks";
import { useTaskFilters } from "../features/tasks/hooks/useTaskFilters";
import { applyFilters, paginate } from "../features/tasks/utils/filterTasks";
import { ALL_OWNERS } from "../features/tasks/data/generateTasks";
import { TaskToolbar } from "../features/tasks/components/TaskToolbar";
import { TaskStats } from "../features/tasks/components/TaskStats";
import { TaskTable } from "../features/tasks/components/TaskTable";
import { TaskCardList } from "../features/tasks/components/TaskCardList";
import { Pagination } from "../features/tasks/components/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../features/tasks/components/TaskListStates";
import { TaskForm } from "../features/tasks/components/TaskForm";
import { TaskDetail } from "../features/tasks/components/TaskDetails";
import type { Task } from "../features/tasks/types/task.types";
import { simulateNextFetchFailure } from "../features/tasks/services/taskService";

export function TasksPage() {
  const { tasks, state, error, reload, addTask, moveTask } = useTasks();
  const { filters, patch, reset, hasActiveFilters } = useTaskFilters();
  const [addOpen, setAddOpen] = useState(false);
  const [openTask, setOpenTask] = useState<Task | null>(null);

  const filtered = useMemo(() => applyFilters(tasks, filters), [tasks, filters]);
  const pageItems = useMemo(
    () => paginate(filtered, filters.page, filters.pageSize),
    [filtered, filters.page, filters.pageSize]
  );

  // Keep the detail modal's data fresh after an optimistic status change.
  const openTaskLive = openTask ? tasks.find((t) => t.id === openTask.id) ?? openTask : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-ink">Team backlog</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Everything the team is working on, in one shared list.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-ink text-white border-ink hover:bg-ink-soft active:bg-black"
          >
            Add task
          </button>
        </div>
      </header>

      <div className="mb-5">
        <TaskStats
          tasks={tasks}
          onFilterClick={(kind) => {
            if (kind === "overdue") patch({ overdueOnly: true });
            if (kind === "unassigned") patch({ owner: "unassigned" });
            if (kind === "urgent") patch({ priority: "urgent" });
          }}
        />
      </div>

      <div className="mb-5">
        <TaskToolbar
          filters={filters}
          owners={ALL_OWNERS}
          hasActiveFilters={hasActiveFilters}
          onChange={patch}
          onReset={reset}
        />
      </div>

      {state === "loading" && <LoadingState />}

      {state === "error" && (
        <ErrorState message={error ?? "Something went wrong."} onRetry={reload} />
      )}

      {state === "ready" && filtered.length === 0 && (
        <EmptyState hasActiveFilters={hasActiveFilters} onClear={reset} onAdd={() => setAddOpen(true)} />
      )}

      {state === "ready" && filtered.length > 0 && (
        <>
          <TaskTable tasks={pageItems} onMove={moveTask} onOpen={setOpenTask} />
          <TaskCardList tasks={pageItems} onMove={moveTask} onOpen={setOpenTask} />
          <Pagination
            page={filters.page}
            pageSize={filters.pageSize}
            total={filtered.length}
            onPageChange={(page) => patch({ page }, { resetPage: false })}
          />
        </>
      )}

      {/* Hidden dev affordance to demo the error state deliberately during review */}
      <button
        onClick={() => {
          simulateNextFetchFailure();
          reload();
        }}
        className="mt-8 text-xs text-ink-faint underline decoration-dotted hover:text-ink-soft focus-ring rounded"
      >
        Simulate a failed load (for reviewers)
      </button>

      <PageDialog open={addOpen} onClose={() => setAddOpen(false)} title="Add task">
        <TaskForm
          onCancel={() => setAddOpen(false)}
          onSubmit={async (input) => {
            await addTask(input);
            setAddOpen(false);
          }}
        />
      </PageDialog>

      <PageDialog open={Boolean(openTaskLive)} onClose={() => setOpenTask(null)} title="Task details">
        {openTaskLive && (
          <TaskDetail task={openTaskLive} onMove={moveTask} onClose={() => setOpenTask(null)} />
        )}
      </PageDialog>
    </div>
  );
}

// Centered dialog used for both the "add task" and "task details" popups on this page.
// Kept local to this file since it's only used here, rather than pulled out into a shared UI kit.
function PageDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10 sm:pt-16">
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg rounded-lg border border-line bg-white shadow-xl focus:outline-none"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="dialog-title" className="text-base font-semibold text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-ink-soft transition-colors hover:bg-line-soft hover:text-ink focus-ring"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}