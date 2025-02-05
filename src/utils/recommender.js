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

  const dataRec = await fetchRecommendedOfferings(data.offering_ids)

  return dataRec.results.bindings
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
  const data = await fetch(url, options).then(response => response.json())

  const dataRec = await fetchRecommendedOfferings(data.offering_ids)

  return dataRec.results.bindings
}
