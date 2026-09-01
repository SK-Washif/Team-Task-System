import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { FilterFields } from './FilterFields'

export function TaskToolbar() {
    return (
        <div className="flex flex-col gap-3">

            {/* Search Bar  */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
                    <input className="h-10 w-full rounded-md border border-line bg-white px-3 pl-9 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                        placeholder="Search by title or owner…"
                        aria-label="Search tasks" />
                </div>

                {/* Filter Button for Mobile */}
                <button className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring bg-white text-ink border-line hover:bg-line-soft active:bg-line sm:hidden shrink-0">
                    Filters
                </button>

            </div>

            {/* Filter for Desktop  */}
            <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-3">
                <div className="text-sm text-ink-soft">
                    <FilterFields/>
                </div>
            </div>
        </div>
    )
}