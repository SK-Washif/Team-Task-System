export function TaskStats(){
    const counts = {
        total: 320,
        overdue: 24,
        unassigned: 18,
        urgent: 7,
    };

    return(
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Task summary">

            <div className="rounded-md border border-line px-3 py-2 text-sm">
                <span className="font-semibold text-ink"> {counts.total} </span>{" "}
                <span className="text-ink-soft"> total </span>
            </div>

            <button className="rounded-md border border-line px-3 py-2 text-sm transition-colors hover:bg-line-soft active:bg-line focus-ring">
                <span className="font-semibold text-danger"> {counts.overdue} </span>{" "}
                <span className="text-ink-soft"> Overdue </span>
            </button>

            <button className="rounded-md border border-line px-3 py-2 text-sm transition-colors hover:bg-line-soft active:bg-line focus-ring">
                <span className="font-semibold text-ink"> {counts.unassigned} </span>{" "}
                <span className="text-ink-soft"> Unassigned </span>
            </button>

            <button className="rounded-md border border-line px-3 py-2 text-sm transition-colors hover:bg-line-soft active:bg-line focus-ring">
                <span className="font-semibold text-priority-urgent"> {counts.urgent} </span>{" "}
                <span className="text-ink-soft"> Urgent </span>
            </button>

        </div>
    );
}