import React from 'react'

export function Pagination() {
    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-1 pt-4 sm:flex-row">

            <p className="text-xs text-ink-soft">
                Showing <span className="font-medium text-ink">1–20</span> of{" "}
                <span className="font-medium text-ink">320</span>
            </p>

            <div className="flex items-center gap-2">

                <button className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-[13px] font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-ink border-line hover:bg-line-soft active:bg-line" disabled>
                    Previous
                </button>
                <span className="px-1 text-xs text-ink-soft">
                    Page 1 of 16
                </span>
                <button className="inline-flex items-center justify-center gap-1.5 h-8 px-2.5 text-[13px] font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-ink border-line hover:bg-line-soft active:bg-line">
                    Next
                </button>

            </div>

            
        </div>
    )
}

