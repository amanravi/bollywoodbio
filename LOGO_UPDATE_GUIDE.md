# How to Update Website Logo

## Current Setup
The logo is currently displayed as text "BollywoodBio" in the header.

## Option 1: Update Logo Text
**File:** `components/Header.tsx`

Change line 8:
```tsx
<h1>BollywoodBio</h1>
```
to:
```tsx
<h1>Your New Text</h1>
```

## Option 2: Add Logo Image

### Step 1: Add Your Logo Image
1. Place your logo image in the `public/images/` folder
2. Recommended formats: PNG, SVG, or JPG
3. Recommended size: 200px width (height will scale automatically)
4. Name it something like: `logo.png` or `bollywoodbio-logo.svg`

### Step 2: Update Header Component
**File:** `components/Header.tsx`

Uncomment the image line and update the path:
```tsx
<div className={styles.logo}>
  <a href="/">
    <img src="/images/logo.png" alt="BollywoodBio" className={styles.logoImage} />
    {/* Optional: Keep text below image or remove h1 */}
    {/* <h1>BollywoodBio</h1> */}
  </a>
</div>
```

### Step 3: Adjust Logo Size (if needed)
**File:** `components/Header.module.css`

Update the `.logoImage` styles:
```css
.logoImage {
  height: 40px;        /* Adjust height as needed */
  width: auto;          /* Maintains aspect ratio */
  object-fit: contain;
}
```

## Option 3: Logo Only (No Text)
If you want only the image logo:

**File:** `components/Header.tsx`
```tsx
<div className={styles.logo}>
  <a href="/">
    <img src="/images/logo.png" alt="BollywoodBio" className={styles.logoImage} />
  </a>
</div>
```

## Quick Reference
- **Logo Text**: Edit `components/Header.tsx` line 8
- **Logo Image**: Add image to `public/images/` and update `components/Header.tsx`
- **Logo Styling**: Edit `components/Header.module.css` `.logoImage` class

## Example Logo Paths
- `/images/logo.png`
- `/images/bollywoodbio-logo.svg`
- `/images/company-logo.jpg`

Make sure your logo file is in the `public/images/` folder!
