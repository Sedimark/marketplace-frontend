import BackToSearchButton from './components/BackToSearchButton'
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
        <BackToSearchButton />
        <DatasetInfoComponent offering={offering} provider={provider} />
        {recommendations.length > 0 && <Recommender recommendations={recommendations} />}
      </div>
    </>
  )
}
