// lib/rateLimit.js
// Lightweight per-IP rate limiting for API routes using rate-limiter-flexible.
// In-memory: resets on server restart/redeploy, but stops basic abuse/scraping
// on a traditional Node server. Shared by all deterministic tool API routes.

import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiters = new Map();

function getLimiter(key, points, duration) {
  if (!limiters.has(key)) {
    limiters.set(key, new RateLimiterMemory({ points, duration }));
  }
  return limiters.get(key);
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

// Returns true if the request is allowed. If not allowed, writes a 429
// response itself and returns false — callers should `return` immediately.
export async function rateLimit(req, res, { key = 'default', points = 20, duration = 60 } = {}) {
  const limiter = getLimiter(key, points, duration);
  const ip = getClientIp(req);

  try {
    await limiter.consume(ip);
    return true;
  } catch {
    res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
    return false;
  }
}
