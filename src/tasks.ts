export type Task = Readonly<{
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
}>;

export type TaskList = Readonly<{ nextId: number; tasks: readonly Task[] }>;

export const emptyList: TaskList = { nextId: 1, tasks: [] };

/** Adds a task to the end of the list. The title is trimmed and must not be empty. */
export function addTask(list: TaskList, title: string, now: Date = new Date()): TaskList {
  const trimmed = title.trim();
  if (!trimmed) throw new Error("A task needs a title.");
  const task: Task = {
    id: list.nextId,
    title: trimmed,
    done: false,
    createdAt: now.toISOString(),
  };
  return { nextId: list.nextId + 1, tasks: [...list.tasks, task] };
}

/** Marks one task done. Unknown ids are an error. */
export function completeTask(list: TaskList, id: number): TaskList {
  if (!list.tasks.some((task) => task.id === id))
    throw new Error(`No task ${id}.`);
  return {
    ...list,
    tasks: list.tasks.map((task) =>
      task.id === id ? { ...task, done: true } : task,
    ),
  };
}

/** The tasks still to do, oldest first. */
export function openTasks(list: TaskList): readonly Task[] {
  return list.tasks.filter((task) => !task.done);
}

/** The earliest-created open task, retaining the first task on ties. */
export function oldestOpen(list: TaskList): Task | undefined {
  let oldest: Task | undefined;
  for (const task of list.tasks) {
    if (!task.done && (!oldest || Date.parse(task.createdAt) < Date.parse(oldest.createdAt))) {
      oldest = task;
    }
  }
  return oldest;
}
