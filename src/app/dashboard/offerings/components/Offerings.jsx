import OfferingItem from './OfferingItem'
import { fetchOfferingsCustom } from '@/utils/offeringManager'
import { Alert } from 'flowbite-react'
import { TbAlertSquareFilled } from 'react-icons/tb'

export default async function Offerings ({ offeringsIDs, currentPage }) {
  const offerings = await fetchOfferingsCustom(offeringsIDs, currentPage)

  return (
    <div className='mt-8'>
      {offerings?.error && (
        <div className='flex flex-col w-full gap-4 p-4'>
          <Alert color='failure' icon={TbAlertSquareFilled}>
            <span className='font-bold text-xl'>
              Offering Manager is not responding. Please, try again.
            </span>
          </Alert>
        </div>
      )}

      {!offerings?.error && offerings.length === 0 && (
        <div className='flex flex-col w-full gap-4 p-4'>
          <Alert color='warning' icon={TbAlertSquareFilled}>
            <span className='font-bold text-xl'>
              No offerings available to display at the moment.
            </span>
          </Alert>
        </div>
      )}

      {!offerings?.error && offerings.length > 0 && (
        <>
          {offerings.map((offering, index) => (
            <OfferingItem
              offering={offering}
              key={`${offering['@id']}-${index + 1}`}
            />
          ))}
        </>
      )}
    </div>
  )
}
