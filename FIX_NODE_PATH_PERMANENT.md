# Fix "node is not recognized" Error - Permanent Solution

## Quick Fix: Add Node.js to PATH

### Method 1: Using System Settings (Easiest)

1. **Press `Win + R`** to open Run dialog
2. Type: `sysdm.cpl` and press Enter
3. Click the **Advanced** tab
4. Click **Environment Variables** button
5. Under **System variables** (bottom section), find and select **Path**
6. Click **Edit**
7. Click **New**
8. Type: `C:\Program Files\nodejs`
9. Click **OK** on all windows
10. **Close and reopen your terminal/PowerShell**

### Method 2: Using PowerShell (Run as Administrator)

1. **Right-click** on PowerShell/Command Prompt
2. Select **Run as Administrator**
3. Run this command:
```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs", [EnvironmentVariableTarget]::Machine)
```
4. **Close and reopen your terminal**

### Method 3: Add to User PATH (No Admin Needed)

Run this in PowerShell:
```powershell
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*nodejs*") {
    [Environment]::SetEnvironmentVariable("Path", $currentPath + ";C:\Program Files\nodejs", "User")
}
```

Then **restart your terminal**.

## Verify It Works

After adding to PATH and restarting terminal:
```powershell
node --version
npm --version
```

You should see version numbers.

## Alternative: Use Full Path (No PATH Change Needed)

If you don't want to change PATH, use full paths:
```powershell
# For node
& "C:\Program Files\nodejs\node.exe" --version

# For npm
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Check Where Node.js is Installed

If Node.js is in a different location, find it:
```powershell
Get-ChildItem "C:\Program Files" -Filter "node.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object FullName
```

Then use that path instead of `C:\Program Files\nodejs`.
