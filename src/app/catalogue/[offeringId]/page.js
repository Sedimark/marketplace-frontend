import BackToSearchButton from './components/BackToSearchButton'
import DatasetInfoComponent from './components/DatasetInfoComponent'
import Recommender from './components/Recommender'
import { fetchOfferingDetails } from '@/utils/catalogue'
import { fetchSimilarRecommendations } from '@/utils/recommender'
import { getProviderData } from '@/utils/selectedOffering'

export default async function Page ({ params }) {
  const { offeringId } = params
  const offeringIdDecoded = atob(decodeURIComponent(offeringId))
  const offering = await fetchOfferingDetails(offeringIdDecoded)
  const provider = await getProviderData(offering.publisher.value)
  // Replacing the alternateName with the one from the offering since we are sure to
  // have it (unlike the provider's profile server)
  provider.alternate_name = offering.alternateName.value
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
