import { Badge } from 'flowbite-react'
import Image from 'next/image'
import Credentials from './Credentials'
import ProviderCard from './ProviderCard'
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
            <svg class='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fill-rule='evenodd' d='M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z' clip-rule='evenodd' />
            </svg>
            <p>{location}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <svg class='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fill-rule='evenodd' d='M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z' clip-rule='evenodd' />
            </svg>
            <p>Published {createdAt.toISOString().split('T')[0]}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <svg class='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
              <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3' />
            </svg>
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
