import settings from '@/utils/settings'
import { fetchRecommendedOfferings } from '@/utils/catalogue'
import { fetchData } from '@/utils/helpers/fetchData'

export async function fetchQueryRecommendations (query, numRecommendations = settings.numRecommendations) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: `{"text": "${query}", "k": ${numRecommendations}}`
  }
  const url = `${settings.recommenderUrl}/api/query`
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return fetchRecommendedOfferings(data.offering_ids)
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchQueryRecommendations!')
    console.log(error)
    return { error }
  }
}

export async function fetchSimilarRecommendations (offeringId, numRecommendations = settings.numRecommendations) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: `{"id": "${offeringId}", "k": ${numRecommendations}}`
  }
  const url = `${settings.recommenderUrl}/api/similar`
  try {
    const res = await fetchData(url, options)
    const data = await res.json()
    if (!res.ok) {
      console.warn(`Warning: couldn't fetch similar recommendations for offering ${offeringId}: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`)
      console.warn('Skipping recommendations...')
      return []
    }

    return fetchRecommendedOfferings(data.offering_ids)
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchSimilarRecommendations!')
    console.log(error)
    return { error }
  }
}
