import { Button } from 'flowbite-react'
import { HiArrowLeft } from 'react-icons/hi'
import DatasetInfoComponent from './components/DatasetInfoComponent'
import Recommender from './components/Recommender'
import mockRecommendations from '@/utils/data/mockRecommendations.json'

export default function Page () {
  return (
    <>
      <div className='bg-sedimark-light-blue pt-2 pb-2'>
        <Button className='max-w-fit m-2 ml-10 bg-sedimark-light-gray enabled:hover:bg-sedimark-medium-gray text-sedimark-dark-gray' href='/catalogue'>
          <span className='flex items-center'>
            <HiArrowLeft className='mr-2' />
            Back to search
          </span>
        </Button>
        <DatasetInfoComponent />
        <Recommender recommendations={mockRecommendations.recommendations} />
      </div>
    </>
  )
}
