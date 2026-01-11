# How to Add Favicon (Browser Tab Icon)

## Current Setup
I've configured the favicon to use your existing logo (`/images/logo1.png`). This should work, but for best results, you should create a proper favicon file.

## Option 1: Use Your Existing Logo (Current)
The favicon is currently set to use `/images/logo1.png`. This should work, but you may need to:
1. Hard refresh your browser (Ctrl+F5)
2. Clear browser cache
3. The icon should appear in the browser tab

## Option 2: Create a Proper Favicon (Recommended)

### Step 1: Create Favicon Files
You need to create favicon files in these formats:
- `favicon.ico` (16x16, 32x32, 48x48 pixels) - for older browsers
- `icon.png` or `icon.svg` - for modern browsers

### Step 2: Place Files
**Option A: In `app` directory (Next.js 14 automatic)**
- Place `icon.png` or `icon.ico` in the `app` folder
- Next.js will automatically use it

**Option B: In `public` directory**
- Place `favicon.ico` in the `public` folder
- Update `app/layout.tsx` to reference it

### Step 3: Convert Your Logo
You can convert your `logo1.png` to a favicon using:
- Online tools: https://favicon.io/favicon-converter/
- Or use an image editor to resize to 32x32 or 16x16 pixels

### Step 4: Update Layout (if using public folder)
If you place `favicon.ico` in the `public` folder, update `app/layout.tsx`:
```tsx
icons: {
  icon: '/favicon.ico',
  apple: '/favicon.ico',
}
```

## Quick Fix
If you want to use your current logo as favicon:
1. The current setup should work
2. Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
3. If it doesn't appear, create a smaller version (32x32px) of your logo

## File Locations
- Current: `/public/images/logo1.png` (being used as favicon)
- Recommended: `/app/icon.png` or `/public/favicon.ico`
