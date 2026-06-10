export interface ImageTransformOptions {
    width?: number;
    height?: number;
    crop?: 'limit' | 'fill' | 'scale';
    quality?: 'auto' | number;
}

export function isCloudinaryUrl(url?: string | null): boolean {
    if (!url) return false;
    return url.includes('res.cloudinary.com');
}

/**
 * Builds an optimized Cloudinary delivery URL with auto format (WebP/AVIF),
 * compression, and optional responsive dimensions.
 */
export function getOptimizedImageUrl(
    src: string | undefined | null,
    options: ImageTransformOptions = {}
): string {
    if (!src) return '';

    if (!isCloudinaryUrl(src)) {
        return src;
    }

    const transforms: string[] = ['f_auto', `q_${options.quality ?? 'auto'}`];

    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.width || options.height) {
        transforms.push(`c_${options.crop ?? 'limit'}`);
    }

    const marker = '/image/upload/';
    const markerIndex = src.indexOf(marker);
    if (markerIndex === -1) return src;

    const prefix = src.slice(0, markerIndex + marker.length);
    const suffix = src.slice(markerIndex + marker.length);

    // Strip existing transformation segments before version/public_id
    const normalizedSuffix = suffix.replace(/^([^/]+\/)*(?=v\d+\/)/, '');

    return `${prefix}${transforms.join(',')}/${normalizedSuffix}`;
}

export function getResponsiveSrcSet(
    src: string | undefined | null,
    widths: number[] = [320, 640, 960, 1280]
): string {
    if (!src || !isCloudinaryUrl(src)) return '';

    return widths
        .map((width) => `${getOptimizedImageUrl(src, { width })} ${width}w`)
        .join(', ');
}
