# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Method 1: GitHub + Vercel (Recommended)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit: Next.js sorting visualizer"
git remote add origin https://github.com/YOUR-USERNAME/sorting-visualizer.git
git branch -M main
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"Add New Project"**
   - Import your repository
   - Click **"Deploy"**
   - Done! 🎉

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: One-Click Deploy

Click the button below to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Environment Variables

This project doesn't require any environment variables.

## Build Settings

Vercel will automatically detect your Next.js project. If needed, use these settings:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `next dev`

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment
- Zero configuration needed!

## Custom Domain

1. Go to your project on Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance

Next.js on Vercel provides:
- ⚡ Edge Network (Global CDN)
- 🔄 Automatic caching
- 📦 Optimized builds
- 🚀 Zero-config deployment
- 📊 Analytics & monitoring

## Troubleshooting

### Build fails?
```bash
# Test build locally first
npm run build
```

### Port already in use?
```bash
# Kill the process or use different port
npm run dev -- -p 3001
```

### Dependencies issues?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Support

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Deployment Issues](https://github.com/vercel/next.js/discussions)

