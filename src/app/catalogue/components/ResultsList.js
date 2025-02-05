import Link from 'next/link'
import OfferingItem from './OfferingItem'

/**
 * Component responsible for rendering a list of service offerings
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.results - An array of results where each result is a Verifiable Credential (VC)
 *
 * @returns {JSX.Element} A JSX element representing the rendered list of VCs.
 */
export default function ResultsList ({ results }) {
  return (
    <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
      {results.map((offering, index) => {
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
  )
}
