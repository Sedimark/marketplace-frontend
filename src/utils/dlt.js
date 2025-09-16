import settings from '@/utils/settings'
import { fetchData } from './helpers/fetchData'

export async function createIdentity (username, profileUrl, connectorUrl, selfListingUrl) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      credential: {
        alternateName: username
      },
      services: [
        {
          id: 'profile',
          type: 'ServiceType',
          serviceEndpoint: profileUrl
        },
        {
          id: 'connector',
          type: 'ServiceType',
          serviceEndpoint: connectorUrl
        },
        {
          id: 'self-listing',
          type: 'ServiceType',
          serviceEndpoint: selfListingUrl
        }
      ]
    })
  }

  const url = `${settings.dltBoothUrl}/api/delegated/identities`

  try {
    const data = await fetchData(url, options).then(response => response.json())
    console.dir(data)
    return { data }
  } catch (error) {
    console.log('Error creating identity in DLT Booth:')
    console.log(error)
    return { error }
  }
}

export async function getIdentity () {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }
  const url = `${settings.dltBoothUrl}/api/delegated/identities`

  try {
    const data = await fetchData(url, options).then(response => response.json())
    return { data }
  } catch (error) {
    console.log('Error getting identity in DLT Booth:')
    console.log(error)
    return { error }
  }
}

export async function deleteIdentity () {
  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  }
  const url = `${settings.dltBoothUrl}/api/delegated/identities`

  try {
    const data = await fetchData(url, options).then(response => response.json())
    return { data }
  } catch (error) {
    console.log('Error deleting identity in DLT Booth:')
    console.log(error)
    return { error }
  }
}

export async function resolveDID (did) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }

  const params = new URLSearchParams({ did })
  const url = `${settings.dltBoothUrl}/api/dids?${params.toString()}`

  try {
    const data = await fetchData(url, options).then(response => response.json())
    return { data }
  } catch (error) {
    console.log('Error resolving DID in DLT Booth:')
    console.log(error)
    return { error }
  }
}
