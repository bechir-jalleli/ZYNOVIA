import Link from 'next/link'
import Image from 'next/image'

type LogoProps = {
  variant?: 'header' | 'footer'
}

const Logo = ({ variant = 'footer' }: LogoProps) => {
  const sizeClass =
    variant === 'header'
      ? 'h-12 md:h-16 w-auto shrink-0'
      : 'h-14 w-auto max-w-[200px]'

  return (
    <Link href='/' className={variant === 'header' ? 'inline-flex shrink-0' : undefined}>
      <Image
        src='/images/logo/ZYNOVIAPNGG-removebg-preview.png'
        alt='ZYNOVIA'
        width={221}
        height={207}
        className={`${sizeClass} block dark:hidden`}
        priority={variant === 'header'}
      />
      <Image
        src='/images/logo/ZYNOVIA VERSION NEGATIVE.png'
        alt='ZYNOVIA'
        width={333}
        height={309}
        className={`${sizeClass} hidden dark:block`}
        priority={variant === 'header'}
      />
    </Link>
  )
}

export default Logo
