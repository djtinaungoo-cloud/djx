# DJX — GitHub Pages Deployment Guide

## Quick Setup (5 minutes)

### 1. Create a GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: DJX site"
git remote add origin https://github.com/YOUR_USERNAME/djx.git
git push -u origin main
```

### 2. Add GitHub Secrets
Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these two secrets:
- `VITE_SUPABASE_URL` = your Supabase project URL (e.g. `https://xxxxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` = your Supabase anon/public key

### 3. Enable GitHub Pages
Go to **Settings** → **Pages** → Under "Build and deployment":
- **Source**: Select "GitHub Actions"

### 4. Configure Base Path
If your site will be at `https://YOUR_USERNAME.github.io/djx/` (not a custom domain), edit `vite.config.ts` and set:
```js
base: '/djx/',
```

If using a custom domain (e.g. `djx.yourdomain.com`), leave base as `'/'`.

### 5. Deploy!
Push to `main` and GitHub Actions will automatically build and deploy:
```bash
git add .
git commit -m "Deploy DJX"
git push
```

Check the **Actions** tab for build status.

---

## Custom Domain (Optional)

1. Go to repo **Settings** → **Pages** → **Custom domain**
2. Enter your domain (e.g. `djx.yourdomain.com`)
3. Add a CNAME record in your DNS: `djx.yourdomain.com → YOUR_USERNAME.github.io`
4. Check "Enforce HTTPS"
5. Set `base: '/'` in `vite.config.ts`

---

## Updating Content

### Via Supabase Dashboard
1. Go to your Supabase project → **Table Editor**
2. Edit `mixes`, `playlists`, `artists`, or `contacts` tables
3. Changes appear instantly — no redeployment needed!

### Via Code
Edit any component in `src/`, then push to `main` to trigger a rebuild.

---

## Project Structure
```
├── .github/workflows/deploy.yml   # Auto-deploy workflow
├── public/
│   ├── 404.html                   # SPA routing hack
│   ├── favicon.svg
│   └── uploads/upload_1.png       # DJX logo
├── src/
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client (direct)
│   │   └── PlayerContext.tsx       # Audio player state
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Player.tsx
│   │   ├── MixCard.tsx
│   │   ├── SectionHeader.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── MixesSection.tsx
│   │   ├── PlaylistsSection.tsx
│   │   ├── ArtistsSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── ContactSection.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── DEPLOY-GUIDE.md                 # This file
```

## No Server Required!
This site calls Supabase **directly from the browser** — no API routes, no serverless functions. Perfect for GitHub Pages static hosting.
