import { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FilterFields } from "./FilterFields";
import type { TaskFilters } from "../types/task.types";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useFocusTrap } from "../../../hooks/useFocusTrap";

const inputClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring disabled:bg-line-soft disabled:text-ink-faint";
const buttonBase =
  "inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none";
const buttonSecondary = "bg-white text-ink border-line hover:bg-line-soft active:bg-line";
const buttonPrimary = "bg-ink text-white border-ink hover:bg-ink-soft active:bg-black";
const buttonGhostSm =
  "inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-[13px] font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-transparent text-ink-soft border-transparent hover:bg-line-soft hover:text-ink active:bg-line";

interface TaskToolbarProps {
  filters: TaskFilters;
  owners: string[];
  hasActiveFilters: boolean;
  onChange: (next: Partial<TaskFilters>) => void;
  onReset: () => void;
}

export function TaskToolbar({ filters, owners, hasActiveFilters, onChange, onReset }: TaskToolbarProps) {
  const [q, setQ] = useState(filters.q);
  const debouncedQ = useDebouncedValue(q, 250);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const firstFilterRef = useRef<HTMLSelectElement>(null);

  // Focus trap for the drawer
  const drawerRef = useFocusTrap({
    isOpen: drawerOpen,
    onClose: () => setDrawerOpen(false),
    initialFocusRef: firstFilterRef,
    returnFocusRef: filterButtonRef,
  });

  useEffect(() => setQ(filters.q), [filters.q]);
  useEffect(() => {
    if (debouncedQ !== filters.q) onChange({ q: debouncedQ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const activeCount = [
    filters.status !== "all",
    filters.priority !== "all",
    filters.owner !== "all",
    filters.overdueOnly,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
          <input
            className={`${inputClass} pl-9`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or owner…"
            aria-label="Search tasks"
          />
        </div>

        <button
          ref={filterButtonRef}
          className={`${buttonBase} ${buttonSecondary} sm:hidden shrink-0`}
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
        >
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
      </div>

      {/* Desktop / tablet: inline filter row */}
      <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-3">
        <FilterFields filters={filters} owners={owners} onChange={onChange} layout="row" />
        {hasActiveFilters && (
          <button className={buttonGhostSm} onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>

      {/* Mobile filter drawer (bottom sheet) with focus trap */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center">
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={() => setDrawerOpen(false)} />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filter tasks"
            className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-xl border border-line bg-white shadow-xl sm:max-w-sm sm:rounded-xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-base font-semibold text-ink">Filter tasks</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close"
                className="rounded-md p-1 text-ink-soft transition-colors hover:bg-line-soft hover:text-ink focus-ring"
              >
                <IoMdClose size={20} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <FilterFields
                filters={filters}
                owners={owners}
                onChange={onChange}
                layout="stack"
                firstFilterRef={firstFilterRef}
              />
            </div>
            <div className="shrink-0 border-t border-line px-5 py-3">
              <div className="flex gap-2">
                {hasActiveFilters && (
                  <button className={`${buttonBase} ${buttonSecondary} flex-1`} onClick={onReset}>
                    Clear all
                  </button>
                )}
                <button
                  className={`${buttonBase} ${buttonPrimary} flex-1`}
                  onClick={() => setDrawerOpen(false)}
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}