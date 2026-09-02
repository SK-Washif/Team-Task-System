import { STATUS_LABEL, STATUS_ORDER, type TaskStatus } from "../types/task.types";

interface StatusSelectProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  taskTitle: string;
}

// A plain, fast control for moving work between stages — quicker than
// dragging a card, and it works identically with a mouse, a thumb, or a
// keyboard.
export function StatusSelect({ value, onChange, taskTitle }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
      aria-label={`Change status for ${taskTitle}`}
      onClick={(e) => e.stopPropagation()}
      className="h-8 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink transition-colors hover:border-ink-faint focus-ring"
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
