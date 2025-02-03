import { Suspense } from 'react'
import SearchBar from '@/components/home/SearchBar'
import Catalogue from './components/Catalogue'
import LoadingCard from './components/LoadingCard'

/**
 * Catalogue browsing page, consisting of a search bar and a filterable/sortable list of results.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.searchParams - The search parameters to be used when rendering the page.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element representing the rendered page.
 */
export default function Page ({ searchParams }) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <div className='bg-sedimark-dark-deep-blue'>
      <SearchBar />
      <Suspense
        key={query + currentPage} // Ensures the Catalogue component is re-rendered when the search parameters change
        fallback={<LoadingCard />}
      >
        <Catalogue query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  )
}
