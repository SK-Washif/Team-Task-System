export function LoadingState() {
    return (
        <div className="divide-y divide-line border border-line rounded-lg" aria-busy="true" aria-live="polite">
            <span className="sr-only">Loading tasks…</span>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-4 py-4">
                    <div className="animate-pulse rounded bg-line-soft h-4 w-1/3" aria-hidden="true" />
                    <div className="animate-pulse rounded bg-line-soft h-4 w-20 hidden sm:block" aria-hidden="true" />
                    <div className="animate-pulse rounded bg-line-soft h-4 w-24 hidden md:block" aria-hidden="true" />
                    <div className="animate-pulse rounded bg-line-soft h-4 w-16 ml-auto" aria-hidden="true" />
                </div>
            ))}
        </div>
    );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <div
            role="alert"
            className="flex flex-col items-center gap-3 rounded-lg border border-red-200 bg-danger-bg px-6 py-12 text-center"
        >
            <p className="text-sm font-medium text-danger">Couldn't load tasks</p>
            <p className="max-w-sm text-sm text-ink-soft">{message}</p>
            <button
                onClick={onRetry}
                className="mt-1 inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-danger border-line hover:bg-danger-bg active:bg-red-100"
            >
                Try again
            </button>
        </div>
    );
}

export function EmptyState({
    hasActiveFilters,
    onClear,
    onAdd,
}: {
    hasActiveFilters: boolean;
    onClear: () => void;
    onAdd: () => void;
}) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-line px-6 py-14 text-center">
            {hasActiveFilters ? (
                <>
                    <p className="text-sm font-medium text-ink">No tasks match your filters</p>
                    <p className="max-w-sm text-sm text-ink-soft">
                        Try a different search term, or clear filters to see the full list.
                    </p>
                    <button
                        onClick={onClear}
                        className="mt-1 inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-ink border-line hover:bg-line-soft active:bg-line"
                    >
                        Clear filters
                    </button>
                </>
            ) : (
                <>
                    <p className="text-sm font-medium text-ink">No tasks yet</p>
                    <p className="max-w-sm text-sm text-ink-soft">
                        Add the first piece of work to get this board started.
                    </p>
                    <button
                        onClick={onAdd}
                        className="mt-1 inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-ink text-white border-ink hover:bg-ink-soft active:bg-black"
                    >
                        Add task
                    </button>
                </>
            )}
        </div>
    );
}
