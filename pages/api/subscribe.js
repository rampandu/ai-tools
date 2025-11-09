// pages/api/subscribe.js
let subscribers = []; // in-memory store — replace with DB in production

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const { email } = req.body || {};
    if (!email || typeof email !== 'string') return res.status(400).json({ error: 'invalid_email' });

    const clean = email.trim().toLowerCase();
    // basic validation
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
    if (!ok) return res.status(400).json({ error: 'invalid_email' });

    if (!subscribers.includes(clean)) subscribers.push(clean);
    // For demo: return current count
    return res.status(200).json({ ok: true, count: subscribers.length });
  } catch (err) {
    console.error('subscribe error', err);
    return res.status(500).json({ error: 'server_error' });
  }
}
