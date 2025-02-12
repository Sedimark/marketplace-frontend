import { Button } from 'flowbite-react'
import { HiArrowLeft } from 'react-icons/hi'
import DatasetInfoComponent from './components/DatasetInfoComponent'
import Recommender from './components/Recommender'
import { fetchOfferingDetails, fetchProvider } from '@/utils/catalogue'
import { fetchSimilarRecommendations } from '@/utils/recommender'

export default async function Page ({ params }) {
  const { offeringId } = params
  const offeringIdDecoded = atob(decodeURIComponent(offeringId))
  const offering = await fetchOfferingDetails(offeringIdDecoded)
  const provider = await fetchProvider(offering.publisher.value)
  const recommendations = await fetchSimilarRecommendations(offeringIdDecoded, 5)
  return (
    <>
      <div className='bg-sedimark-light-blue pt-2 pb-2'>
        <Button className='max-w-fit m-2 ml-10 bg-sedimark-light-gray enabled:hover:bg-sedimark-medium-gray text-sedimark-dark-gray' href='/catalogue'>
          <span className='flex items-center'>
            <HiArrowLeft className='mr-2' />
            Back to search
          </span>
        </Button>
        <DatasetInfoComponent offering={offering} provider={provider} />
        <Recommender recommendations={recommendations} />
      </div>
    </>
  )
}
