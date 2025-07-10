import OfferingItem from './OfferingItem'
import { fetchOfferingsCustom } from '@/utils/offeringManager'

export default async function Offerings ({ offeringsIDs, currentPage }) {
  const offerings = await fetchOfferingsCustom(offeringsIDs, currentPage)
  return (
    <div className='mt-8'>
      {offerings.map((offering, index) => {
        return (
          <OfferingItem
            offering={offering}
            key={`${offering['@id']}-${index + 1}`}
          />
        )
      })}
    </div>
  )
}
