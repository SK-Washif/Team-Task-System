interface PaginationProps {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
}

const buttonSecondarySm =
    "inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-[13px] font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-ink border-line hover:bg-line-soft active:bg-line";

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(total, page * pageSize);

    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-1 pt-4 sm:flex-row">
            <p className="text-xs text-ink-soft">
                Showing <span className="font-medium text-ink">{start}–{end}</span> of{" "}
                <span className="font-medium text-ink">{total}</span>
            </p>
            <div className="flex items-center gap-2">
                <button
                    className={buttonSecondarySm}
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Previous
                </button>
                <span className="px-1 text-xs text-ink-soft">
                    Page {page} of {totalPages}
                </span>
                <button
                    className={buttonSecondarySm}
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}