import Image from 'next/image'
import { HiMail, HiGlobeAlt, HiUser } from 'react-icons/hi'

function ProviderCard ({ provider }) {
  return (
    <>
      <h5 className='text-xl font-bold'>Provided by</h5>
      <div className='flex flex-wrap m-5 ml-0'>
        <div className='float-left mr-5'>
          {provider?.image &&
            <Image width={128} height={128} src={provider.image.value} alt={provider.participant.value} className='object-cover object-center rounded-lg shadow-lg' />}
        </div>
        <div className='flex flex-col justify-around'>
          <p className='text-md text-black font-bold'>
            {provider.accountId.value + ' ( ' + provider.participant.value + ' )'}
          </p>
          {provider?.givenName && provider?.familyName &&
            <div className='flex items-center gap-2'>
              <HiUser size={20} />
              <p>{provider.givenName.value + ' ' + provider.familyName.value}</p>
            </div>}
          {provider?.email &&
            <div className='flex items-center gap-2'>
              <HiMail size={20} />
              <a href={provider.email.value}>{provider.email.value.split(':')[1]}</a>
            </div>}
          {provider?.homepage &&
            <div className='flex items-center gap-2'>
              <HiGlobeAlt size={20} />
              <a href={provider.homepage.value} target='_blank' rel='noreferrer'>{provider.homepage.value}</a>
            </div>}
        </div>
      </div>
    </>
  )
}
export default ProviderCard
