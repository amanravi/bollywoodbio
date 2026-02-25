# Quick Backup Guide

## Files to Backup Regularly

### Critical Files (Backup Weekly)
- `data/movies.json` - All your movies
- `public/images/` - All movie posters

### Important Files (Backup Monthly)
- `data/contacts.json` - Contact submissions

## Quick Backup Steps

### Step 1: Via Hostinger File Manager
1. Log in to hPanel
2. Go to **File Manager**
3. Navigate to your project folder
4. Right-click `data` folder → **Download**
5. Right-click `public/images` folder → **Download**
6. Save on your computer

### Step 2: Store Safely
- Save to your computer
- Or upload to Google Drive/Dropbox
- Keep multiple copies

## Before Server Migration

**ALWAYS backup**:
1. Download `data/` folder
2. Download `public/images/` folder
3. Verify backups work (open JSON files)
4. Store in safe location

## After Server Migration

**ALWAYS verify**:
1. Check `data/` folder exists
2. Check `public/images/` exists
3. Test website loads
4. Test admin panel
5. If missing, restore from backup
