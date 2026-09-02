import type { Task, TaskPriority, TaskStatus } from "../types/task.types";

// find same combination of data for each reload
function mulberry32(seed: number) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(42);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

const OWNERS = [
    "Farhana Islam",
    "Tanvir Ahmed",
    "Nusrat Jahan",
    "Rakibul Hasan",
    "Mahmudul Hasan Chowdhury-Rahman", // long name (as project description)
    "Sadia Afrin",
    "Imran Kabir",
    "Priya Das",
    undefined, // unassigned
];


const SHORT_TITLES = [
    "Fix login redirect",
    "Update footer links",
    "Rename staging env",
    "Patch CORS config",
    "Add empty state icon",
    "Bump dependency versions",
    "Fix typo in invoice",
    "Close stale branch",
    "Review PR #204",
    "Rotate API keys",
];


const LONG_TITLES = [
    "Investigate intermittent timeout errors reported by the payments team when the queue backs up during month-end reconciliation",
    "Implement responsive authentication dashboard with role-based navigation, session handling, and graceful error recovery for expired tokens",
    "Coordinate with design on the new onboarding flow so first-time users understand workspace permissions before inviting teammates",
    "Migrate the legacy reporting service off the deprecated scheduler library before the vendor's end-of-life date in the spring",
    "Draft the incident postmortem for last week's outage and circulate it to engineering, support, and account management for review",
];


const DESCRIPTIONS = [
    "Customer reported this in the support queue; needs reproduction before we can scope a fix.",
    "Blocked on design review — see thread in the shared workspace.",
    "Nice to have before the release, not a blocker.",
    undefined,
    undefined,
];



const STATUSES: TaskStatus[] = ["backlog", "in-progress", "review", "done"];
const PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];


function isoDaysFromNow(days: number): string {
    const d = new Date();
    d.setHours(9, 0, 0, 0);
    d.setDate(d.getDate() + days);
    return d.toISOString();
}


function buildTask(index: number): Task {

    const status = pick(STATUSES);
    const priority = pick(PRIORITIES);
    const useLongTitle = rand() < 0.12;
    const title = useLongTitle ? pick(LONG_TITLES) : pick(SHORT_TITLES);
    const owner = pick(OWNERS);

    let dueDate: string | undefined;
    const dueRoll = rand();

    if (status === "done") {
        dueDate = rand() < 0.7 ? isoDaysFromNow(-Math.floor(rand() * 60)) : undefined;
    }

    else if (dueRoll < 0.18) {
        dueDate = undefined;
    }

    else if (dueRoll < 0.35) {
        dueDate = isoDaysFromNow(-Math.floor(rand() * 20) - 1); // overdue
    }

    else if (dueRoll < 0.45) {
        dueDate = isoDaysFromNow(0); // today
    }

    else {
        dueDate = isoDaysFromNow(Math.floor(rand() * 90) + 1); // future
    }

    const createdAt = isoDaysFromNow(-Math.floor(rand() * 180) - 1);

    return {

        id: `TSK-${1000 + index}`,
        title: `${title}${useLongTitle ? "" : ""} ${index % 37 === 0 ? "(follow-up)" : ""}`.trim(),
        description: pick(DESCRIPTIONS),
        ownerName: owner,
        status,
        priority,
        dueDate,
        createdAt,

    };
}


export function generateTasks(count = 320): Task[] {
    return Array.from({ length: count }, (_, i) => buildTask(i));
}

export const ALL_OWNERS = Array.from(
    new Set(OWNERS.filter((o): o is string => Boolean(o)))
).sort();