# Quick Deployment Steps for Hostinger Business Plan

## ✅ Confirmed: Business Plan Includes Node.js Support
Your plan includes **5 Node.js webapps** - perfect for your Next.js website!

## Step-by-Step Deployment

### Step 1: Prepare Your Project
1. Make sure all your code is ready
2. Test build locally:
   ```bash
   npm run build
   ```
3. If build succeeds, you're ready!

### Step 2: Access Hostinger hPanel
1. Log in to your Hostinger account
2. Go to **hPanel** (control panel)
3. Navigate to **Website** → **Node.js**

### Step 3: Create Node.js App
1. Click **"Create Node.js App"** or **"Add Node.js App"**
2. Fill in the details:
   - **App Name**: `bollywoodbio` (or your preferred name)
   - **Node.js Version**: Select **18.x** or **20.x** (LTS version)
   - **App Mode**: **Production**
   - **App Root**: `/` (root directory)
   - **App Startup File**: `server.js` (we already created this!)

### Step 4: Deploy Your Code

**Option A: Via Git (Recommended)**
1. Push your code to GitHub/GitLab/Bitbucket
2. In Node.js settings, click **"Deploy from Git"**
3. Enter your repository URL
4. Select branch (usually `main` or `master`)
5. Click **Deploy**

**Option B: Via File Manager**
1. Go to **File Manager** in hPanel
2. Navigate to your domain's folder
3. Upload all project files (except `node_modules`)
4. Make sure `server.js` is in the root

### Step 5: Install Dependencies
1. In Node.js app settings, find **Terminal** or **SSH** access
2. Navigate to your project directory
3. Run:
   ```bash
   npm install --production
   npm run build
   ```

### Step 6: Configure Environment Variables
1. In Node.js app settings, find **Environment Variables**
2. Add these variables:
   ```
   NODE_ENV=production
   ADMIN_PASSWORD=your_secure_password_here
   PORT=3000
   ```
3. Save the variables

### Step 7: Set Start Command
1. In Node.js app settings
2. Set **Start Command**: `npm start`
3. Set **Port**: `3000` (or the port Hostinger assigns)

### Step 8: Set File Permissions
1. Via File Manager or SSH, set permissions:
   ```bash
   chmod 755 data
   chmod 755 public/images
   ```
2. Make sure these folders are writable:
   - `data/` (for movies.json and contacts.json)
   - `public/images/` (for uploaded images)

### Step 9: Start Your App
1. In Node.js app settings, click **Start** or **Restart**
2. Wait for the app to start
3. Check the logs to ensure no errors

### Step 10: Test Your Website
1. Visit your domain
2. Test these features:
   - [ ] Homepage loads
   - [ ] Featured movie banner shows
   - [ ] Admin login works (`/admin`)
   - [ ] Can add/edit movies
   - [ ] Image upload works
   - [ ] Contact form works

## Important Files Already Created

✅ `server.js` - Production server file
✅ `package.json` - Updated with start script
✅ `.htaccess` - Apache rewrite rules (if needed)

## Troubleshooting

### Issue: App won't start
- Check Node.js version (should be 18+)
- Verify `server.js` exists in root
- Check logs in Node.js app settings

### Issue: Build fails
- Run `npm install` first
- Check for TypeScript errors
- Verify all dependencies are in package.json

### Issue: Images not uploading
- Check `public/images/` folder permissions
- Ensure folder exists and is writable

### Issue: API routes not working
- Check `data/` folder exists and is writable
- Verify file paths in API routes

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] Admin panel accessible (`/admin`)
- [ ] Can login with admin password
- [ ] Can add/edit movies
- [ ] Image uploads work
- [ ] Contact form saves submissions
- [ ] SSL certificate active (HTTPS)
- [ ] Mobile responsive works

## Need Help?

If you encounter issues:
1. Check Node.js app logs in hPanel
2. Verify all environment variables are set
3. Check file permissions
4. Contact Hostinger support if needed

## Your Setup is Ready!

All necessary files are created:
- ✅ `server.js` - Production server
- ✅ Updated `package.json` - Start script
- ✅ Deployment guide - Full instructions

You're all set to deploy! 🚀
