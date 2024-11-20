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
            <svg className='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z' />
            </svg>
            <p>Dataset</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <svg className='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z' clipRule='evenodd' />
            </svg>
            <p>{location}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <svg className='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z' clipRule='evenodd' />
            </svg>
            <p>Published {createdAt.toISOString().split('T')[0]}</p>
          </div>
          <div className='flex flex-row items-center gap-2'>
            <svg className='w-5 h-5 text-black dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3' />
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
