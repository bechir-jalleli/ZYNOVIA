import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/logo/image.png'
        alt='logo'
        width={150}
        height={50}
        className='h-auto max-w-[180px] block dark:hidden'        
      />
      <Image
        src='/images/logo/inoteqia-Academy-logo-h-white-color-01.png'
        alt='logo'
        width={150}
        height={50}
        className='h-auto max-w-[180px] hidden dark:block'        
      />
    </Link>
  )
}

export default Logo
