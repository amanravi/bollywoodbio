# How to Deploy BollywoodBio Website on Hostinger

## Prerequisites
- Hostinger account with Node.js hosting plan
- Access to Hostinger control panel (hPanel)
- Your website files ready

## Method 1: Deploy via Git (Recommended)

### Step 1: Prepare Your Project
1. Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure all dependencies are in `package.json`
3. Test your build locally:
   ```bash
   npm run build
   ```

### Step 2: Connect to Hostinger
1. Log in to your Hostinger hPanel
2. Go to **Website** → **Node.js**
3. Click **Create Node.js App**

### Step 3: Configure Node.js App
1. **App Name**: `bollywoodbio` (or your preferred name)
2. **Node.js Version**: Select **18.x** or **20.x** (LTS version)
3. **App Mode**: Select **Production**
4. **App Root**: `/` (root directory)
5. **App Startup File**: `server.js` (we'll create this)

### Step 4: Create Production Server File
Create a file called `server.js` in your project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### Step 5: Update package.json
Add a start script to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "node server.js",
    "lint": "next lint"
  }
}
```

### Step 6: Deploy via Git
1. In Hostinger hPanel, go to **Node.js** → Your App
2. Click **Deploy from Git**
3. Enter your repository URL
4. Select branch (usually `main` or `master`)
5. Click **Deploy**

### Step 7: Install Dependencies
After deployment, run:
```bash
npm install --production
npm run build
```

## Method 2: Deploy via File Manager (Alternative)

### Step 1: Build Your Project Locally
```bash
npm run build
```

### Step 2: Upload Files
1. Log in to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to your domain's `public_html` folder
4. Upload all project files (except `node_modules`)

### Step 3: Install Dependencies on Server
1. Go to **Node.js** in hPanel
2. Open **Terminal** or **SSH**
3. Navigate to your project directory:
   ```bash
   cd public_html
   ```
4. Install dependencies:
   ```bash
   npm install --production
   ```

### Step 4: Configure Environment Variables
1. In hPanel, go to **Node.js** → Your App
2. Add environment variables:
   - `NODE_ENV=production`
   - `ADMIN_PASSWORD=your_secure_password` (if you set one)

### Step 5: Start the Application
1. In Node.js settings, set:
   - **Start Command**: `npm start`
   - **Port**: `3000` (or the port Hostinger assigns)

## Important Configuration

### 1. Environment Variables
Create a `.env.production` file or set in Hostinger:
```
NODE_ENV=production
ADMIN_PASSWORD=your_secure_password_here
PORT=3000
```

### 2. File Permissions
Make sure these directories are writable:
- `data/` (for movies.json and contacts.json)
- `public/images/` (for uploaded images)

Set permissions via File Manager or SSH:
```bash
chmod 755 data
chmod 755 public/images
```

### 3. Update File Paths
Ensure all file paths work correctly:
- API routes should use absolute paths
- Image uploads should save to `public/images/`

## Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test admin login (`/admin`)
- [ ] Test adding/editing movies
- [ ] Test image uploads
- [ ] Test contact form submissions
- [ ] Verify SSL certificate is active (HTTPS)
- [ ] Test on mobile devices
- [ ] Check that favicon appears

## Troubleshooting

### Issue: "Cannot find module 'next'"
**Solution**: Run `npm install` in your project directory

### Issue: Build fails
**Solution**: 
1. Check Node.js version (should be 18+)
2. Run `npm install` first
3. Check for TypeScript errors

### Issue: Images not uploading
**Solution**: 
1. Check `public/images/` folder permissions
2. Ensure folder exists and is writable

### Issue: API routes not working
**Solution**:
1. Check that `data/` folder exists and is writable
2. Verify file paths in API routes

### Issue: Admin password not working
**Solution**:
1. Set `ADMIN_PASSWORD` environment variable in Hostinger
2. Restart the Node.js app

## Alternative: Use Vercel (Easier for Next.js)

If Hostinger Node.js hosting is complex, consider **Vercel** (free for Next.js):
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy automatically
4. Free SSL, CDN, and automatic deployments

## Support Resources

- Hostinger Support: https://www.hostinger.com/contact
- Next.js Deployment: https://nextjs.org/docs/deployment
- Hostinger Node.js Docs: Check Hostinger knowledge base

## Notes

- Make sure your Hostinger plan supports Node.js
- Some plans may require upgrading for Node.js support
- Keep your `ADMIN_PASSWORD` secure and strong
- Regularly backup your `data/movies.json` file
- Monitor your Node.js app logs in Hostinger hPanel
