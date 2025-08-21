import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

/**
 * Fetch call to obtain ALL the IDs stored on the Offering Manager.
 * @async
 * @param {string} contractAgreementIdFilter - Value expected to filter by Contract ID.
 * @returns An Array of Strings representing the IDs of ALL the offerings on the offering-manager
 */
export async function fetchOfferingsIDs () {
  const url = `${settings.offeringManagerUrl}/offerings`
  const options = {
    method: 'GET'
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    const offeringIds = (data['sedi:hasOffering'] || []).map(offering => offering['@id'])

    return offeringIds
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchOfferingsIDs!')
    console.log(error)
    return { error }
  }
}

/**
 * Fetch call to obtain one offering by its ID.
 * @async
 * @param {string} offeringId - URL + ID offer to search for it.
 * @returns An Array of JSON obj representing the Offering.
 */
export async function fetchOffering (offeringId) {
  const url = `${offeringId}` // This is a URL + ID, as it is returned by the Offering Manager this way!
  const options = {
    method: 'GET'
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchOffering!')
    console.log(error)
    return { error }
  }
}

/**
 * Fetch call to delete one offering by its ID.
 * @async
 * @param {string} offeringId - URL + ID offer to delete.
 * @returns An Array of JSON obj representing the Offering.
 */
export async function deleteOffering (offeringId) {
  const extractedId = offeringId.split('/').pop()
  const url = `${settings.offeringManagerUrl}/offerings/${extractedId}`
  console.log(url)
  const options = {
    method: 'DELETE'
  }
  try {
    const data = await fetchData(url, options)
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on deleteOffering!')
    console.log(error)
    return { error }
  }
}

/**
 * Multiple fetch call to obtain a set of Offerings, while maintaining a "pagination" structure.
 * Will simulate the pagination on their side, but it is done here!
 * @async
 * @param {Array} offeringIds - Array of STRINGS to fetch.
 * @param {string} currentPage - Used for pagination.
 * @returns An Array of JSON obj representing the Offerings.
 */
export async function fetchOfferingsCustom (offeringIds, currentPage) {
  // Pagination custom
  try {
    const pageSize = parseInt(settings.offeringsPageSize)
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedIds = offeringIds.slice(start, end)
    const data = await Promise.all(
      paginatedIds.map((id) =>
        fetchOffering(id)
      )
    )
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchOfferingsCustom!')
    console.log(error)
    return { error }
  }
}

/**
 * New single fetch with pagination
 * @async
 * @param {string} currentPage - Used for pagination.
 * @returns An Array of JSON obj representing the Offerings.
 */
export async function fetchOfferings (currentPage) {
  const pageSize = parseInt(settings.offeringsPageSize)
  // Yes, need that -1 on currentPage as they use 0 as page 1
  const url = `${settings.offeringManagerUrl}/offerings?size=${pageSize}&page=${currentPage - 1}`
  const options = {
    method: 'GET'
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    // Return only the offerings array, as we dont use anything from the new response!
    return data['sedi:hasOffering'] || []
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchOfferings!')
    console.log(error)
    return { error }
  }
}
