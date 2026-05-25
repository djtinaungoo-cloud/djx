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

  return {
    plugins,
    // For GitHub Pages: set base to '/your-repo-name/' if deploying to
    // https://YOUR_USERNAME.github.io/your-repo-name/
    // For custom domain (e.g. djx.yourdomain.com), keep base as '/'
    base: '/',
  };
})
