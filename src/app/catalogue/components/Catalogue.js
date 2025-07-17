import ResultsPane from './ResultsPane'
import Recommender from '../[offeringId]/components/Recommender'

/**
 * Renders the Catalogue component.
 *
 * This function renders the ResultsPane component and recommended offerings.
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
