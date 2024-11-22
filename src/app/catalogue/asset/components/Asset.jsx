import { Badge } from 'flowbite-react'
import Image from 'next/image'
import Credentials from './Credentials'
import ProviderCard from './ProviderCard'
import icon from '@/utils/icons/icons'
import mockProvider from '@/utils/data/mockProvider.json'

function Asset ({ asset }) {
  const title = asset.title
  const imageUrl = asset.picture
  const shortDescription = asset.short_description
  const keywords = asset.keywords
  const createdAt = new Date(asset.created_at)
  const updatedAt = new Date(asset.updated_at)
  const location = asset.location
  const description = asset.description
  return (
    <div className='flex flex-col bg-sedimark-light-blue'>
      <h5 className='text-3xl font-bold tracking-tight text-black dark:text-white'>
        {title}
      </h5>
      {/* Details row */}
      <div className='flex justify-between m-6 ml-0'>
        <div className='flex flex-row flex-wrap gap-4'>
          <div className='flex flex-row items-center gap-2'>
            {icon.location}
            <p>{location}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            {icon.calendar}
            <p>Published {createdAt.toISOString().split('T')[0]}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            {icon.update}
            <p>Updated {updatedAt.toISOString().split('T')[0]}</p>
          </div>
        </div>
      </div>
      {/* Descriptions */}
      <div className='bg-sedimark-light-blue'>
        <div className='float-left  mr-5'>
          <Image src={imageUrl} alt={title} width={224} height={224} className='max-w-56 max-h-56 min-w-16 min-h-16 rounded-sm shadow-md' />
          <p className='text-xs text-right text-gray-500'>Designed by <a href='https://www.freepik.com' target='_blank' rel='noreferrer' className='text-blue-500'>Freepik</a></p>
        </div>
        <h5 className='text-xl tracking-tight text-black dark:text-white mb-2'>
          {title}
        </h5>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {shortDescription}
        </p>
        <p className='font-normal text-gray-700 dark:text-gray-400'>
          {description}
        </p>
        <div className='flex items-center flex-wrap'>
          <h4 className='text-lg font-bold text-center m-3 ml-0'>Keywords:</h4>
          {keywords.map((keyword, index) => {
            return (
              <Badge key={`${keyword}-${index}`} className='text-sedimark-deep-blue bg-sedimark-clear-blue m-3 ml-0 mb-2'>{keyword}</Badge>
            )
          })}
        </div>
      </div>
      <Credentials asset={asset} />
      <ProviderCard provider={mockProvider} />
    </div>
  )
}

export default Asset
