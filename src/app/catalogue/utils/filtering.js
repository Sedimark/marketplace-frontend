import { getFilters } from '@/services/server'
/**
 * Retrieves the filters data.
 * @returns {Promise<{keywords: Array, providers: Object, providersMapping: Object}>} The filters data.
 */
export async function getFiltersData () {
  try {
    const filters = await getFilters()
    const keywords = filters.available_services
    const providerNamesSet = new Set()
    const providers = {}
    const providersMapping = {}

    for (const provider of filters.available_providers) {
      if (
        (provider.type && provider.type[0] === 'VerifiableCredential') ||
        (provider['@type'] && provider['@type'][0] === 'VerifiableCredential')
      ) {
        const providerId = provider.id ? provider.id : provider['@id']
        const providerName = provider.credentialSubject['gx:legalName']
        if (providerName && !providerNamesSet.has(providerName)) {
          providerNamesSet.add(providerName)
          providers[providerId] = providerName
          providersMapping[provider.credentialSubject.id] = providerName
        }
      }
    }

    return { keywords, providers, providersMapping }
  } catch (error) {
    console.error('Error fetching Filters Data', error)
    return { keywords: [], providers: {}, providersMapping: {} }
  }
}
