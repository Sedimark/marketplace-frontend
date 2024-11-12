import { Suspense } from 'react'
import ResultsPane from './ResultsPane'
import mockProviders from '@/utils/data/mockProviders.json'
import mockFilters from '@/utils/data/mockFilters.json'

/**
 * Renders the Catalogue component.
 *
 * This function fetches mock providers and keywords, and then renders the ResultsPane component
 * with the fetched data. The ResultsPane component is wrapped in a Suspense component to handle
 * asynchronous loading.
 *
 * @returns {JSX.Element} The Catalogue component.
 */
export default function Catalogue () {
  const providers = mockProviders
  const keywords = mockFilters

  return (
    <Suspense>
      <ResultsPane
        providers={providers}
        keywords={keywords}
      />
    </Suspense>
  )
}
