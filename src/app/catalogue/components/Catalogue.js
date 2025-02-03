import { Suspense } from 'react'
import ResultsPane from './ResultsPane'
import mockProviders from '@/utils/data/mockProviders.json'
import mockFilters from '@/utils/data/mockFilters.json'
import fetchCatalogueData from '@/utils/catalogue'

/**
 * Renders the Catalogue component.
 *
 * This function fetches mock providers and keywords, and then renders the ResultsPane component
 * with the fetched data. The ResultsPane component is wrapped in a Suspense component to handle
 * asynchronous loading.
 *
 * @returns {JSX.Element} The Catalogue component.
 */
export default async function Catalogue ({ query, currentPage }) {
  const providers = mockProviders
  const keywords = mockFilters
  const data = await fetchCatalogueData(query, currentPage)

  return (
    <Suspense>
      <ResultsPane
        providers={providers}
        keywords={keywords}
        data={data}
      />
    </Suspense>
  )
}
