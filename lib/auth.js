import { createHash } from 'crypto';

export const COOKIE = 'poll_access';

export function tokenFor(role, password) {
  return createHash('sha256').update(`${role}:${password}`).digest('hex');
}
