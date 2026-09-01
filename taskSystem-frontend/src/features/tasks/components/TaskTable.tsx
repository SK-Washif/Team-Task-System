import React from 'react'

export function TaskTable() {

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

        {
            id: "TSK-1003",
            title: "Implement responsive authentication dashboard with role-based navigation",
            ownerName: "Mahmudul Hasan Chowdhury-Rahman",
            priority: "urgent",
            dueDate: "2026-09-01",
            status: "review",
        },
    ];

    return (
        <div className="hidden overflow-hidden rounded-lg border border-line md:block">
            <table className="w-full border-collapse text-sm">

                <thead>
                    <tr className="border-b border-line bg-line-soft text-left text-xs font-medium uppercase tracking-wide text-ink-soft">
                        <th className="px-4 py-3 font-medium">Task</th>
                        <th className="px-4 py-3 font-medium">Owner</th>
                        <th className="px-4 py-3 font-medium">Priority</th>
                        <th className="px-4 py-3 font-medium">Due</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-line">
                    {dummyTasks.map((task) => (
                        <tr
                            key={task.id}
                            tabIndex={0}
                            role="button"
                            className="cursor-pointer transition-colors hover:bg-line-soft focus-ring"
                        >

                            <td className="max-w-0 px-4 py-3">
                                <div className="flex items-start gap-2">
                                    {task.dueDate && new Date(task.dueDate) < new Date() && (
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-danger" title="Overdue" />
                                    )}
                                    <div className="min-w-0">
                                        <p className="truncate font-medium text-ink" title={task.title}>
                                            {task.title}
                                        </p>
                                        <p className="text-xs text-ink-faint">{task.id}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="whitespace-nowrap px-4 py-3">
                                {task.ownerName ? (
                                    <span className="text-ink-soft">{task.ownerName}</span>
                                ) : (
                                    <span className="text-ink-faint italic">Unassigned</span>
                                )}
                            </td>

                            <td className="whitespace-nowrap px-4 py-3">
                                <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${task.priority === 'urgent' ? 'text-priority-urgent border-red-200 bg-red-50' :
                                    task.priority === 'high' ? 'text-priority-high border-orange-200 bg-orange-50' :
                                        task.priority === 'medium' ? 'text-priority-medium border-blue-200 bg-blue-50' :
                                            'text-ink-soft border-line'
                                    }`}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                            </td>

                            <td className="whitespace-nowrap px-4 py-3">
                                <span className="text-ink-soft">
                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                                </span>
                            </td>

                            <td className="whitespace-nowrap px-4 py-3">
                                <div className="flex items-center gap-2">

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

                                    <select className="h-8 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink transition-colors hover:border-ink-faint focus-ring">
                                        <option value="backlog">Backlog</option>
                                        <option value="in-progress">In progress</option>
                                        <option value="review">In review</option>
                                        <option value="done">Done</option>
                                    </select>

                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

