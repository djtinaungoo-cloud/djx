/**
 * Resolve a public folder asset path that works with any Vite base path.
 * 
 * Use this instead of hardcoded paths like "/uploads/upload_1.png".
 * Works whether your site is at:
 *   - https://username.github.io/         (base: '/')
 *   - https://username.github.io/djx/     (base: '/djx/')
 *   - https://djx.yourdomain.com/         (base: '/')
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path, ensure base has trailing slash
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
}
