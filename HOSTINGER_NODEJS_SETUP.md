# Hostinger Node.js Configuration

## Problem
Hostinger is looking for `composer.json` (PHP), but this is a **Node.js/Next.js** project.

## Solution: Configure as Node.js App

### Step 1: In Hostinger Control Panel

1. Go to **Node.js** section (not Git)
2. Or find **"Node.js Web App"** in your hosting panel
3. Make sure you're using a plan that supports Node.js (Business plan has 5 Node.js apps)

### Step 2: Create Node.js App

1. Click **"Create Node.js App"** or **"Add Application"**
2. Configure:
   - **App Name**: `bollywoodbio` (or any name)
   - **Node.js Version**: `18.x` or `20.x` (LTS)
   - **App Mode**: `Production`

### Step 3: Connect Git Repository

1. In the Node.js app settings, find **"Git Repository"** or **"Source"**
2. Enter:
   - **Repository URL**: `https://github.com/amanravi/bollywoodbio.git`
   - **Branch**: `main`
   - **Directory**: `/` (root) or leave empty

### Step 4: Set Build & Start Commands

1. **Build Command**:
   ```
   npm install && npm run build
   ```

2. **Start Command**:
   ```
   npm start
   ```

3. **Port**: Leave default (usually auto-detected)

### Step 5: Environment Variables (Optional)

If you have any environment variables, add them:
- `NODE_ENV=production`
- `ADMIN_PASSWORD=your_password` (if you set one)

### Step 6: Deploy

1. Click **"Deploy"** or **"Save"**
2. Hostinger will:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build`
   - Start with `npm start`

## Important Notes

### ✅ Use Node.js Section, Not Regular Git
- Don't use the regular "Git" deployment (that's for PHP)
- Use **"Node.js Web App"** section instead
- This is available in Business plan and above

### ✅ If Node.js Option Not Available
If you don't see Node.js option:
1. Check your Hostinger plan (Business plan includes 5 Node.js apps)
2. Upgrade if needed
3. Or contact Hostinger support

### ✅ After Deployment
Your website will be available at:
- Your domain (if configured)
- Or a provided subdomain like `your-app.hostinger.com`

## Troubleshooting

### Still Seeing Composer Errors?
- Make sure you're in **Node.js Web App** section, not regular Git
- The regular Git deployment is for PHP projects

### Build Fails?
- Check Node.js version (should be 18+)
- Check build logs in Hostinger panel
- Make sure `package.json` has all dependencies

### App Won't Start?
- Check that `server.js` exists
- Verify `npm start` command works
- Check port configuration

## Quick Checklist

- [ ] Using **Node.js Web App** section (not regular Git)
- [ ] Repository: `https://github.com/amanravi/bollywoodbio.git`
- [ ] Branch: `main`
- [ ] Directory: `/` or empty
- [ ] Build: `npm install && npm run build`
- [ ] Start: `npm start`
- [ ] Node.js version: 18.x or 20.x
