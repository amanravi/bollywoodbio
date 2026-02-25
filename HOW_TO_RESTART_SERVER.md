# How to Restart the Dev Server

## Quick Steps

### Step 1: Stop the Current Server
If the server is running in a terminal window:
- Press `Ctrl + C` in that terminal window
- Wait for it to stop (you'll see the prompt return)

### Step 2: Start the Server Again
```bash
npm run dev
```

## If Server Won't Stop

### Option 1: Close the Terminal
- Close the terminal window where the server is running
- Open a new terminal
- Run `npm run dev`

### Option 2: Kill Node Processes (Windows PowerShell)
```powershell
# Kill all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Then start again:
```bash
npm run dev
```

## Clear Cache and Restart (If Having Issues)

```powershell
# Stop all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Delete Next.js cache
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Start server
npm run dev
```

## Check if Server is Running

After starting, you should see:
```
▲ Next.js 14.x.x
- Local:        http://localhost:3000
✓ Ready in X seconds
```

Then visit: **http://localhost:3000**

## Common Issues

### Port Already in Use
If you see "Port 3000 is already in use":
1. Kill the process using port 3000
2. Or use a different port: `$env:PORT=3001; npm run dev`

### Server Not Starting
- Check for error messages in the terminal
- Make sure you're in the project directory: `cd bollywoodbio`
- Try clearing cache (see above)
