const units: Record<string, number> = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
};

/**
 * Parses a short duration such as "90s", "15m" or "2h" into milliseconds.
 * Returns null for anything it does not understand.
 */
export function parseDuration(text: string): number | null {
  const match = /^(\d+)([smh])$/.exec(text.trim());
  if (!match) return null;
  const unit = units[match[2] ?? ""];
  if (unit === undefined) return null;
  return Number(match[1]) * unit;
}
