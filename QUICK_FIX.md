# Quick Fix for Server Not Loading

If `http://localhost:3000` is not loading, try these steps:

## Step 1: Stop All Node Processes
```powershell
# Kill all Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## Step 2: Clear Next.js Cache
```powershell
# Delete .next folder
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

## Step 3: Restart Dev Server
```powershell
npm run dev
```

## Step 4: Check for Errors
Look at the terminal output for any error messages. Common issues:
- WebAssembly loading errors
- Database initialization errors
- Port 3000 already in use

## Alternative: Use Different Port
If port 3000 is busy:
```powershell
$env:PORT=3001; npm run dev
```
Then visit: http://localhost:3001

## If Still Not Working
The issue might be with sql.js. We can temporarily fall back to JSON files to get the site working, then fix the database issue.
