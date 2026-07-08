'use client';

import { usePathname } from 'next/navigation';
import FloatingSocialMenu from './FloatingSocialMenu';
import InscriptionFloatingButtons from './InscriptionFloatingButtons';

export default function ConditionalFloatingSocialMenu() {
  const pathname = usePathname();
  // Show new buttons only on inscription page, and standard menu elsewhere
  if (pathname?.startsWith('/inscription')) {
    return <InscriptionFloatingButtons />;
  }
  return <FloatingSocialMenu />;
}
