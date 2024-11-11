import { Suspense } from 'react'
import ResultsPane from './ResultsPane'
import mockProviders from '@/utils/data/mockProviders.json'
import mockFilters from '@/utils/data/mockFilters.json'

/**
 * Wrapper around the ResultsPane component that queries the catalogue. *
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element representing the rendered catalogueresults
 */
export default async function Catalogue () {
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
