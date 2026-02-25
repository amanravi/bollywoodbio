# Fix npm Not Recognized Error

## Quick Fix (Current Session Only)

Run this in your PowerShell terminal:
```powershell
$env:Path += ";C:\Program Files\nodejs"
```

Then you can use `npm` commands.

## Permanent Fix

### Option 1: Add to PATH via System Settings
1. Press `Win + X` and select **System**
2. Click **Advanced system settings**
3. Click **Environment Variables**
4. Under **System variables**, find and select **Path**
5. Click **Edit**
6. Click **New**
7. Add: `C:\Program Files\nodejs`
8. Click **OK** on all windows
9. **Restart your terminal/PowerShell**

### Option 2: Add via PowerShell (Run as Administrator)
```powershell
# Run PowerShell as Administrator, then:
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", [EnvironmentVariableTarget]::Machine)
```

Then restart your terminal.

### Option 3: Use Full Path (Temporary)
If you don't want to change PATH, use the full path:
```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Verify It Works

After fixing, test with:
```powershell
npm --version
node --version
```

You should see version numbers.

## For Current Session

I've already added Node.js to your PATH for this session. You can now run:
```powershell
npm run dev
```

But you'll need to do the permanent fix above for future sessions.
