/**
 * Removes from a given list of provider participant Verifiable Credentials any VC whose
 * participant ID is not in the given list of selected providers.
 *
 * @param {Array} providers - An array of Verifiable Credentials (VCs) of type 'gx:LegalParticipant'.
 * @param {Array} selectedProviders - An array of selected provider IDs.
 *
 * @returns {Array} An array of filtered providers.
 */
export function getFilteredProviders (providers, selectedProviders) {
  const filteredProviders = []
  for (const prov of providers) {
    if (selectedProviders.includes(prov.credentialSubject.id)) {
      filteredProviders.push(prov)
    }
  }
  return filteredProviders
}

/**
 * Removes from a given list of service offering Verifiable Credentials any VC whose
 * provider is not in the given list of selected providers or does not have any matching
 * keywords with the given list of selected keywords.
 * If a VC does not contain keywords, it is filtered only based on its provider.
 *
 * @param {Array} providers - An array of Verifiable Credentials (VCs) of type 'gx:LegalParticipant'.
 * @param {Array} selectedProviders - An array of selected provider IDs.
 * @param {Array} selectedKeywords - An array of selected keywords.
 *
 * @returns {Array} An array of filtered offerings.
 */
export function getFilteredOfferings (
  offerings,
  selectedProviders,
  selectedKeywords
) {
  const filteredOfferings = []
  for (const off of offerings) {
    let hasKeyword = false
    let hasProvider = false
    const kws = off.credentialSubject['gx:keyword'] ?? []
    if (!kws) {
      hasKeyword = true
    } else {
      for (const kw of kws) {
        if (selectedKeywords.includes(kw)) {
          hasKeyword = true
          break
        }
      }
    }
    if (selectedProviders.includes(off.credentialSubject['gx:providedBy'].id)) {
      hasProvider = true
    }
    if (hasProvider && hasKeyword) {
      filteredOfferings.push(off)
    }
  }
  return filteredOfferings
}

/**
 * Sorts an array of results based on a sort field and a sort order. It sorts the results
 * in place and then reverses the array if the sort order is descending.
 * The sort field can be 'date' or any other value. If the sort field is 'date', the results are sorted
 * based on the issuanceDate of each result. If it's 'name' or any other value, the results are sorted
 * based on the 'gx:name' or 'gx:legalName' property of the credentialSubject of each result.
 *
 * @param {Array} results - An array of results where each result is a Verifiable Credential (VC).
 * Each VC is an object that contains a credentialSubject and an issuanceDate.
 * @param {string} sortField - The field to sort the results by, can be 'name', 'date' or any other value.
 * @param {boolean} descending - Whether to sort the results in descending order.
 *
 * @returns {Array} An array of sorted results.
 */
export function getSortedResults (results, sortField, descending) {
  const sortedResults = results.sort((a, b) => {
    if (sortField === 'date') {
      const aDate = new Date(a.issuanceDate)
      const bDate = new Date(b.issuanceDate)
      return aDate - bDate
    } else {
      // Sorting by name
      const aName =
        a.credentialSubject['gx:name'] ?? a.credentialSubject['gx:legalName']
      const bName =
        b.credentialSubject['gx:name'] ?? b.credentialSubject['gx:legalName']
      return aName.localeCompare(bName)
    }
  })
  if (descending) {
    sortedResults.reverse()
  }
  return sortedResults
}
