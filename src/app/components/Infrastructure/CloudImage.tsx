'use client';

import Image, { ImageProps } from 'next/image';
import { getOptimizedImageUrl } from '@/lib/imageUtils';

type CloudImageProps = Omit<ImageProps, 'src'> & {
    src: string;
    optimizedWidth?: number;
    optimizedHeight?: number;
    crop?: 'limit' | 'fill' | 'scale';
};

export default function CloudImage({
    src,
    optimizedWidth,
    optimizedHeight,
    crop,
    loading,
    priority,
    alt,
    ...props
}: CloudImageProps) {
    const optimizedSrc = getOptimizedImageUrl(src, {
        width: optimizedWidth ?? (typeof props.width === 'number' ? props.width : undefined),
        height: optimizedHeight ?? (typeof props.height === 'number' ? props.height : undefined),
        crop,
    });

    return (
        <Image
            {...props}
            src={optimizedSrc || src}
            alt={alt}
            loading={priority ? undefined : loading ?? 'lazy'}
            priority={priority}
        />
    );
}
