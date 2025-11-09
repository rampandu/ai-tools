// pages/api/log.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    const body = req.body || {};
    // sanitize / limit size to avoid huge payloads
    const payload = {
      time: new Date().toISOString(),
      url: req.headers.referer || req.body.url || null,
      userAgent: req.headers['user-agent'] || null,
      message: String(body.message || body.error || body.msg || '').slice(0, 2000),
      detail: body.detail ? (typeof body.detail === 'string' ? body.detail.slice(0, 2000) : JSON.stringify(body.detail).slice(0,2000)) : null
    };

    // Print to console (you can later forward to remote logging)
    console.warn('[client-log]', payload);

    // respond quickly
    res.status(204).end();
  } catch (err) {
    console.error('log endpoint error', err);
    res.status(500).json({ error: 'log_failed' });
  }
}
