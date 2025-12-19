# Image Usage Guide - ValoTech Lab Images

This guide explains how to use the downloaded ValoTech Lab images in your Next.js application.

## Directory Structure

After running the download script, images will be organized in `public/images/valotech/`:

```
public/images/valotech/
├── logos/
│   ├── valotech-lab-rendered-blue.png
│   ├── valotech-lab-rendered.png
│   └── favicon.png
├── icons/
│   └── securite.png
├── gallery/
│   ├── gallery-00.jpg
│   ├── gallery-01.jpg
│   └── ... (18 images)
├── rooms/
│   ├── salle-innovateq/
│   ├── salle-reunion-i/
│   ├── bureau-prive-q/
│   ├── bureau-prive-i/
│   ├── bureau-prive-s/
│   ├── bureaux-partages-q/
│   ├── bureaux-partages-i/
│   └── coworking-space/
├── features/
│   ├── accueilvisiteurs.svg
│   ├── wifi.svg
│   ├── climatisation.svg
│   └── ... (20 SVG icons)
├── partners/
│   └── partner-logo.png
├── events/
│   └── event-image.jpg
└── backgrounds/
    └── partnership-background.jpg
```

## Downloading Images

To download all images from the ValoTech Lab website, run:

```bash
npm run download-images
```

This script will:
- Create the organized directory structure
- Download all images to their respective folders
- Show progress and summary of downloads

## Using Images in Your App

### Method 1: Using Local Downloaded Images (Recommended)

After downloading, use the images with Next.js Image component:

```tsx
import Image from 'next/image'

// Logo
<Image
  src="/images/valotech/logos/valotech-lab-rendered-blue.png"
  alt="ValoTech Lab Logo"
  width={200}
  height={60}
/>

// Gallery Image
<Image
  src="/images/valotech/gallery/gallery-00.jpg"
  alt="Main Location"
  width={800}
  height={600}
/>

// Room Image
<Image
  src="/images/valotech/rooms/salle-innovateq/salle-innovateq-0.jpg"
  alt="Salle InnovateQ"
  width={600}
  height={400}
/>

// Feature Icon (SVG)
<Image
  src="/images/valotech/features/wifi.svg"
  alt="WiFi"
  width={32}
  height={32}
/>

// Background Image
<div
  style={{
    backgroundImage: 'url(/images/valotech/backgrounds/partnership-background.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Content */}
</div>
```

### Method 2: Using External URLs Directly

You can also use the external URLs directly. The `next.config.ts` has been configured to allow images from `valotechlab.com`:

```tsx
import Image from 'next/image'

<Image
  src="https://valotechlab.com/thassets/img/valotech lab rendered blue.png"
  alt="ValoTech Lab Logo"
  width={200}
  height={60}
/>
```

**Note:** Using external URLs means:
- Images load from the external server (may be slower)
- No offline access
- Dependent on external server availability
- Higher bandwidth usage

**Recommendation:** Download images locally for better performance and reliability.

## Example Usage in Components

### Logo Component

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ValoTechLogo() {
  return (
    <Link href="/">
      <Image
        src="/images/valotech/logos/valotech-lab-rendered-blue.png"
        alt="ValoTech Lab"
        width={180}
        height={60}
        className="h-auto max-w-[180px]"
        priority
      />
    </Link>
  )
}
```

### Gallery Carousel Component

```tsx
'use client'

import Image from 'next/image'
import Slider from 'react-slick'

export default function LocationGallery() {
  const galleryImages = Array.from({ length: 18 }, (_, i) => ({
    src: `/images/valotech/gallery/gallery-${String(i).padStart(2, '0')}.jpg`,
    alt: `Location Image ${i + 1}`,
  }))

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }

  return (
    <Slider {...settings}>
      {galleryImages.map((img, index) => (
        <div key={index}>
          <Image
            src={img.src}
            alt={img.alt}
            width={1200}
            height={675}
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </Slider>
  )
}
```

### Room Showcase Component

```tsx
'use client'

import Image from 'next/image'

interface RoomImages {
  salleInnovateQ: string[]
  salleReunionI: string[]
  bureauPriveQ: string
  // ... other rooms
}

export default function RoomShowcase() {
  const rooms: RoomImages = {
    salleInnovateQ: [
      '/images/valotech/rooms/salle-innovateq/salle-innovateq-0.jpg',
      '/images/valotech/rooms/salle-innovateq/salle-innovateq-1.jpg',
      '/images/valotech/rooms/salle-innovateq/salle-innovateq-2.jpg',
      '/images/valotech/rooms/salle-innovateq/salle-innovateq-3.jpg',
    ],
    salleReunionI: [
      '/images/valotech/rooms/salle-reunion-i/salle-reunion-i-0.jpg',
      '/images/valotech/rooms/salle-reunion-i/salle-reunion-i-1.jpg',
      '/images/valotech/rooms/salle-reunion-i/salle-reunion-i-2.jpg',
    ],
    // ... other rooms
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rooms.salleInnovateQ.map((src, index) => (
        <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={src}
            alt={`Salle InnovateQ ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  )
}
```

### Feature Icons Component

```tsx
'use client'

import Image from 'next/image'

const features = [
  { icon: 'wifi.svg', label: 'WiFi' },
  { icon: 'climatisation.svg', label: 'Climatisation' },
  { icon: 'accueilvisiteurs.svg', label: 'Accueil Visiteurs' },
  { icon: 'lumieredujour.svg', label: 'Lumière du Jour' },
  { icon: 'cuisinepartagee.svg', label: 'Cuisine Partagée' },
  // ... more features
]

export default function FeaturesList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div key={feature.icon} className="flex flex-col items-center p-4">
          <Image
            src={`/images/valotech/features/${feature.icon}`}
            alt={feature.label}
            width={48}
            height={48}
            className="mb-2"
          />
          <span className="text-sm text-center">{feature.label}</span>
        </div>
      ))}
    </div>
  )
}
```

## Image Path Constants

For better maintainability, you can create a constants file:

```typescript
// src/constants/images.ts

export const VALOTECH_IMAGES = {
  logos: {
    blue: '/images/valotech/logos/valotech-lab-rendered-blue.png',
    default: '/images/valotech/logos/valotech-lab-rendered.png',
    favicon: '/images/valotech/logos/favicon.png',
  },
  icons: {
    securite: '/images/valotech/icons/securite.png',
  },
  gallery: {
    getImage: (index: number) => 
      `/images/valotech/gallery/gallery-${String(index).padStart(2, '0')}.jpg`,
  },
  rooms: {
    salleInnovateQ: {
      getImage: (index: number) =>
        `/images/valotech/rooms/salle-innovateq/salle-innovateq-${index}.jpg`,
      count: 4,
    },
    salleReunionI: {
      getImage: (index: number) =>
        `/images/valotech/rooms/salle-reunion-i/salle-reunion-i-${index}.jpg`,
      count: 3,
    },
    // ... other rooms
  },
  features: {
    wifi: '/images/valotech/features/wifi.svg',
    climatisation: '/images/valotech/features/climatisation.svg',
    // ... other features
  },
  partners: {
    logo: '/images/valotech/partners/partner-logo.png',
  },
  events: {
    image: '/images/valotech/events/event-image.jpg',
  },
  backgrounds: {
    partnership: '/images/valotech/backgrounds/partnership-background.jpg',
  },
} as const
```

Then use it in your components:

```tsx
import Image from 'next/image'
import { VALOTECH_IMAGES } from '@/constants/images'

<Image
  src={VALOTECH_IMAGES.logos.blue}
  alt="ValoTech Lab Logo"
  width={200}
  height={60}
/>
```

## Best Practices

1. **Use local images** after downloading for better performance
2. **Set appropriate width/height** to prevent layout shift
3. **Add descriptive alt text** for accessibility
4. **Use priority prop** for above-the-fold images
5. **Optimize images** if needed (though `unoptimized: true` is currently set)
6. **Use fill prop** for responsive images in containers
7. **Create constants** for frequently used image paths

## Troubleshooting

### Images not loading
- Verify the image exists in `public/images/valotech/`
- Check the path is correct (case-sensitive on some systems)
- Ensure you ran `npm run download-images` successfully

### External URLs not working
- Verify `next.config.ts` has the remotePatterns configured
- Check if the external server is accessible
- Consider downloading images locally instead

### Download script fails
- Check your internet connection
- Some URLs might be unavailable - the script will continue with others
- Check the console output for specific error messages








