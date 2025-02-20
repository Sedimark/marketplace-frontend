import { Badge } from 'flowbite-react'
import Image from 'next/image'
import { HiLocationMarker, HiCalendar, HiOutlineRefresh } from 'react-icons/hi'
import Credentials from './Credentials'
import settings from '@/utils/settings'

function Asset ({ offering }) {
  const title = offering.title.value
  const imageUrl = offering?.picture?.value
  const shortDescription = offering.description.value
  const keywords = offering?.keywords?.value ? offering.keywords.value.split(settings.keywordsSeparator) : []
  const createdAt = new Date(offering.created.value)
  const updatedAt = new Date(offering?.updated?.value ?? offering.created.value)
  const location = offering?.location?.value ?? 'London'
  const description = offering.description.value
  return (
    <div className='flex flex-col bg-sedimark-light-blue'>
      <h5 className='text-3xl font-bold tracking-tight text-black dark:text-white'>
        {title}
      </h5>
      {/* Details row */}
      <div className='flex justify-between m-6 ml-0'>
        <div className='flex flex-row flex-wrap gap-4'>
          <div className='flex flex-row items-center gap-2'>
            <HiLocationMarker />
            <p>{location}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <HiCalendar />
            <p>Published {createdAt.toISOString().split('T')[0]}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <HiOutlineRefresh />
            <p>Updated {updatedAt.toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>
      {/* Descriptions */}
      <div className='bg-sedimark-light-blue'>
        {imageUrl &&
          <Image src={imageUrl} alt={title} width={224} height={224} className='float-left mr-5 max-w-56 max-h-56 min-w-16 min-h-16 rounded-sm shadow-md' />}
        <h5 className='text-xl tracking-tight text-black dark:text-white mb-2'>
          {title}
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {shortDescription}
        </p>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {description}
        </p>
        {keywords.length > 0 &&
          <div className='flex items-center flex-wrap'>
            <h4 className='text-lg font-bold text-center m-3 ml-0'>Keywords:</h4>
            {keywords.map((keyword, index) => {
              return (
                <Badge key={`${keyword}-${index}`} className='text-sedimark-deep-blue bg-sedimark-clear-blue m-3 ml-0 mb-2'>{keyword}</Badge>
              )
            })}
          </div>}
      </div>
      <Credentials offering={offering} />
    </div>
  )
}

export default Asset
