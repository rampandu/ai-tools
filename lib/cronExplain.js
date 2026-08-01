// lib/cronExplain.js
// Cron expression -> human-readable description + next run times.
// Used server-side (pages/api/cron-explain.js) so cron-parser + luxon +
// cronstrue don't bloat the client bundle. cron-parser handles the
// calendar/timezone math (validation + next-run computation); cronstrue
// turns the expression into a natural-language sentence.
import { CronExpressionParser } from 'cron-parser';
import cronstrue from 'cronstrue';

const MAX_RUNS = 10;

/**
 * Explain a cron expression: validity, human-readable description, and the
 * next N run times in the given IANA timezone.
 *
 * @param {string} expression - a 5-field or 6-field (with seconds) cron expression
 * @param {{ tz?: string, count?: number }} options
 * @returns {{ valid: true, description: string, nextRuns: string[], timezone: string } | { valid: false, error: string }}
 */
export function explainCron(expression, { tz = 'UTC', count = MAX_RUNS } = {}) {
  const trimmed = (expression || '').trim();
  if (!trimmed) {
    return { valid: false, error: 'Enter a cron expression.' };
  }

  let interval;
  try {
    interval = CronExpressionParser.parse(trimmed, { tz });
  } catch (err) {
    return { valid: false, error: `Invalid cron expression — ${err.message || 'could not parse.'}` };
  }

  let description;
  try {
    description = cronstrue.toString(trimmed);
  } catch (err) {
    description = null;
  }

  const nextRuns = [];
  for (let i = 0; i < count; i += 1) {
    nextRuns.push(interval.next().toISOString());
  }

  return { valid: true, description, nextRuns, timezone: tz };
}

export { MAX_RUNS };
