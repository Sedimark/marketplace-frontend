import Image from 'next/image'
import FooterItems from '@/components/footer/FooterItems'

export const Footer = () => {
  return (
    <div className='block bg-white p-4 w-full flex justify-between items-center'>
      <div />
      <div>
        <FooterItems />
      </div>
      <div>
        <Image src='/img/ue-icon.png' className='h-auto w-auto' height={50} width={50} alt='Gaia-X' />
      </div>
    </div>
  )
}

export default Footer
