import { generateTasks } from "../data/generateTask";
import type { Task } from "../types/task.types";

//  fetchTasks , createTask , updateTaskStatus

let store: Task[] = generateTasks(320); //store fake database
let failNextFetch = false;


const LATENCY_MS = 350; //fake API response 350 milliseconds delay


function delay<T>(value: T, ms = LATENCY_MS): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), ms)); //value return after delay, promise= asynchronous operation simulate
}


export async function fetchTasks(): Promise<Task[]> {
    if (failNextFetch) {
        failNextFetch = false;
        await delay(null, LATENCY_MS);
        throw new Error("Could not reach the task service. Check your connection and try again.");
    }
    return delay([...store]);
}  //error check , error throw


export async function createTask(input: Omit<Task, "id" | "createdAt">): Promise<Task> {
    const task: Task = {
        ...input,
        id: `TSK-${1000 + store.length + Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
    };
    store = [task, ...store];
    return delay(task, 250);
} //create new task, property copy in input, store the new task at first


export async function updateTaskStatus(id: string, status: Task["status"]): Promise<Task> {
    store = store.map((t) => (t.id === id ? { ...t, status } : t)); // update to take id using map
    const updated = store.find((t) => t.id === id)!; // find the updated tasks
    return delay(updated, 200);
}


export function simulateNextFetchFailure() {
    failNextFetch = true;
}