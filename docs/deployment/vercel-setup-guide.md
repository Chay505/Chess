# Vercel Deployment Setup Guide

## Repository Configuration

This project uses a fork workflow:
- **Upstream Repository**: `Chay505/Chess` (original)
- **Your Fork**: `philbeliveau/Chess` (connected to Vercel)

## Vercel Configuration

### 1. Verify Vercel Project Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project (likely named `Chess` or similar)
3. Click **Settings**

### 2. Configure Environment Variables

Navigate to **Settings → Environment Variables** and add:

```
DATABASE_URL=postgresql://postgres:gxJssPHKucZThUQFeSfOWzQCmMTSNwuw@yamabiko.proxy.rlwy.net:20973/railway?pgbouncer=true&connection_limit=1
NODE_ENV=production
```

**Important**:
- Apply to: **Production**, **Preview**, and **Development**
- The DATABASE_URL uses connection pooling (`pgbouncer=true`) optimized for Vercel serverless

### 3. Verify Build Settings

In **Settings → General**:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### 4. Domain Configuration

Your production URL will be:
- **Vercel Subdomain**: `https://chess-[random-string].vercel.app`
- **Custom Domain**: Can be added later in **Settings → Domains**

### 5. Enable Preview Deployments

In **Settings → Git**:
- ✅ **Production Branch**: `main`
- ✅ **Automatic Deployments**: Enabled
- ✅ **Deploy Preview**: Enabled for all branches

## Deployment Workflow

### Deploying to Production

Since you're working on a fork:

1. **Commit changes locally**:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to your fork**:
   ```bash
   git push origin main
   ```

3. **Vercel auto-deploys**:
   - Webhook triggers build on push
   - Build logs available in Vercel dashboard
   - Production URL updated automatically

### Creating Preview Deployments

1. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and push**:
   ```bash
   git push origin feature/your-feature
   ```

3. **Vercel creates preview**:
   - Unique preview URL generated
   - Comment posted on GitHub PR (if PR created)

### Syncing with Upstream

To get updates from the original repository:

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your main
git checkout main
git merge upstream/main

# Push to your fork (triggers Vercel deployment)
git push origin main
```

## Testing Deployment

### Quick Test

1. Make a small change (e.g., add comment to `README.md`)
2. Push to main branch
3. Check Vercel dashboard for deployment status
4. Visit production URL to verify

### Comprehensive Test

Run the verification script:
```bash
node scripts/verify-deployment.js
```

## Troubleshooting

### Build Fails

1. Check **Build Logs** in Vercel dashboard
2. Common issues:
   - Missing environment variables
   - TypeScript errors
   - Database connection issues
   - Node version mismatch

### Database Connection Issues

- Verify `DATABASE_URL` in Vercel environment variables
- Ensure Railway database is accessible publicly
- Check connection pooling settings (`pgbouncer=true&connection_limit=1`)

### Preview Deployments Not Working

- Check **Settings → Git** - ensure preview deployments enabled
- Verify GitHub integration has proper permissions
- Check branch protection rules

## Monitoring

### Deployment Status

- **Dashboard**: https://vercel.com/dashboard
- **Deployment Logs**: Click on deployment → View Function Logs
- **Build Analytics**: Settings → Analytics

### Performance

Vercel provides:
- **Edge Network**: Global CDN
- **Analytics**: Core Web Vitals tracking
- **Logs**: Real-time function logs (serverless functions)

## Next Steps

After successful deployment:
1. ✅ Verify production URL loads
2. ✅ Test all application routes
3. ✅ Check database connectivity
4. ✅ Monitor first deployment logs
5. ⏭️ Consider adding custom domain
6. ⏭️ Set up monitoring/alerting
