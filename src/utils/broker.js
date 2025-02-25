import settings from '@/utils/settings'

const contextLink = '<https://sedimark.github.io/broker/jsonld-contexts/sedimark-compound.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"'

// For now its the only interaction needed with the broker, may be expanded on the future?
export async function fetchAssetsFromBroker () {
  const params = new URLSearchParams({ type: 'Asset', options: 'keyValues' })
  const options = {
    method: 'GET',
    headers: {
      Link: contextLink
    }
  }
  const url = `${settings.brokerUrl}/ngsi-ld/v1/entities?${params}`
  const data = await fetch(url, options).then(response => response.json())
  return data
}
