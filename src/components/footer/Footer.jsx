import Image from 'next/image'
import FooterItems from '@/components/footer/FooterItems'

export const Footer = () => {
  return (
    <div className='block bg-white p-4 w-full flex justify-between items-center'>
      <div>
        <Image src='/img/ukri-icon.png' height={48} width={149} alt='UKRI' />
      </div>
      <div>
        <FooterItems />
      </div>
      <div>
        <Image src='/img/ue-icon.png' height={50} width={75} alt='EU' />
      </div>
    </div>
  )
}

export default Footer
