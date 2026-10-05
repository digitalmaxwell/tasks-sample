import { describe, expect, it } from "vitest";
import { parseDuration } from "./duration";

describe("parsing a short duration", () => {
  it.each([
    ["90s", 90_000],
    ["15m", 900_000],
    ["2h", 7_200_000],
    [" 5m ", 300_000],
  ])("reads %s", (text, expected) => {
    expect(parseDuration(text)).toBe(expected);
  });

  it.each(["", "5", "m", "5 m", "-5m", "1.5h"])("does not understand %j", (text) => {
    expect(parseDuration(text)).toBeNull();
  });
});
