# Quick GitHub Setup Guide

## Step 1: Configure Git (One-time setup)

Run these commands with YOUR information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Replace with your actual name and email!**

## Step 2: Create GitHub Repository

1. Go to https://github.com and log in
2. Click **"+"** (top right) → **"New repository"**
3. Repository name: `bollywoodbio`
4. Description: "BollywoodBio - Movie ticket booking website"
5. Choose **Private** (recommended) or **Public**
6. **DO NOT** check "Initialize with README"
7. Click **"Create repository"**

## Step 3: Connect and Push

After creating the repo, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bollywoodbio.git
git branch -M main
git push -u origin main
```

**Replace YOUR_USERNAME with your GitHub username!**

## Already Done ✅

- ✅ Git initialized
- ✅ Files added to staging
- ⏳ Need to: Set git config, create GitHub repo, push code

## Next Steps

1. Set your git config (see Step 1 above)
2. Create GitHub repository (see Step 2)
3. Run the push commands (see Step 3)
4. Then deploy to Hostinger using Git!
