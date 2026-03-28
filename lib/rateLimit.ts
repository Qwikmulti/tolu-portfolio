const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(identifier: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const key = identifier;
  const current = rateLimitStore.get(key);

  if (!current || now - current.timestamp > windowMs) {
    rateLimitStore.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}
