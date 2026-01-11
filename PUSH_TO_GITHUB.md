# Push Your Code to GitHub - Final Steps

## You've Created the Repo - Now Push Your Code!

### Step 1: Configure Git (One-time setup)

Run these commands with YOUR information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Replace with your actual name and email!**

### Step 2: Commit Your Files

```bash
git commit -m "Initial commit: BollywoodBio website"
```

### Step 3: Add GitHub Remote

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/bollywoodbio.git
```

### Step 4: Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## If You Get Authentication Error

GitHub may ask for authentication. You can use:

**Option 1: Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select `repo` scope
4. Use token as password when pushing

**Option 2: GitHub CLI**
```bash
gh auth login
```

## After Pushing

Once your code is on GitHub:
1. Go to Hostinger hPanel
2. Node.js → Create App
3. Choose "Deploy from Git"
4. Enter: `https://github.com/YOUR_USERNAME/bollywoodbio.git`
5. Deploy! ✅
