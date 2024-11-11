'use client'
import useSWR from 'swr'
import { Button } from 'flowbite-react'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import CustomPagination from '@/components/pagination/Pagination'
import LoadingCard from '@/app/catalogue/components/LoadingCard'
import CatalogueSideBar from './SideBar'
import ResultsList from './ResultsList'
import settings from '@/utils/settings'
import mockCatalogue from '@/utils/data/mockCatalogue.json'

/**
 * Component responsible for rendering a pane to display catalogue query results.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.providers - Array of Available providers returned by filters endpoint.
 * @param {Array} props.keywords - The list of keywords returned by filters endpoint.
 * @returns {JSX.Element} A JSX element representing the rendered pane of results.
 */
export default function ResultsPane ({
  providers,
  keywords
}) {
  // Component state
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [previousProvidersLength, setPreviousProvidersLength] = useState(0)
  const [previousKeywordsLength, setPreviousKeywordsLength] = useState(0)
  const [results, setResults] = useState([])
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('query') || ''
  const [query, setQuery] = useState(initialQuery)
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [selectedProviders, setSelectedProviders] = useState([])
  const [totalVcs, setTotalVcs] = useState(0)

  const data = mockCatalogue

  // Update state when selected providers or keywords change
  useEffect(() => {
    if (
      selectedProviders.length !== previousProvidersLength ||
      selectedKeywords.length !== previousKeywordsLength
    ) {
      setCurrentPage(1)
      setPreviousProvidersLength(selectedProviders.length)
      setPreviousKeywordsLength(selectedKeywords.length)
    }
  }, [
    previousKeywordsLength,
    previousProvidersLength,
    selectedKeywords.length,
    selectedProviders,
    selectedProviders.length
  ])

  // Update state when query changes
  useEffect(() => {
    const currentQuery = searchParams.get('query')
    if (currentQuery) {
      setQuery(currentQuery)
    }
  }, [searchParams])

  // Update state when data is fetched
  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0, 'smooth')
      setLoading(false)
      setResults(data.results)
      setTotalVcs(data.total)
    } else if (!data ) {
      setLoading(true)
    }
  }, [data])

  /**
   * Calculates the total number of pages based on the total number of VCs and the batch size.
   *
   * @param {number} totalVcs - The total number of VCs.
   * @param {number} batchSize - The batch size.
   * @returns {number} The total number of pages.
   */
  function calculateTotalPages (totalVcs, batchSize) {
    return Math.floor((totalVcs || 0) / batchSize)
  }

  const totalPages = useMemo( () => calculateTotalPages( totalVcs, settings.batchSize ), [totalVcs] )
  const totalPagesToDisplay = totalPages

  return (
    <div className='flex flex-row bg-gray-50'>
      <CatalogueSideBar
        providers={providers}
        keywords={keywords}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        selectedKeywords={selectedKeywords}
        setSelectedKeywords={setSelectedKeywords}
      />
      { !loading && !data && ( // Error during fetch (potentially Catalogue unavailable)
        <div className='flex flex-col w-full gap-4 p-4'>
          <div className='w-full gap-4 p-6 text-center bg-white border border-gray-200 rounded-lg shadow'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Catalogue service unavailable. Please try again later.</h5>
          </div>
        </div>
      )}
      {loading && (
        <LoadingCard />
      )}
      <div className='flex flex-col w-full bg-gray-50'>
        {!loading && query &&
          <Button className='pl-4 m-4 mb-0 w-fit ' outline pill size='xs' color='gray' onClick={() => setQuery('')}>
            {query}
            <svg className='w-5 h-5 ml-4' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
              <path clipRule='evenodd' fillRule='evenodd' d='M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z' />
            </svg>
          </Button>}
        {!loading && !results.length && data && (
          <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
            <div className='w-full gap-4 p-6 text-center bg-white border border-gray-200 rounded-lg shadow'>
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>Whoops! There are no results matching your filters criteria.</h5>
              <p className='font-normal text-gray-700'>You should try to change your filters to see more results...</p>
            </div>
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className='w-full bg-gray-50 '>
            <p className='flex justify-end pr-4 pt-2.5 text-xs'> {(currentPage * settings.batchSize) - (settings.batchSize - 1)} - {currentPage * settings.batchSize} of over {totalVcs} results</p>
            <ResultsList results={results} />
            <CustomPagination totalPages={totalPagesToDisplay === 0 ? 1 : totalPagesToDisplay} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}
