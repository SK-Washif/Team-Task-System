import { IoMdClose } from "react-icons/io";

interface TaskDetailProps {
    onClose: () => void;
}

export function TaskDetail({ onClose }: TaskDetailProps) {
    const task = {
        id: "TSK-1001",
        title: "Fix login redirect",
        description: "Customer reported this in the support queue; needs reproduction before we can scope a fix.",
        ownerName: "Farhana Islam",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-09-15",
        createdAt: "2026-08-20",
    };

    return (
        <div className="flex flex-col gap-4">

            <div>
                <p className="text-xs text-ink-faint">{task.id}</p>
                <h3 className="mt-0.5 text-base font-medium text-ink">{task.title}</h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-stage-progress" />
                    In progress
                </span>

                <span className="inline-flex items-center whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-priority-high">
                    High
                </span>
            </div>
            

            <p className="rounded-md bg-line-soft px-3 py-2.5 text-sm text-ink-soft">{task.description}</p>


            <dl className="grid grid-cols-2 gap-3 text-sm">

                <div>
                    <dt className="text-xs text-ink-faint">Owner</dt>
                    <dd className="mt-0.5 text-ink">{task.ownerName}</dd>
                </div>

                <div>
                    <dt className="text-xs text-ink-faint">Due date</dt>
                    <dd className="mt-0.5 text-ink">Sep 15, 2026</dd>
                </div>

                <div>
                    <dt className="text-xs text-ink-faint">Created</dt>
                    <dd className="mt-0.5 text-ink">13d ago</dd>
                </div>

            </dl>


            <div className="flex items-center justify-between border-t border-line pt-4">
                <div>
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Move to</span>
                    <select className="h-8 rounded-md border border-line bg-white px-2 text-xs font-medium text-ink transition-colors hover:border-ink-faint focus-ring">
                        <option value="backlog">Backlog</option>
                        <option value="in-progress">In progress</option>
                        <option value="review">In review</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <button
                    onClick={onClose}
                    className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-ring rounded-md px-2 py-1"
                >
                    <IoMdClose size={16} />
                    Close
                </button>

            </div>
            
        </div>
    );
}