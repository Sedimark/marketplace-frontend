import Image from 'next/image'
import { HiMail, HiGlobeAlt, HiOfficeBuilding, HiUser } from 'react-icons/hi'

function ProviderCard ({ provider }) {
  return (
    <>
      <h5 className='text-xl font-bold'>Provided by</h5>
      <div className='flex flex-wrap m-5 ml-0'>
        <div className='float-left mr-5'>
          {provider?.image_url &&
            <Image width={96} height={96} src={provider.image_url} alt={provider.alternate_name} className='object-cover object-center rounded-lg shadow-lg' />}
        </div>
        <div className='flex flex-col justify-around'>
          <p className='text-md text-black font-bold'>
            {provider.alternate_name + ' ( ' + provider.did + ' )'}
          </p>
          {provider?.first_name && provider?.last_name &&
            <div className='flex items-center gap-2'>
              <HiUser size={20} />
              <p>{provider.first_name + ' ' + provider.last_name.toUpperCase()}</p>
            </div>}
          {provider?.email &&
            <div className='flex items-center gap-2'>
              <HiMail size={20} />
              <a href={provider.email.value}>{provider.email.value.split(':')[1]}</a>
            </div>}
          {provider?.company_name &&
            <div className='flex items-center gap-2'>
              <HiOfficeBuilding size={20} />
              <p>{provider.company_name}</p>
            </div>}
          {provider?.website &&
            <div className='flex items-center gap-2'>
              <HiGlobeAlt size={20} />
              <a href={provider.website} target='_blank' rel='noreferrer'>{provider.website}</a>
            </div>}
        </div>
      </div>
    </>
  )
}
export default ProviderCard
