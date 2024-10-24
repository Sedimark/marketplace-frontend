const federatedCatalogueApi = process.env.FEDERATED_CATALOGUE_API
/**
 * Remove duplicate results from a given array of catalogue query results.
 * It also creates a mapping of providers and their legal names, and a sorted array of unique keywords.
 *
 * @param {Array} results - Results from the catalogue API (array of arrays of 3 VCs, for the offering, the
 * participant and the compliance checks).
 *
 * @returns {Object} An object containing:
 * - providers: An array of VCs of type 'gx:LegalParticipant' with unique IDs.
 * - offerings: An array of VCs of type 'gx:ServiceOffering' with unique IDs.
 * - providersMapping: An object mapping the IDs of 'gx:LegalParticipant' to their 'gx:legalName'.
 * - keywords: A sorted array of unique keywords found in the 'gx:keyword' property of 'gx:ServiceOffering'.
 */

export function dedupeResults (results) {
  const providers = []
  const knownProviders = new Set()
  const offerings = []
  const knownOfferings = new Set()
  const providersMapUnordered = {}
  const keywordsSet = new Set()
  for (const result of results) {
    for (const vc of result) {
      const subject = vc.credentialSubject
      if (subject && !Array.isArray(subject)) {
        if (
          subject.type === 'gx:ServiceOffering' &&
          !knownOfferings.has(subject.id)
        ) {
          offerings.push(vc)
          knownOfferings.add(subject.id)
          const kws = subject['gx:keyword'] ?? [] // in case gx:keyword is not present in the offering SD
          kws.forEach((keyword) => keywordsSet.add(keyword))
        } else if (
          subject.type === 'gx:LegalParticipant' &&
          !knownProviders.has(subject.id)
        ) {
          providers.push(vc)
          knownProviders.add(subject.id)
          providersMapUnordered[subject.id] = subject['gx:legalName']
        }
      }
    }
  }
  const keywords = Array.from(keywordsSet).sort()
  const providersMapping = Object.entries(providersMapUnordered)
    .sort(([, a], [, b]) => a.localeCompare(b))
    .reduce(
      (r, [k, v]) => ({
        ...r,
        [k]: v
      }),
      {}
    )

  return { providers, offerings, providersMapping, keywords }
}

/**
 * Query the catalogue. It sends a POST request to the federated catalogue API with a
 * JSON body containing either provider_ids or service_by_name depending on the type.
 *
 * @param {string} type - The type of the query, can be 'providers' or any other value.
 * @param {string} query - The query string to be used in the body of the POST request.
 * @param {number} page - The page number for the query.
 * @param {number} [size=100] - The size of the page for the query, defaults to 100.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of results from the catalogue API.
 */
export async function queryCatalogue (type, query, page, size = 100) {
  const body = {}
  if (type === 'providers') {
    body.provider_ids = query
  } else {
    body.service_by_name = query
  }

  const results = fetch(
    federatedCatalogueApi,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  ).then((res) => res.json())
  return results
}
