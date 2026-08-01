// pages/api/cron-explain.js
// Parses a cron expression server-side (cron-parser + cronstrue) so the
// client bundle doesn't have to ship luxon + the parser libraries.
import { explainCron } from '../../lib/cronExplain';
import { rateLimit } from '../../lib/rateLimit';

const VALID_TIMEZONES = new Set([
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Kolkata',
  'Asia/Tokyo',
  'Australia/Sydney',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'cron-explain', points: 30, duration: 60 }))) return;

  const { expression, tz } = req.body || {};
  if (!expression || typeof expression !== 'string' || expression.trim().length === 0) {
    return res.status(400).json({ error: 'Cron expression is required.' });
  }
  if (expression.length > 200) {
    return res.status(400).json({ error: 'Expression too long (max 200 characters).' });
  }
  const timezone = VALID_TIMEZONES.has(tz) ? tz : 'UTC';

  const result = explainCron(expression, { tz: timezone });
  if (!result.valid) {
    return res.status(400).json({ error: result.error });
  }
  return res.json(result);
}
