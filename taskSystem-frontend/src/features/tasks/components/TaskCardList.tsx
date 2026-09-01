import React from 'react'

export function TaskCardList() {

    const dummyTasks = [
        {
            id: "TSK-1001",
            title: "Fix login redirect",
            ownerName: "Farhana Islam",
            priority: "high",
            dueDate: "2026-09-15",
            status: "in-progress",
        },

        {
            id: "TSK-1002",
            title: "Update footer links",
            ownerName: undefined,
            priority: "low",
            dueDate: undefined,
            status: "backlog",
        },
    ];


    return (
        <ul className="flex flex-col gap-2 md:hidden">

            {dummyTasks.map((task) => (
                <li key={task.id} className="rounded-lg border border-line bg-white p-4 transition-colors hover:bg-line-soft">

                    <div className="cursor-pointer text-left focus-ring">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">

                                <p className="text-sm font-medium leading-snug text-ink">{task.title}</p>
                                <p className="mt-0.5 text-xs text-ink-faint">{task.id}</p>

                            </div>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink">
                                <span className={`h-1.5 w-1.5 rounded-full ${task.status === 'done' ? 'bg-stage-done' :
                                        task.status === 'in-progress' ? 'bg-stage-progress' :
                                            task.status === 'review' ? 'bg-stage-review' :
                                                'bg-stage-backlog'
                                    }`} />
                                {task.status === 'in-progress' ? 'In progress' :
                                    task.status === 'review' ? 'In review' :
                                        task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                            </span>

                            <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${task.priority === 'urgent' ? 'text-priority-urgent border-red-200 bg-red-50' :
                                    task.priority === 'high' ? 'text-priority-high border-orange-200 bg-orange-50' :
                                        task.priority === 'medium' ? 'text-priority-medium border-blue-200 bg-blue-50' :
                                            'text-ink-soft border-line'
                                }`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>

                        </div>


                        <div className="mt-3 flex items-center justify-between gap-2 text-xs">

                            <span className="text-ink-soft">
                                {task.ownerName ?? <span className="italic text-ink-faint">Unassigned</span>}
                            </span>
                            <span className="text-ink-soft">
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                            </span>

                        </div>
                    </div>


                    <div className="mt-3">
                        <select className="h-8 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink transition-colors hover:border-ink-faint focus-ring">

                            <option value="backlog">Backlog</option>
                            <option value="in-progress">In progress</option>
                            <option value="review">In review</option>
                            <option value="done">Done</option>

                        </select>
                    </div>

                </li>
            ))}
            
        </ul>
    );
}
