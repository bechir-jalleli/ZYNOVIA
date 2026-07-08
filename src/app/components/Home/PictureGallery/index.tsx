// src/app/components/Home/PictureGallery/index.tsx
import Image from 'next/image';
import styles from './PictureGallery.module.css';

const images = [
  '/images/nos-formation/picture/WhatsApp Image 2026-07-08 at 11.47.05 AM (1).jpeg',
  '/images/nos-formation/picture/WhatsApp Image 2026-07-08 at 11.47.05 AM (2).jpeg',
  '/images/nos-formation/picture/WhatsApp Image 2026-07-08 at 11.47.05 AM.jpeg',
  '/images/nos-formation/picture/WhatsApp Image 2026-07-08 at 11.47.06 AM.jpeg',
];

export default function PictureGallery() {
  return (
    <section className={styles.gallery} aria-label="Nos formations pictures">
      {images.map((src, idx) => (
        <div key={idx} className={styles.imageWrapper}>
          <Image
            src={src}
            alt={`Formation picture ${idx + 1}`}
            width={800}
            height={600}
            className={styles.image}
            priority={false}
          />
        </div>
      ))}
    </section>
  );
}
