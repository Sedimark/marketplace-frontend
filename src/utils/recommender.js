import settings from '@/utils/settings'
import { fetchOfferingsDetails } from '@/utils/catalogue'

export async function fetchQueryRecommendations (query, numRecommendations) {
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

  const dataRec = await fetchOfferingsDetails(data.offering_ids)

  return dataRec.results.bindings
}

export async function fetchSimilarRecommendations (offeringId, numRecommendations) {
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

  const dataRec = await fetchOfferingsDetails(data.offering_ids)

  return dataRec.results.bindings
}
