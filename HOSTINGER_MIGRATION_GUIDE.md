# Hostinger Migration/Deployment Guide

## Understanding "Upload Backup Files to Migrate"

This option in Hostinger is for **migrating an existing website** from another host. Since you're deploying a **new website**, you should **skip this** and use a different method.

## ✅ Correct Deployment Methods

### Method 1: Deploy via Git (Recommended - Easiest)

**Step 1: Push Your Code to GitHub**
1. Create a GitHub account (if you don't have one)
2. Create a new repository
3. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/bollywoodbio.git
   git push -u origin main
   ```

**Step 2: Deploy in Hostinger**
1. In hPanel → **Node.js** → **Create Node.js App**
2. Look for **"Deploy from Git"** or **"Connect Git Repository"** option
3. Enter your GitHub repository URL
4. Select branch (usually `main`)
5. Click **Deploy**

**This is the EASIEST method!** ✅

### Method 2: Upload Files via File Manager

**Step 1: Prepare Files**
1. Build your project locally:
   ```bash
   npm run build
   ```
2. Create a ZIP file with all files EXCEPT:
   - `node_modules/` (don't upload this)
   - `.next/` (will be rebuilt on server)
   - `.git/` (not needed)

**Step 2: Upload to Hostinger**
1. In hPanel → **File Manager**
2. Navigate to your domain folder (usually `public_html` or similar)
3. Upload the ZIP file
4. Extract it in File Manager

**Step 3: Install Dependencies**
1. In Node.js app settings, open **Terminal** or **SSH**
2. Navigate to your project folder
3. Run:
   ```bash
   npm install --production
   npm run build
   ```

### Method 3: Use FTP/SFTP

1. Get FTP credentials from Hostinger
2. Use FileZilla or similar FTP client
3. Upload all files (except `node_modules`)
4. Then install dependencies via SSH

## ❌ Skip "Upload Backup Files to Migrate"

**Don't use this option** because:
- It's for migrating existing websites
- You're deploying a NEW website
- It's not the right method for Node.js apps

## What to Look For in Hostinger

When creating Node.js app, look for these options:

✅ **"Deploy from Git"** - Use this if you have GitHub
✅ **"Upload Files"** - Use this to upload directly
✅ **"Create New App"** - Start fresh
❌ **"Migrate/Import Backup"** - Skip this (for existing sites)

## Step-by-Step: Creating Node.js App

1. **Go to hPanel** → **Website** → **Node.js**
2. **Click "Create Node.js App"** or **"Add Node.js App"**
3. **Fill in details**:
   - App Name: `bollywoodbio`
   - Node.js Version: `18.x` or `20.x`
   - App Mode: `Production`
4. **Choose deployment method**:
   - Option A: **Deploy from Git** (if you have GitHub)
   - Option B: **Upload Files** (upload your project files)
5. **Skip migration/backup options** - you don't need them

## Quick Checklist

- [ ] Skip "Upload Backup Files to Migrate"
- [ ] Choose "Create New Node.js App" instead
- [ ] Use "Deploy from Git" OR "Upload Files"
- [ ] Set environment variables (ADMIN_PASSWORD)
- [ ] Install dependencies (`npm install`)
- [ ] Build the project (`npm run build`)
- [ ] Start the app

## If You're Stuck

**If you only see "Upload Backup Files" option:**
1. Look for **"Create New App"** or **"Add App"** button
2. Or contact Hostinger support and ask:
   - "How do I create a new Node.js app?"
   - "I want to deploy a Next.js application from scratch"
   - "Where is the option to deploy from Git?"

## Recommended: Use Git Deployment

**Easiest method:**
1. Push code to GitHub
2. In Hostinger, choose **"Deploy from Git"**
3. Enter repository URL
4. Done! ✅

This avoids file uploads and is much easier!

## Summary

**"Upload Backup Files to Migrate"** = For existing websites
**"Deploy from Git"** or **"Upload Files"** = For new websites ✅

**Skip the migration option** and use Git deployment or file upload instead!
