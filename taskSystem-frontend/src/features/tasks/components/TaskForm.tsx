import { useId, useState, type RefObject } from "react";
import {
  PRIORITY_LABEL,
  PRIORITY_ORDER,
  STATUS_LABEL,
  STATUS_ORDER,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "../types/task.types";

const inputClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint";
const selectClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint";
const buttonBase =
  "inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none";
const buttonSecondary = "bg-white text-ink border-line hover:bg-line-soft active:bg-line";
const buttonPrimary = "bg-ink text-white border-ink hover:bg-ink-soft active:bg-black";

interface TaskFormProps {
  onSubmit: (task: Omit<Task, "id" | "createdAt">) => Promise<void>;
  onCancel: () => void;
  firstInputRef?: RefObject<HTMLInputElement | null>;
}

export function TaskForm({ onSubmit, onCancel, firstInputRef }: TaskFormProps) {
  const titleId = useId();
  const [title, setTitle] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [status, setStatus] = useState<TaskStatus>("backlog");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Give the task a title before saving.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        ownerName: ownerName.trim() || undefined,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        description: description.trim() || undefined,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor={titleId} className="mb-1.5 block text-xs font-medium text-ink-soft">
          Title
        </label>
        <input
          ref={firstInputRef}
          id={titleId}
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to get done?"
          autoFocus
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "title-error" : undefined}
        />
        {error && (
          <p id="title-error" role="alert" className="mt-1 text-xs text-danger">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">Status</span>
          <select className={selectClass} value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">Priority</span>
          <select
            className={selectClass}
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
          >
            {PRIORITY_ORDER.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABEL[p]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">Owner (optional)</span>
          <input
            className={inputClass}
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Leave blank if unassigned"
          />
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">Due date (optional)</span>
          <input className={inputClass} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-ink-soft">Description (optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
          placeholder="Any context the next person needs"
        />
      </div>

      <div className="mt-1 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className={`${buttonBase} ${buttonSecondary}`}
        >
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={`${buttonBase} ${buttonPrimary}`}>
          {submitting ? "Adding…" : "Add task"}
        </button>
      </div>
    </form>
  );
}