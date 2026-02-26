// pages/api/cron.js
// Deterministic plain-English → cron expression converter.
// No external APIs required — matches the same pattern as api/regex.js and api/sql.js.

function pad(n) {
  return String(n).padStart(2, '0');
}

const DAY_MAP = {
  sunday: 0, sun: 0,
  monday: 1, mon: 1,
  tuesday: 2, tue: 2,
  wednesday: 3, wed: 3,
  thursday: 4, thu: 4,
  friday: 5, fri: 5,
  saturday: 6, sat: 6,
};

const MONTH_MAP = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
};

function parseTime(text) {
  // "9am", "9:30am", "14:00", "midnight", "noon"
  if (/midnight/.test(text)) return { h: 0, m: 0 };
  if (/noon/.test(text)) return { h: 12, m: 0 };

  let m = text.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
  if (m) {
    let h = parseInt(m[1], 10);
    const min = parseInt(m[2], 10);
    const ampm = (m[3] || '').toLowerCase();
    if (ampm === 'pm' && h !== 12) h += 12;
    if (ampm === 'am' && h === 12) h = 0;
    return { h, m: min };
  }

  m = text.match(/(\d{1,2})\s*(am|pm)/i);
  if (m) {
    let h = parseInt(m[1], 10);
    const ampm = m[2].toLowerCase();
    if (ampm === 'pm' && h !== 12) h += 12;
    if (ampm === 'am' && h === 12) h = 0;
    return { h, m: 0 };
  }

  return null;
}

function parseDays(text) {
  // "every weekday" -> 1-5, "every weekend" -> 0,6, "every monday and friday" -> 1,5
  if (/weekday|work\s*day/.test(text)) return '1-5';
  if (/weekend/.test(text)) return '0,6';

  const found = [];
  for (const [name, num] of Object.entries(DAY_MAP)) {
    if (text.includes(name)) found.push(num);
  }
  // deduplicate and sort
  const unique = [...new Set(found)].sort((a, b) => a - b);
  if (unique.length) return unique.join(',');
  return '*';
}

function buildExplanation(min, hour, dom, month, dow) {
  const parts = [];

  // minute/hour
  if (min === '0' && hour === '*') parts.push('at the start of every hour');
  else if (min === '*' && hour === '*') parts.push('every minute');
  else if (min !== '*' && hour !== '*') {
    const h = parseInt(hour, 10);
    const m = parseInt(min, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    parts.push(`at ${h12}:${pad(m)} ${ampm}`);
  } else if (min !== '*') {
    parts.push(`at minute ${min} of every hour`);
  }

  // dom / dow
  if (dow === '1-5') parts.push('on weekdays (Mon–Fri)');
  else if (dow === '0,6') parts.push('on weekends (Sat & Sun)');
  else if (dow !== '*') {
    const names = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const days = dow.split(',').map(d => names[parseInt(d, 10)]);
    parts.push(`every ${days.join(', ')}`);
  } else if (dom !== '*') {
    parts.push(`on day ${dom} of the month`);
  } else {
    parts.push('every day');
  }

  if (month !== '*') {
    const mnames = ['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const months = month.split(',').map(m => mnames[parseInt(m, 10)]);
    parts.push(`in ${months.join(', ')}`);
  }

  return parts.join(', ') + '.';
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { prompt } = req.body || {};
  if (!prompt || String(prompt).trim().length < 3) {
    return res.status(400).json({ error: 'Prompt required (≥3 chars)' });
  }

  try {
    const lower = String(prompt).toLowerCase().trim();

    // --- shortcut presets ---
    if (/every\s+minute/.test(lower)) {
      return res.json({ cron: '* * * * *', explanation: 'Runs every minute.' });
    }
    if (/every\s+hour/.test(lower) && !/every\s+\d+\s+hour/.test(lower)) {
      return res.json({ cron: '0 * * * *', explanation: 'Runs at the start of every hour.' });
    }
    if (/every\s+day\s+at\s+midnight|daily\s+at\s+midnight/.test(lower)) {
      return res.json({ cron: '0 0 * * *', explanation: 'Runs every day at midnight (00:00).' });
    }
    if (/every\s+sunday\s+at\s+midnight|weekly\s+at\s+midnight/.test(lower)) {
      return res.json({ cron: '0 0 * * 0', explanation: 'Runs every Sunday at midnight.' });
    }
    if (/midnight/.test(lower) && !/at/.test(lower)) {
      return res.json({ cron: '0 0 * * *', explanation: 'Runs every day at midnight (00:00).' });
    }
    if (/noon/.test(lower)) {
      const days = parseDays(lower);
      const cron = `0 12 * * ${days}`;
      return res.json({ cron, explanation: buildExplanation('0', '12', '*', '*', days) });
    }

    // --- every N minutes ---
    let m = lower.match(/every\s+(\d+)\s+minutes?/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n < 1 || n > 59) return res.status(400).json({ error: 'Minute interval must be 1–59.' });
      return res.json({ cron: `*/${n} * * * *`, explanation: `Runs every ${n} minutes.` });
    }

    // --- every N hours ---
    m = lower.match(/every\s+(\d+)\s+hours?/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n < 1 || n > 23) return res.status(400).json({ error: 'Hour interval must be 1–23.' });
      return res.json({ cron: `0 */${n} * * *`, explanation: `Runs once every ${n} hours.` });
    }

    // --- first day of month ---
    if (/first\s+day\s+of\s+(the\s+)?month/.test(lower)) {
      const time = parseTime(lower);
      const h = time ? time.h : 0;
      const min = time ? time.m : 0;
      return res.json({
        cron: `${min} ${h} 1 * *`,
        explanation: buildExplanation(String(min), String(h), '1', '*', '*'),
      });
    }

    // --- last day of month (approximated as 28th for safety) ---
    if (/last\s+day\s+of\s+(the\s+)?month/.test(lower)) {
      const time = parseTime(lower);
      const h = time ? time.h : 0;
      const min = time ? time.m : 0;
      return res.json({
        cron: `${min} ${h} 28 * *`,
        explanation: `Runs on the 28th of every month at ${pad(h)}:${pad(min)} (use 28 as a safe last-day approximation for all months).`,
      });
    }

    // --- specific day of month: "every 15th at 9am" ---
    m = lower.match(/every\s+(\d{1,2})(?:st|nd|rd|th)?(?:\s+of\s+(the\s+)?month)?/);
    const domMatch = m ? parseInt(m[1], 10) : null;
    if (domMatch && domMatch >= 1 && domMatch <= 31) {
      const time = parseTime(lower);
      const h = time ? time.h : 0;
      const min = time ? time.m : 0;
      return res.json({
        cron: `${min} ${h} ${domMatch} * *`,
        explanation: buildExplanation(String(min), String(h), String(domMatch), '*', '*'),
      });
    }

    // --- general: extract time + day of week ---
    const time = parseTime(lower);
    const dow = parseDays(lower);

    if (time) {
      const cron = `${time.m} ${time.h} * * ${dow}`;
      return res.json({ cron, explanation: buildExplanation(String(time.m), String(time.h), '*', '*', dow) });
    }

    // --- "every weekday" / "every monday" without time → midnight ---
    if (dow !== '*') {
      const cron = `0 0 * * ${dow}`;
      return res.json({ cron, explanation: buildExplanation('0', '0', '*', '*', dow) });
    }

    // fallback
    return res.json({
      cron: null,
      explanation:
        'Could not determine a cron expression from the prompt. Try examples like: "every day at 9am", "every weekday at 6:30pm", "every Monday at midnight", "every 15 minutes", "first day of the month at 8am".',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
