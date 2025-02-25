import settings from '@/utils/settings'

const context_link = "<https://sedimark.github.io/broker/jsonld-contexts/sedimark-compound.jsonld>; rel=\"http://www.w3.org/ns/json-ld#context\"; type=\"application/ld+json\""

// For now its the only interaction needed with the broker, may be expanded on the future?
export async function fetchAssetsFromBroker() {
    const params = new URLSearchParams({type: 'Asset', options: 'keyValues'})
    const options = {
        method: 'GET',
        headers: {
        "Link": context_link
        },
    }
    const url = `${settings.brokerUrl}/ngsi-ld/v1/entities?${params}`
    const data = await fetch(url, options).then(response => response.json())
    return data
}