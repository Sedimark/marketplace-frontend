import Link from 'next/link'
import OfferingItem from './OfferingItem'
import { fetchOfferings } from '@/utils/catalogue'
import { Button, Alert } from 'flowbite-react'
import { HiOutlineX } from 'react-icons/hi'
import { TbAlertSquareFilled } from 'react-icons/tb'

/**
 * Component responsible for rendering a list of service offerings
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.results - An array of results where each result is a Verifiable Credential (VC)
 *
 * @returns {JSX.Element} A JSX element representing the rendered list of VCs.
 */
export default async function ResultsList ({ query, currentPage }) {
  const data = await fetchOfferings(query, currentPage)
  return (
    <>
      {!data && ( // Error during fetch (potentially Catalogue unavailable)
        <div className='flex flex-col w-full gap-4 p-4'>
          <div className='w-full gap-4 p-6 text-center bg-white border border-gray-200 rounded-lg shadow'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Catalogue service unavailable. Please try again later.</h5>
          </div>
        </div>
      )}
      {data?.error && (
        <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
          <Alert color='failure' icon={TbAlertSquareFilled}>
            <span className='font-bold text-xl'>Catalogue service is not responding. Please, try again.</span>
          </Alert>
        </div>
      )}
      {query &&
      // Damm gonna need to make this lil thing a client component to just reset the query cuz the onClick?
      //   <Button className='pl-4 m-4 mb-0 w-fit ' outline pill size='xs' color='gray' onClick={() => setQuery('')}>
        <Button className='pl-4 m-4 mb-0 w-fit ' outline pill size='xs' color='gray'>
          <span className='flex items-center '>
            {query}
            <HiOutlineX className='ml-2' />
          </span>
        </Button>}
      {!data.length && data && !data?.error && (
        <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
          <div className='w-full gap-4 p-6 text-center bg-white border border-gray-200 rounded-lg shadow'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Whoops! There are no results matching your filters criteria.</h5>
            <p className='font-normal text-gray-700'>You should try to change your filters to see more results...</p>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className='w-full bg-gray-50 '>
          <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
            {data.map((offering, index) => {
              return (
                <Link key={`${offering.offering.value}-${offering.created.value}-${index + 1}`} href={`catalogue/${btoa(offering.offering.value)}`}>
                  <OfferingItem
                    offering={offering}
                    color='bg-gray-50'
                  />
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
