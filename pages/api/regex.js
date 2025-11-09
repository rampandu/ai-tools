// pages/api/regex.js
// Deterministic regex generator — no external APIs required.

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { prompt } = req.body || {};
  if (!prompt || String(prompt).trim().length < 3) return res.status(400).json({ error: 'Prompt required (≥3 chars)' });

  try {
    const lower = String(prompt).toLowerCase();

    // Common templates
    const templates = {
      email: {
        pattern: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`,
        explain: 'Matches common email addresses (basic validation).'
      },
      indian_phone: {
        pattern: `^(?:\\+91|91)?[6-9]\\d{9}$`,
        explain: 'Matches Indian mobile numbers (optionally with +91 or 91).'
      },
      international_phone: {
        pattern: `^\\+?[1-9]\\d{1,14}$`,
        explain: 'E.164 international phone number format.'
      },
      date_dd_mm_yyyy: {
        pattern: `^(0?[1-9]|[12][0-9]|3[01])[-/.](0?[1-9]|1[012])[-/.](19|20)?\\d\\d$`,
        explain: 'Matches dates in DD-MM-YYYY or similar separators.'
      },
      iso_date: {
        pattern: `^\\d{4}-\\d{2}-\\d{2}$`,
        explain: 'Matches ISO date YYYY-MM-DD.'
      },
      ipv4: {
        pattern: `^((25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d?\\d)$`,
        explain: 'Matches IPv4 addresses.'
      },
      url: {
        pattern: `^(https?:\\/\\/)?([\\w\\-]+)\\.([\\w\\.]{2,})([\\w\\-\\./?%&=]*)?$`,
        explain: 'Basic URL matching (http/https optional).'
      },
      hex_color: {
        pattern: `^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$`,
        explain: 'Matches 3 or 6 digit hex color with optional #.'
      },
      uuid: {
        pattern: `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`,
        explain: 'Matches UUID v4-like format.'
      },
      digits_only: {
        pattern: `^\\d+$`,
        explain: 'Matches strings containing only digits.'
      },
      alpha_numeric: {
        pattern: `^[a-zA-Z0-9]+$`,
        explain: 'Matches alphanumeric strings without spaces.'
      }
    };

    // Heuristics: map keywords -> templates
    const mapping = [
      { keywords: ['email', 'e-mail'], key: 'email' },
      { keywords: ['indian phone', 'indian mobile', 'indian phone number', 'india phone', 'india mobile', 'phone india'], key: 'indian_phone' },
      { keywords: ['phone', 'mobile', 'international phone', 'e164', 'e.164'], key: 'international_phone' },
      { keywords: ['date dd-mm', 'dd-mm-yyyy', 'dd/mm/yyyy', 'dd mm yyyy', 'date dd-mm-yyyy', 'date dd/mm/yyyy'], key: 'date_dd_mm_yyyy' },
      { keywords: ['iso date', 'yyyy-mm-dd', 'iso date', 'iso'], key: 'iso_date' },
      { keywords: ['ipv4', 'ip v4', 'ip address'], key: 'ipv4' },
      { keywords: ['url', 'link', 'website'], key: 'url' },
      { keywords: ['hex color', 'hexcolour', 'hex color', 'color hex'], key: 'hex_color' },
      { keywords: ['uuid', 'guid'], key: 'uuid' },
      { keywords: ['digits only', 'only digits', 'numbers only'], key: 'digits_only' },
      { keywords: ['alphanumeric', 'alpha numeric', 'alnum'], key: 'alpha_numeric' }
    ];

    // Quick keyword detection
    for (const m of mapping) {
      for (const kw of m.keywords) {
        if (lower.includes(kw)) {
          const out = templates[m.key];
          return res.json({ regex: out.pattern, explanation: out.explain, matched: m.key });
        }
      }
    }

    // Smart parse: "match 3 digits" / "match exactly 4 digits"
    const qtyMatch = lower.match(/(\bexactly\s+)?(\d+)\s+(digits|numbers|chars|characters)\b/);
    if (qtyMatch) {
      const num = parseInt(qtyMatch[2], 10);
      return res.json({ regex: `^\\d{${num}}$`, explanation: `Matches exactly ${num} digits.` });
    }

    // Range example: "match 4 to 6 digits"
    const rangeMatch = lower.match(/(\d+)\s*(?:to|-)\s*(\d+)\s+(digits|numbers|chars|characters)/);
    if (rangeMatch) {
      const a = parseInt(rangeMatch[1], 10);
      const b = parseInt(rangeMatch[2], 10);
      return res.json({ regex: `^\\d{${a},${b}}$`, explanation: `Matches between ${a} and ${b} digits.` });
    }

    // Custom generic: "match words only" or "letters and spaces"
    if (/letters only|letters and spaces|alpha and spaces|letters spaces/.test(lower)) {
      return res.json({ regex: `^[A-Za-z\\s]+$`, explanation: 'Matches letters and spaces only.' });
    }

    // If user asks 'extract between' or 'capture group'
    const captureMatch = lower.match(/capture (.+) between (.+) and (.+)/);
    if (captureMatch) {
      // not perfect but provide a safe capturing pattern
      return res.json({ regex: `${captureMatch[2].trim()}(.+?)${captureMatch[3].trim()}`, explanation: `Captures text between '${captureMatch[2].trim()}' and '${captureMatch[3].trim()}'.` });
    }

    // Fallback: suggest a general pattern or ask user to be specific
    return res.json({
      regex: null,
      explanation: 'Could not determine a specific regex from the prompt. Try keywords: email, Indian phone, date DD-MM-YYYY, ipv4, url, hex color, uuid, digits only, alphanumeric, or provide exact requirements (e.g., "exactly 10 digits").'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
