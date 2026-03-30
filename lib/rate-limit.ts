const rateMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  entry.count++;
  const allowed = entry.count <= maxRequests;
  return { allowed, remaining: Math.max(0, maxRequests - entry.count) };
}
