import ResultsPane from './ResultsPane'
import { getFiltersData } from '../utils/filtering'
import { Suspense } from 'react'

/**
 * Wrapper around the ResultsPane component that queries the catalogue. *
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element representing the rendered catalogueresults
 */
export default async function Catalogue () {
  const { keywords, providers, providersMapping } = await getFiltersData()
  return (
    <Suspense>
      <ResultsPane
        providers={providers}
        providersMapping={providersMapping}
        keywords={keywords}
      />
    </Suspense>
  )
}
