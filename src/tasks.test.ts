import { describe, expect, it } from "vitest";
import { addTask, completeTask, emptyList, oldestOpen, openTasks } from "./tasks";

const at = new Date("2026-01-01T00:00:00.000Z");

describe("a task list", () => {
  it("adds tasks in order with increasing ids", () => {
    const list = addTask(addTask(emptyList, " Write tests ", at), "Ship", at);
    expect(list.tasks.map(({ id, title }) => [id, title])).toEqual([
      [1, "Write tests"],
      [2, "Ship"],
    ]);
  });

  it("refuses an empty title", () => {
    expect(() => addTask(emptyList, "   ", at)).toThrow("A task needs a title.");
  });

  it("completes a task and leaves the others open", () => {
    const list = completeTask(addTask(addTask(emptyList, "a", at), "b", at), 1);
    expect(openTasks(list).map((task) => task.title)).toEqual(["b"]);
  });

  it("refuses to complete a task that is not there", () => {
    expect(() => completeTask(emptyList, 7)).toThrow("No task 7.");
  });
});

describe("oldestOpen", () => {
  it("finds the earliest-created open task regardless of list order without changing the input", () => {
    const list = addTask(
      addTask(addTask(emptyList, "newest", new Date("2026-03-01")), "oldest", at),
      "middle",
      new Date("2026-02-01"),
    );
    const before = structuredClone(list);

    expect(oldestOpen(list)).toBe(list.tasks[1]);
    expect(list).toEqual(before);
  });

  it("ignores completed tasks older than every open task", () => {
    const list = completeTask(
      addTask(addTask(emptyList, "completed", at), "open", new Date("2026-02-01")),
      1,
    );

    expect(oldestOpen(list)).toBe(list.tasks[1]);
  });

  it("returns undefined for an empty list", () => {
    expect(oldestOpen(emptyList)).toBeUndefined();
  });

  it("returns undefined when all tasks are completed", () => {
    expect(oldestOpen(completeTask(addTask(emptyList, "completed", at), 1))).toBeUndefined();
  });

  it("retains the first encountered task when timestamps are equal", () => {
    const list = addTask(addTask(emptyList, "first", at), "second", at);

    expect(oldestOpen(list)).toBe(list.tasks[0]);
  });
});
