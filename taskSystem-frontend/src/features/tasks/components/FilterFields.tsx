import React from 'react'

export function FilterFields() {
    return (
        <div className="flex flex-wrap gap-2">

            {/* Status */}
            <div className="w-40">

                <select className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring">
                    <option value="all">All statuses</option>
                    <option value="backlog">Backlog</option>
                    <option value="in-progress">In progress</option>
                    <option value="review">In review</option>
                    <option value="done">Done</option>
                </select>

            </div>


            {/* Priority */}
            <div className="w-40">

                <select className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring">
                    <option value="all">All priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>

            </div>


            {/* Owner */}
            <div className="w-40">

                <select className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring">
                    <option value="all">Everyone</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="Farhana Islam">Farhana Islam</option>
                    <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                </select>

            </div>



            {/* Sort by */}
            <div className="w-40">
                <select className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring">
                    <option value="dueDate">Due date</option>
                    <option value="priority">Priority</option>
                    <option value="createdAt">Date created</option>
                    <option value="title">Title</option>
                </select>
            </div>



            {/* Direction */}
            <div className="w-40">
                <select className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>


            {/* Overdue Only */}
            <label className="flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm text-ink transition-colors hover:bg-line-soft">
                <input type="checkbox" className="h-4 w-4 accent-ink" />
                Overdue only
            </label>
        </div>
    );
}
