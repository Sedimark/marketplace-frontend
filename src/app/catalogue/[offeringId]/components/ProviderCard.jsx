import Image from 'next/image'
import { HiMail, HiGlobeAlt } from 'react-icons/hi'

function ProviderCard ({ provider }) {
  return (
    <>
      <h5 className='text-xl font-bold'>Provided by</h5>
      <div className='flex flex-wrap m-5 ml-0'>
        <div className='float-left mr-5'>
          <Image width={64} height={64} src={provider.picture} alt={provider.name} className='max-w-16 max-h-16 object-cover object-center rounded-lg shadow-lg' />
          <p className='text-xs text-center text-black pt-1'><a href={provider.url} target='_blank' rel='noreferrer'>{provider.name}</a></p>
        </div>
        <div className='flex flex-col justify-around'>
          <div className='flex items-center gap-2'>
            <HiMail size={20} />
            <p>{provider.email}</p>
          </div>
          <div className='flex items-center gap-2'>
            <HiGlobeAlt size={20} />
            <p>{provider.url}</p>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProviderCard
