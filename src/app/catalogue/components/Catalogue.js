import ResultsPane from './ResultsPane'
import { dedupeResults, queryCatalogue } from '../utils/query'

/**
 * Wrapper around the ResultsPane component that queries the catalogue and deduplicates the results.
 * It ensures the catalogue is queried on the server side, and passes the results to the client side
 * ResultsPane component for further filering/sorting.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.searchParams - The search parameters to be used when rendering the page.
 * @param {string} props.searchParams.type - The type of the search, defaults to "services".
 * @param {string} props.searchParams.query - The query string for the search, defaults to an empty string.
 * @param {number} props.searchParams.page - The page number for the search, defaults to 1.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to a JSX element representing the rendered catalogueresults
 * results.
 */
export default async function Catalogue ({ queryType, query, currentPage }) {
  const results = await queryCatalogue(queryType, query, currentPage)
  const { providers, offerings, providersMapping, keywords } =
    dedupeResults(results)

  return (
    <ResultsPane
      queryType={queryType}
      providers={providers}
      offerings={offerings}
      providersMapping={providersMapping}
      keywords={keywords}
    />
  )
}
