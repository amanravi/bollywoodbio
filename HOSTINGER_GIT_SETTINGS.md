# Hostinger Git Deployment Settings

## Repository Branch
**Select: `main`**

This is the default branch where we just pushed your cleaned code.

## Directory
**Select: `/` (root directory) or leave empty**

Since your Next.js project is at the root of the repository, you should deploy from the root directory.

## Complete Hostinger Git Settings

### Step 1: Connect Repository
1. Go to **Hostinger Control Panel** → **Git**
2. Click **Connect Repository**
3. Enter your repository URL: `https://github.com/amanravi/bollywoodbio.git`
4. Or select from your connected GitHub account

### Step 2: Configure Deployment
- **Repository Branch**: `main`
- **Directory**: `/` (root) or leave empty
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (or `node server.js`)

### Step 3: Environment Variables (if needed)
If you have any environment variables (like `ADMIN_PASSWORD`), add them in Hostinger's environment variables section.

## Important Notes

### ✅ Your Project Structure
```
bollywoodbio/
├── app/           (Next.js app directory)
├── components/    (React components)
├── data/          (JSON files - movies.json, contacts.json)
├── lib/           (Utilities)
├── public/        (Static files - images, etc.)
├── package.json   (Dependencies)
└── next.config.js (Next.js config)
```

Since everything is at the root, use **`/`** as the directory.

### ✅ Build Settings
- **Node.js Version**: Select the latest LTS version (18.x or 20.x)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (uses `server.js`)

### ✅ After Deployment
1. Hostinger will automatically:
   - Clone your repository
   - Run `npm install`
   - Run `npm run build`
   - Start your app with `npm start`

2. Your website will be live at your domain!

## Troubleshooting

### If Build Fails
- Check Node.js version (should be 18+)
- Make sure `package.json` has all dependencies
- Check build logs in Hostinger panel

### If Directory Error
- Try leaving directory field **empty**
- Or use `/` (root)
- Don't use `./` or relative paths

## Summary
- **Branch**: `main` ✅
- **Directory**: `/` or empty ✅
- **Build**: `npm install && npm run build`
- **Start**: `npm start`
