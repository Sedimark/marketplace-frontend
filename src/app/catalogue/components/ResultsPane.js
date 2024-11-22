'use client'
import { Button } from 'flowbite-react'
import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import CustomPagination from '@/components/pagination/Pagination'
import LoadingCard from '@/app/catalogue/components/LoadingCard'
import CatalogueSideBar from './SideBar'
import ResultsList from './ResultsList'
import settings from '@/utils/settings'
import mockCatalogue from '@/utils/data/mockCatalogue.json'
import { calculateItemsPerPage, calculateTotalPages } from '../utils/paginationHelpers'
import icon from '@/utils/icons/icons'

/**
 * Component responsible for rendering a pane to display catalogue query results.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.providers - Array of Available providers.
 * @param {Array} props.keywords - The list of keywords.
 * @returns {JSX.Element} A JSX element representing the rendered pane of results.
 */
export default function ResultsPane ({
  providers,
  keywords
}) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('query') || ''
  // Component state
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [previousProvidersLength, setPreviousProvidersLength] = useState(0)
  const [previousKeywordsLength, setPreviousKeywordsLength] = useState(0)
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [selectedProviders, setSelectedProviders] = useState([])
  const [totalVcs, setTotalVcs] = useState(0)
  const [vcs, setVcs] = useState([])

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
      setVcs(data.results.slice(0, settings.batchSize))
      setResults(data.results)
      setTotalVcs(data.total)
    } else if (!data) {
      setLoading(true)
    }
  }, [data])

  // Update state when currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0, 'smooth')
    calculateItemsPerPage(currentPage, settings, data, setVcs)
  }, [currentPage, data])

  const totalPages = useMemo(() => calculateTotalPages(totalVcs, settings.batchSize), [totalVcs])
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
      {!loading && !data && ( // Error during fetch (potentially Catalogue unavailable)
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
            {icon.close}
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
            <ResultsList results={vcs} />
            <CustomPagination totalPages={totalPagesToDisplay === 0 ? 1 : totalPagesToDisplay} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  )
}
