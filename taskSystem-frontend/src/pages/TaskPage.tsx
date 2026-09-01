import { useState } from 'react'
import { TaskStats } from '../features/tasks/components/TaskStatus'
import { TaskToolbar } from '../features/tasks/components/TaskToolbar'
import { TaskTable } from '../features/tasks/components/TaskTable'
import { TaskCardList } from '../features/tasks/components/TaskCardList'
import { Pagination } from '../features/tasks/components/Pagination'
import { IoMdClose } from 'react-icons/io'
import { TaskForm } from '../features/tasks/components/TaskForm'
import { TaskDetail } from '../features/tasks/components/TaskDetails'

export function TaskPage() {
    const [addOpen, setAddOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    return (
        <div className='mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8'>

            <header className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                    <h1 className='text-xl font-semibold text-ink'> Team backlog</h1>
                    <p className='mt-1 text-sm text-ink-soft'>
                        Everything the team is working on, in one shared list.
                    </p>
                </div>

                <div className='flex gap-2'>
                    <button
                        onClick={() => setAddOpen(true)}
                        className='inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring bg-ink text-white border-ink hover:bg-ink-soft active:bg-black'>
                        Add Task
                    </button>
                </div>
            </header>

            <div className='mb-5'>
                <TaskStats />
            </div>

            <div>
                <TaskToolbar />
            </div>

            <div onClick={() => setDetailOpen(true)} className="cursor-pointer">
                <TaskTable />
                <TaskCardList />
            </div>
            
            <Pagination />

            {/* Add Task Modal  */}
            {addOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10 sm:pt-16">
                    <div className="absolute inset-0" aria-hidden="true" onClick={() => setAddOpen(false)} />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        className="relative z-10 w-full max-w-lg rounded-lg border border-line bg-white shadow-xl focus:outline-none"
                    >
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <h2 id="dialog-title" className="text-base font-semibold text-ink">
                                Add task
                            </h2>
                            <button
                                onClick={() => setAddOpen(false)}
                                aria-label="Close dialog"
                                className="rounded-md p-1 text-ink-soft transition-colors hover:bg-line-soft hover:text-ink focus-ring"
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                        <div className="px-5 py-4">
                            <TaskForm />
                        </div>
                    </div>
                </div>
            )}

            {/* ===== টাস্ক ডিটেইল মোডাল ===== */}
            {detailOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10 sm:pt-16">
                    <div className="absolute inset-0" aria-hidden="true" onClick={() => setDetailOpen(false)} />
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        className="relative z-10 w-full max-w-lg rounded-lg border border-line bg-white shadow-xl focus:outline-none"
                    >
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <h2 id="dialog-title" className="text-base font-semibold text-ink">
                                Task details
                            </h2>
                            <button
                                onClick={() => setDetailOpen(false)}
                                aria-label="Close dialog"
                                className="rounded-md p-1 text-ink-soft transition-colors hover:bg-line-soft hover:text-ink focus-ring"
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                        <div className="px-5 py-4">
                            <TaskDetail onClose={() => setDetailOpen(false)} />
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}

