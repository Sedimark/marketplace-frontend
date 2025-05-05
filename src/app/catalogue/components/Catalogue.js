import ResultsPane from './ResultsPane'
import Recommender from '../[offeringId]/components/Recommender'

/**
 * Renders the Catalogue component.
 *
 * This function fetches mock providers and keywords, and then renders the ResultsPane component
 * with the fetched data. The ResultsPane component is wrapped in a Suspense component to handle
 * asynchronous loading.
 *
 * @returns {JSX.Element} The Catalogue component.
 */
export default function Catalogue ({ query, keywords, providers, currentPage }) {
  return (
    <>
      <ResultsPane
        query={query}
        keywords={keywords}
        providers={providers}
        currentPage={currentPage}
      />
      <Recommender query={query} />
    </>
  )
}
