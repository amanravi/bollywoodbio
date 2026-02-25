# Fix Hostinger Git Authentication Error

## Problem
```
clone: fatal: could not read Username for 'https://github.com': No such device or address
```

This happens because your GitHub repository is **private** and Hostinger needs authentication to access it.

## Solution Options

### Option 1: Make Repository Public (Easiest) ✅

1. Go to your GitHub repository: https://github.com/amanravi/bollywoodbio
2. Click **Settings** (top right)
3. Scroll down to **Danger Zone**
4. Click **Change visibility**
5. Select **Make public**
6. Confirm the change
7. **Retry deployment in Hostinger**

### Option 2: Use SSH URL (If you have SSH keys set up)

1. In Hostinger Git settings, change the repository URL to:
   ```
   git@github.com:amanravi/bollywoodbio.git
   ```
2. Make sure you've added your SSH key to Hostinger
3. Retry deployment

### Option 3: Use Personal Access Token (Recommended for Private Repos)

1. **Create GitHub Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click **Generate new token (classic)**
   - Give it a name: "Hostinger Deployment"
   - Select scopes: `repo` (full control of private repositories)
   - Click **Generate token**
   - **Copy the token immediately** (you won't see it again!)

2. **Update Repository URL in Hostinger:**
   - Use this format:
   ```
   https://YOUR_TOKEN@github.com/amanravi/bollywoodbio.git
   ```
   - Replace `YOUR_TOKEN` with the token you just created

3. **Retry deployment**

### Option 4: Use Hostinger's GitHub Integration

1. In Hostinger Git settings, look for **"Connect with GitHub"** button
2. Click it and authorize Hostinger to access your repositories
3. Select your repository from the list
4. This automatically handles authentication

## Recommended: Make Repository Public

Since this is a website project (not sensitive code), making it public is the **easiest solution**:

1. ✅ No authentication needed
2. ✅ Faster deployments
3. ✅ No token management
4. ✅ Works immediately

**Steps:**
1. Go to: https://github.com/amanravi/bollywoodbio/settings
2. Scroll to **Danger Zone**
3. Click **Change visibility** → **Make public**
4. Confirm
5. Retry deployment in Hostinger

## After Fixing

Once authentication is resolved, Hostinger will:
1. ✅ Clone the repository
2. ✅ Run `npm install`
3. ✅ Run `npm run build`
4. ✅ Start your website

Your site will be live! 🎉
