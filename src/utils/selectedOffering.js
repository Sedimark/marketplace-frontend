import { resolveDID } from './dlt.js'
import { getUserData } from './webserver.js'

export async function getProviderData (did) {
  const didDoc = await resolveDID(did)
  if (didDoc.error) {
    console.log(`Error resolving DID ${did}:`, didDoc.error)
    return { did, error: 'Error resolving DID' }
  }

  if (!didDoc.data || !didDoc.data.service) {
    console.log(`No service found in DID document for ${did}`)
    return { did, error: 'No service found in DID document' }
  }

  const profileSvc = didDoc.data.service.find(svc => svc.id.endsWith('profile'))
  if (!profileSvc || !profileSvc.serviceEndpoint) {
    console.log(`No profile service found in DID document for ${did}`)
    return { did }
  }

  const connectorSvc = didDoc.data.service.find(svc => svc.id.endsWith('connector'))
  if (!connectorSvc || !connectorSvc.serviceEndpoint) {
    console.log(`No connector service found in DID document for ${did}`)
    return { did }
  }

  const profile = await getUserData(profileSvc.serviceEndpoint)
  const providerConnectorURL = connectorSvc.serviceEndpoint
  if (profile.error) {
    console.log(`Error fetching profile for DID ${did}:`, profile.error)
    return { did }
  }

  return { did, ...profile, connector_url: providerConnectorURL }
}
