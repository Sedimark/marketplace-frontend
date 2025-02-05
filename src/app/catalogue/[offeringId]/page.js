import { Button } from 'flowbite-react'
import { HiArrowLeft } from 'react-icons/hi'
import DatasetInfoComponent from './components/DatasetInfoComponent'
import Recommender from './components/Recommender'
import { fetchOfferingsDetails } from '@/utils/catalogue'
import { fetchSimilarRecommendations } from '@/utils/recommender'

export default async function Page ({ params }) {
  const { offeringId } = params
  const offeringIdDecoded = atob(offeringId)
  console.dir(offeringIdDecoded)
  const offering = await fetchOfferingsDetails([offeringIdDecoded])
  console.dir(offering.results.bindings[0])
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
        <DatasetInfoComponent offering={offering.results.bindings[0]} />
        <Recommender recommendations={recommendations} />
      </div>
    </>
  )
}
