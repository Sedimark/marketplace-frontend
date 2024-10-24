import Image from 'next/image'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href='/' className='flex items-center'>
      <Image id='logo' src='/img/Sedimark_Logo_PNG.png' height={44} width={44} alt='Sedimark-Logo' />
    </Link>
  )
}

export default Logo
