import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FilterFields } from "./FilterFields";


export function TaskToolbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">

            {/* Search Bar  */}
            <div className="flex gap-2">

                <div className="relative flex-1">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" size={16} />
                    <input
                        className="h-10 w-full rounded-md border border-line bg-white px-3 pl-9 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                        placeholder="Search by title or owner…"
                        aria-label="Search tasks"
                    />

                </div>


                <button
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring bg-white text-ink border-line hover:bg-line-soft active:bg-line sm:hidden shrink-0"
                    onClick={() => setDrawerOpen(true)}>
                    Filters
                </button>

            </div>



            {/* Filter for Desktop */}
            <div className="hidden sm:flex sm:items-center sm:justify-between sm:gap-3">

                <FilterFields />

            </div>



            {/* Filter style for Mobile */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center">
                    <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={() => setDrawerOpen(false)} />
                    <div
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
                            <FilterFields />
                        </div>

                        <div className="shrink-0 border-t border-line px-5 py-3">
                            <button
                                className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none w-full bg-ink text-white border-ink hover:bg-ink-soft active:bg-black"
                                onClick={() => setDrawerOpen(false)}
                            >
                                Show results
                            </button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
}