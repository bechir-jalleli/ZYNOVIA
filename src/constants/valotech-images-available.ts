/**
 * ValoTech Lab Image Paths - AVAILABLE IMAGES ONLY
 * 
 * This file contains only the images that were successfully downloaded.
 * See docs/DOWNLOADED_IMAGES_SUMMARY.md for the full list.
 * 
 * Total: 8 images successfully downloaded out of 60 attempted
 */

export const VALOTECH_AVAILABLE_IMAGES = {
  // Logo Images (1 available)
  logos: {
    favicon: '/images/valotech/logos/favicon.png',
  },

  // Main Location Gallery Images (6 available)
  gallery: {
    /**
     * Get gallery image path by index (0-5)
     */
    getImage: (index: number): string => {
      if (index < 0 || index > 5) {
        throw new Error('Gallery index must be between 0 and 5 (only 6 images available)');
      }
      return `/images/valotech/gallery/gallery-${String(index).padStart(2, '0')}.jpg`;
    },
    count: 6,
    // All available gallery images
    all: [
      '/images/valotech/gallery/gallery-00.jpg',
      '/images/valotech/gallery/gallery-01.jpg',
      '/images/valotech/gallery/gallery-02.jpg',
      '/images/valotech/gallery/gallery-03.jpg',
      '/images/valotech/gallery/gallery-04.jpg',
      '/images/valotech/gallery/gallery-05.jpg',
    ],
  },

  // Background Image (1 available)
  backgrounds: {
    partnership: '/images/valotech/backgrounds/partnership-background.jpg',
  },
} as const;

/**
 * Usage Examples:
 * 
 * import Image from 'next/image'
 * import { VALOTECH_AVAILABLE_IMAGES } from '@/constants/valotech-images-available'
 * 
 * // Favicon
 * <Image
 *   src={VALOTECH_AVAILABLE_IMAGES.logos.favicon}
 *   alt="ValoTech Favicon"
 *   width={32}
 *   height={32}
 * />
 * 
 * // Gallery images
 * {VALOTECH_AVAILABLE_IMAGES.gallery.all.map((src, index) => (
 *   <Image
 *     key={index}
 *     src={src}
 *     alt={`Gallery Image ${index + 1}`}
 *     width={800}
 *     height={600}
 *   />
 * ))}
 * 
 * // Background
 * <div style={{
 *   backgroundImage: `url(${VALOTECH_AVAILABLE_IMAGES.backgrounds.partnership})`,
 *   backgroundSize: 'cover'
 * }}>
 *   Content
 * </div>
 */








