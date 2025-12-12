# Image Download Troubleshooting Guide

## Current Status

The download script has been updated to properly handle URL encoding (spaces, special characters) and includes retry logic with alternative URL patterns. However, many images are returning 404 errors, which indicates these files **no longer exist** at the specified paths on the ValoTech Lab website.

## What Was Fixed

✅ **URL Encoding**: The script now properly encodes URLs with spaces (e.g., `valotech lab rendered blue.png` → `valotech%20lab%20rendered%20blue.png`)

✅ **Alternative URL Patterns**: The script tries alternative paths when a file is not found:
- `/thassets/` vs `/assets/`
- Encoded spaces vs hyphens
- Various path variations

✅ **Better Error Handling**: Improved HTTP request handling with proper headers and redirect support

## Download Results

**Successfully Downloaded (8 files):**
- ✅ favicon.png
- ✅ gallery-00.jpg through gallery-05.jpg (6 images)
- ✅ partnership-background.jpg

**Failed (52 files):**
- ❌ Logo images (spaces in filenames - may not exist anymore)
- ❌ Many gallery images (files 6-17 don't exist)
- ❌ All room/space images (404 errors)
- ❌ All feature icons (404 errors)
- ❌ Partner and event images (404 errors)

## Why Images Are Failing

404 errors mean the files **don't exist** at those paths. Possible reasons:

1. **Files were moved or renamed** - The website structure may have changed
2. **Files were deleted** - Old content may have been removed
3. **Incorrect paths** - The original URLs provided may have been from a different version of the site
4. **Dynamic paths** - Some paths might be generated dynamically and change over time

## Solutions

### Option 1: Verify Current URLs (Recommended)

1. **Inspect the website directly**:
   - Visit `https://valotechlab.com`
   - Open browser DevTools (F12)
   - Go to Network tab
   - Navigate through the site to find actual image URLs
   - Right-click images → "Inspect" → Find `src` attribute

2. **Use browser extensions**:
   - Install image downloader extensions
   - Browse the site and download images directly

3. **Check page source**:
   - View page source (Ctrl+U)
   - Search for image paths
   - Look in CSS files for background images

### Option 2: Update URLs in the Script

If you find the correct URLs, update them in `scripts/download-images.js`:

```javascript
logos: [
  {
    url: 'https://valotechlab.com/correct/path/to/image.png', // Update with actual URL
    filename: 'valotech-lab-rendered-blue.png',
    alternatives: [
      // Add alternative paths to try
    ],
  },
],
```

### Option 3: Manual Download

For critical images:
1. Open the image URL directly in a browser
2. Right-click → Save image as...
3. Place in the appropriate directory in `public/images/valotech/`

### Option 4: Contact Website Owner

If you need access to these images:
- Contact ValoTech Lab to get current image URLs
- Request image assets directly
- Ask about API access if available

## How to Find Correct Image URLs

### Method 1: Browser DevTools
```
1. Open https://valotechlab.com
2. Press F12 to open DevTools
3. Go to Network tab
4. Filter by "Img"
5. Navigate the website
6. Check Network tab for actual image URLs
```

### Method 2: Inspect Element
```
1. Right-click on an image
2. Select "Inspect" or "Inspect Element"
3. Find the <img> tag
4. Check the src attribute
5. Copy the full URL
```

### Method 3: View Page Source
```
1. Right-click on page → View Page Source
2. Press Ctrl+F to search
3. Search for image file extensions: .jpg, .png, .svg
4. Look for image paths in HTML/CSS
```

## Using the Updated Script

The script now properly handles URL encoding. To download images:

```bash
npm run download-images
```

The script will:
1. ✅ Properly encode URLs with spaces
2. ✅ Try alternative URL patterns automatically
3. ✅ Show detailed progress
4. ✅ List all failed downloads with reasons

## Next Steps

1. **Identify critical images** - Determine which images you absolutely need
2. **Verify URLs** - Check if these images exist on the current website
3. **Update script** - Add correct URLs to the script
4. **Run again** - Execute `npm run download-images`
5. **Manual fallback** - Manually download any remaining critical images

## Alternative: Use External URLs Directly

If images exist but paths are unstable, you can use external URLs directly in your app:

```tsx
import Image from 'next/image'

// Use external URL directly
<Image
  src="https://valotechlab.com/actual/path/to/image.png"
  alt="Description"
  width={200}
  height={60}
/>
```

The `next.config.ts` is already configured to allow images from `valotechlab.com`.

## Summary

The script is now working correctly with proper URL encoding. The 404 errors indicate that **most of the specified image files don't exist** at those paths anymore. You'll need to:

1. Verify the actual image URLs on the current website
2. Update the script with correct URLs, or
3. Manually download the images you need

The good news: 8 images were successfully downloaded and the script is ready to download any images that exist at the correct paths.

