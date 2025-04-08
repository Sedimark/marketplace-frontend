import { Suspense } from 'react'
import CustomPagination from '@/components/pagination/Pagination'
import LoadingCard from '@/app/catalogue/components/LoadingCard'
// import CatalogueSideBar from './SideBar'
import ResultsList from './ResultsList'
import settings from '@/utils/settings'
import { calculateTotalPages } from '../utils/paginationHelpers'
import { fetchOfferingsCountFiltered } from '@/utils/catalogue'

/**
 * Component responsible for rendering a pane to display catalogue query results.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.providers - Array of Available providers.
 * @param {Array} props.keywords - The list of keywords.
 * @returns {JSX.Element} A JSX element representing the rendered pane of results.
 */
export default async function ResultsPane ({ query, currentPage }) {
  const dataCount = await fetchOfferingsCountFiltered(query)
  const totalPages = calculateTotalPages(dataCount, settings.batchSize)

  return (
    <div className='flex flex-row bg-gray-50'>
      {/* <CatalogueSideBar
        providers={providers}
        keywords={keywords}
        selectedProviders={selectedProviders}
        setSelectedProviders={setSelectedProviders}
        selectedKeywords={selectedKeywords}
        setSelectedKeywords={setSelectedKeywords}
      /> */}
      <div className='flex flex-col w-full bg-gray-50'>
        <div className='w-full bg-gray-50 '>
          <p className='flex justify-end pr-4 pt-2.5 text-xs'> {(currentPage * settings.batchSize) - (settings.batchSize - 1)} - {currentPage * settings.batchSize} of over {dataCount} results</p>
          <Suspense fallback={<LoadingCard />} key={query + currentPage}>
            <ResultsList query={query} currentPage={currentPage} dataCount={dataCount} totalPages={totalPages} />
          </Suspense>
          <CustomPagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}
