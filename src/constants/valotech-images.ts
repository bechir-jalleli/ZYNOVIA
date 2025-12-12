/**
 * ValoTech Lab Image Paths
 * 
 * All images should be downloaded first using: npm run download-images
 * Images are stored in: public/images/valotech/
 */

export const VALOTECH_IMAGES = {
  // Logo Images
  // Note: Only favicon.png was successfully downloaded
  // blue and default logos returned 404 errors
  logos: {
    // blue: '/images/valotech/logos/valotech-lab-rendered-blue.png', // Not available (404)
    // default: '/images/valotech/logos/valotech-lab-rendered.png', // Not available (404)
    favicon: '/images/valotech/logos/favicon.png', // ✅ Available
  },

  // Icon Images
  icons: {
    securite: '/images/valotech/icons/securite.png',
  },

  // Main Location Gallery Images (Carousel) - 6 images available (0-5)
  // Note: Images 6-17 were not found on the server (404 errors)
  gallery: {
    /**
     * Get gallery image path by index (0-5 available)
     */
    getImage: (index: number): string => {
      if (index < 0 || index > 5) {
        throw new Error('Gallery index must be between 0 and 5 (only 6 images were downloaded)');
      }
      return `/images/valotech/gallery/gallery-${String(index).padStart(2, '0')}.jpg`;
    },
    count: 6, // Only 6 images were successfully downloaded
    // All available gallery images as array
    all: Array.from({ length: 6 }, (_, i) => 
      `/images/valotech/gallery/gallery-${String(i).padStart(2, '0')}.jpg`
    ),
  },

  // Room/Space Images
  rooms: {
    salleInnovateQ: {
      getImage: (index: number): string => {
        if (index < 0 || index > 3) {
          throw new Error('Salle InnovateQ index must be between 0 and 3');
        }
        return `/images/valotech/rooms/salle-innovateq/salle-innovateq-${index}.jpg`;
      },
      count: 4,
      all: Array.from({ length: 4 }, (_, i) =>
        `/images/valotech/rooms/salle-innovateq/salle-innovateq-${i}.jpg`
      ),
    },
    salleReunionI: {
      getImage: (index: number): string => {
        if (index < 0 || index > 2) {
          throw new Error('Salle Réunion I index must be between 0 and 2');
        }
        return `/images/valotech/rooms/salle-reunion-i/salle-reunion-i-${index}.jpg`;
      },
      count: 3,
      all: Array.from({ length: 3 }, (_, i) =>
        `/images/valotech/rooms/salle-reunion-i/salle-reunion-i-${i}.jpg`
      ),
    },
    bureauPriveQ: '/images/valotech/rooms/bureau-prive-q/bureau-prive-q.jpg',
    bureauPriveI: '/images/valotech/rooms/bureau-prive-i/bureau-prive-i.jpg',
    bureauPriveS: '/images/valotech/rooms/bureau-prive-s/bureau-prive-s.jpg',
    bureauxPartagesQ: '/images/valotech/rooms/bureaux-partages-q/bureaux-partages-q.jpg',
    bureauxPartagesI: '/images/valotech/rooms/bureaux-partages-i/bureaux-partages-i.jpg',
    coworkingSpace: {
      getImage: (index: number): string => {
        if (index < 0 || index > 2) {
          throw new Error('Coworking Space index must be between 0 and 2');
        }
        return `/images/valotech/rooms/coworking-space/coworking-space-${index}.jpg`;
      },
      count: 3,
      all: Array.from({ length: 3 }, (_, i) =>
        `/images/valotech/rooms/coworking-space/coworking-space-${i}.jpg`
      ),
    },
  },

  // Feature/Amenity Icons (SVG)
  features: {
    accueilvisiteurs: '/images/valotech/features/accueilvisiteurs.svg',
    lumieredujour: '/images/valotech/features/lumieredujour.svg',
    climatisation: '/images/valotech/features/climatisation.svg',
    priseReseau: '/images/valotech/features/prise-reseau.svg',
    wifi: '/images/valotech/features/wifi.svg',
    internetHautDebit: '/images/valotech/features/internethautdebit.svg',
    cuisinePartagee: '/images/valotech/features/cuisinepartagee.svg',
    accesHandicape: '/images/valotech/features/acces-handicape.svg',
    restaurationAProximite: '/images/valotech/features/restaurationaproximite.svg',
    accueilMultilingue: '/images/valotech/features/accueilmultilingue.svg',
    ouvert2424: '/images/valotech/features/2424.svg',
    cafe: '/images/valotech/features/cafe.svg',
    espaceDetente: '/images/valotech/features/espacedetente.svg',
    paperboard: '/images/valotech/features/paperboard.svg',
    videoProjecteur: '/images/valotech/features/videoprojecteur.svg',
    ecranProjection: '/images/valotech/features/ecranprojection.svg',
    tableCentrale: '/images/valotech/features/table-centrale.svg',
    microonde: '/images/valotech/features/microonde.svg',
    cocktail: '/images/valotech/features/cocktail.svg',
    taille: '/images/valotech/features/taille.svg',
  },

  // Partner Logo
  partners: {
    logo: '/images/valotech/partners/partner-logo.png',
  },

  // Event Image
  events: {
    image: '/images/valotech/events/event-image.jpg',
  },

  // Background Image
  backgrounds: {
    partnership: '/images/valotech/backgrounds/partnership-background.jpg',
  },
} as const;

/**
 * External URLs (if you prefer to use them directly instead of downloaded images)
 * Note: Using local images is recommended for better performance
 */
export const VALOTECH_EXTERNAL_URLS = {
  logos: {
    blue: 'https://valotechlab.com/thassets/img/valotech lab rendered blue.png',
    default: 'https://valotechlab.com/thassets/img/valotech lab rendered.png',
    favicon: 'https://valotechlab.com/thassets/img/favicon.png',
  },
  icons: {
    securite: 'https://valotechlab.com/thassets/img/securite.png',
  },
  backgrounds: {
    partnership: 'https://valotechlab.com/thassets/img/new-gallery/partnership2-min.jpg',
  },
  baseUrl: 'https://valotechlab.com',
} as const;

