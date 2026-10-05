import { describe, expect, it } from "vitest";
import { addTask, completeTask, emptyList, openTasks, totalCount } from "./tasks";

const at = new Date("2026-01-01T00:00:00.000Z");

describe("a task list", () => {
  it("counts an empty list as zero", () => {
    expect(totalCount(emptyList)).toBe(0);
  });

  it("counts all three tasks, including completed tasks", () => {
    const list = addTask(addTask(addTask(emptyList, "a", at), "b", at), "c", at);
    expect(totalCount(completeTask(list, 2))).toBe(3);
  });

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
