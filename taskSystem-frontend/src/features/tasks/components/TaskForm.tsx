import { useState } from "react";

export function TaskForm() {
    const [title, setTitle] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [status, setStatus] = useState("backlog");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [description, setDescription] = useState("");

    return (
        <form className="flex flex-col gap-4">

            <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-soft">Title</label>
                <input
                    className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to get done?"
                    autoFocus
                />
            </div>


            <div className="grid grid-cols-2 gap-3">

                <div>
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Status</span>
                    <select
                        className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="backlog">Backlog</option>
                        <option value="in-progress">In progress</option>
                        <option value="review">In review</option>
                        <option value="done">Done</option>
                    </select>
                </div>

                <div>
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Priority</span>
                    <select
                        className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink transition-colors hover:border-ink-faint focus-ring"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                </div>

            </div>


            <div className="grid grid-cols-2 gap-3">
                <div>
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Owner (optional)</span>
                    <input
                        className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Leave blank if unassigned"
                    />
                </div>

                <div>
                    <span className="mb-1.5 block text-xs font-medium text-ink-soft">Due date (optional)</span>
                    <input
                        className="h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

            </div>



            <div>
                <span className="mb-1.5 block text-xs font-medium text-ink-soft">Description (optional)</span>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors hover:border-ink-faint focus-ring"
                    placeholder="Any context the next person needs"
                />
            </div>


            <div className="mt-1 flex justify-end gap-2">

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-white text-ink border-line hover:bg-line-soft active:bg-line"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed select-none bg-ink text-white border-ink hover:bg-ink-soft active:bg-black"
                >
                    Add task
                </button>
                
            </div>


        </form>
    );
}