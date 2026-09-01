import React from 'react'
import { TaskStats } from '../features/tasks/components/TaskStatus'
import { TaskToolbar } from '../features/tasks/components/TaskToolbar'
import { TaskTable } from '../features/tasks/components/TaskTable'
import { TaskCardList } from '../features/tasks/components/TaskCardList'

export function TaskPage(){
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
                <button className='inline-flex items-center justify-center gap-1.5 h-10 px-4 text-sm font-medium rounded-md border transition-colors focus-ring bg-ink text-white border-ink hover:bg-ink-soft active:bg-black'>
                    Add Task
                </button>
            </div>
        </header>

        <div className='mb-5'>
            <TaskStats/>
        </div>

        <div>
            <TaskToolbar/>
        </div>

        <TaskTable/>
        <TaskCardList/>

        
    </div>
  )
}

