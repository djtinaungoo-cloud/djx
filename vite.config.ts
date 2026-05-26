import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react(), tailwindcss()];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}

  // ──────────────────────────────────────────────────────────
  // 🚨 IMPORTANT: Set your base path for GitHub Pages!
  //
  // If your site is at https://YOUR_USERNAME.github.io/djx/
  //   → base: '/djx/'
  //
  // If your site is at https://YOUR_USERNAME.github.io/  (root)
  //   → base: '/'
  //
  // If using a custom domain (e.g. https://djx.yourdomain.com/)
  //   → base: '/'
  //
  // You can also set this via the VITE_BASE_PATH env var:
  //   VITE_BASE_PATH=/djx/ npm run build
  // ──────────────────────────────────────────────────────────
  const base = process.env.VITE_BASE_PATH || '/';

  return {
    plugins,
    base,
  };
})
