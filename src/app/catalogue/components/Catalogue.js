import { Suspense } from 'react'
import ResultsPane from './ResultsPane'
import { fetchOfferings, fetchProviders, fetchKeywords } from '@/utils/catalogue'

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
  const providers = await fetchProviders(query)
  const keywords = await fetchKeywords(query)
  const data = await fetchOfferings(query, currentPage)

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
