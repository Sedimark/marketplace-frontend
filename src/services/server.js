import settings from '@/utils/settings'

/**
 * Retrieves the catalogue based on the provided query and page number.
 * @param {string} query - The search query for filtering the catalogue.
 * @param {number} page - The page number of the catalogue to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the catalogue data.
 */
export async function getCatalogue (query, page) {
  try {
    const url = settings.federatedCatalogueApi + `?page=${page}&size=${settings.batchSize}`
    const body = {}
    if (query) {
      body.search_service_name = query
    }
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    const response = await fetch(url, options).then((res) => res.json())
    return response
  } catch (error) {
    // TODO: Handle error UI, show modal?
    console.log('Error fetching data :', error)
  }
}

/**
 * Retrieves filters from the federated catalogue.
 * @returns {Promise<Object>} The response object containing the filters data , available providers and services.
 */
export async function getFilters () {
  try {
    const url = settings.federatedCatalogueFilters
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options).then((res) => res.json())
    return response
  } catch (error) {
    console.log('Error fetching FILTERS data  :', error)
    return { available_providers: [], available_services: [] }
  }
}

/**
 * Retrieves the providers from the federated catalogue.
 * @returns {Promise<Object>} The response object containing the providers data.
 *   @throws {Error} If there is an error fetching the providers data.
 */
export async function getProviders () {
  try {
    const url = settings.federatedCatalogueProviders
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options).then((res) => res.json())
    return response
  } catch (error) {
    console.log('Error fetching PROVIDERS data  :', error)
    return []
  }
}
