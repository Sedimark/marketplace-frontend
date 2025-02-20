import settings from '@/utils/settings'
import { fetchRecommendedOfferings } from '@/utils/catalogue'

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
  const data = await fetch(url, options).then(response => response.json())

  return fetchRecommendedOfferings(data.offering_ids)
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
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok) {
    console.warn(`Warning: couldn't fetch similar recommendations for offering ${offeringId}: ${res.status} ${res.statusText} - ${JSON.stringify(data)}`)
    console.warn('Skipping recommendations...')
    return []
  }

  return fetchRecommendedOfferings(data.offering_ids)
}
