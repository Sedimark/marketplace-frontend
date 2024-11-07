import OfferingItem from './OfferingItem'

/**
 * Component responsible for rendering a list of service offerings
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.results - An array of results where each result is a Verifiable Credential (VC)
 *
 * @returns {JSX.Element} A JSX element representing the rendered list of VCs.
 */
export default function ResultsList ({ results, providersMapping }) {
  return (
    <div className='flex flex-col w-full gap-4 p-4 bg-gray-50'>
      {results.map((vc, index) => {
        return (
          <OfferingItem
            key={`${vc['@id']}-${vc.issuanceDate}-${index + 1}`}
            vc={vc}
            providerName={checkMatchingProvider(providersMapping, vc[0].credentialSubject['gx:providedBy'].id)}
            price={randomPrice()}
          />
        )
      })}
    </div>
  )
}

/**
 * Due the Inconsistencies in provider IDs across endpoints this function
 * checks if a provider matches the given ID and returns the corresponding mapping.
 *
 * @param {Object} providersMapping - The mapping of providers.
 * @param {string} id - The ID to match against the providers.
 * @returns {any} - The mapping of the matching provider.
 */
function checkMatchingProvider (providersMapping, id) {
  const providedById = extractId(id)
  for (const provider in providersMapping) {
    const providerId = extractId(provider)
    if (provider === id || providerId === providedById) {
      return providersMapping[provider]
    }
  }
  return 'OTHER'
}

/**
 * Extracts the ID from the providers ID using a regular expression.
 * @param {string} str - The input string from which to extract the ID.
 * @returns {string|null} - The extracted ID or null if no match is found.
 */
export function extractId (str) {
  const regex = /[a-f0-9]{64}/
  const match = str.match(regex)
  return match ? match[0] : null
}

/**
 * Generates a random price between 1 and 50 (inclusive).
 *
 * @returns {number} The randomly generated price.
 */
export function randomPrice () {
  return Math.floor(Math.random() * 50) + 1
}
