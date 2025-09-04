import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'
import { getIdentity } from '@/utils/dlt'

function getCreateOfferingBody (offeringData, identity) {
  const keywordArrayFormatted = []
  offeringData.keywords.forEach(keyword => {
    keywordArrayFormatted.push({ '@value': keyword, '@type': 'xsd:string' })
  })
  const headersArrayFormatted = []
  offeringData.headers.forEach(header => {
    headersArrayFormatted.push({
      'sedimark:headerName': {
        '@value': header.key,
        '@type': 'xsd:string'
      },
      'sedimark:headerValue': {
        '@value': header.value,
        '@type': 'xsd:string'
      }
    })
  })

  const constraints = []

  // Add date constraints if present on the form
  if (offeringData.policy?.period?.startDate && offeringData.policy?.period?.endDate) {
    constraints.push(
      {
        'odrl:leftOperand': 'odrl:dateTime',
        'odrl:operator': { '@id': 'odrl:lteq' },
        'odrl:rightOperand': {
          '@value': offeringData.policy.period.startDate,
          '@type': 'xsd:dateTime'
        }
      },
      {
        'odrl:leftOperand': 'odrl:dateTime',
        'odrl:operator': { '@id': 'odrl:gteq' },
        'odrl:rightOperand': {
          '@value': offeringData.policy.period.endDate,
          '@type': 'xsd:dateTime'
        }
      }
    )
  }

  // Add required constant constraints
  constraints.push(
    {
      'odrl:leftOperand': 'sedi:claimMemberOf',
      'odrl:operator': { '@id': 'odrl:eq' },
      'odrl:rightOperand': 'SEDIMARK marketplace'
    },
    {
      'odrl:leftOperand': 'sedi:dataTokenOwnership',
      'odrl:operator': { '@id': 'odrl:eq' },
      'odrl:rightOperand': 'true'
    }
  )

  const body = {
    '@context': {
      '@vocab': 'https://w3id.org/sedimark/vocab/',
      sedimark: 'https://w3id.org/sedimark/ontology#',
      dct: 'http://purl.org/dc/terms/',
      odrl: 'http://www.w3.org/ns/odrl/2/',
      owl: 'http://www.w3.org/2002/07/owl#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      xml: 'http://www.w3.org/XML/1998/namespace',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      dcat: 'http://www.w3.org/ns/dcat#',
      schema: 'https://schema.org/'
    },
    '@id': 'https://uc.sedimark.eu/offerings/dummy-offering-id', // Overwritten by OM
    '@type': 'sedimark:Offering',
    'sedimark:isListedBy': {
      '@id': 'https://uc.sedimark.eu/offerings',
      '@type': 'sedimark:Self-Listing',
      'sedimark:belongsTo': {
        '@id': 'https://uc.sedimark.eu/participant-URI',
        '@type': 'sedimark:Participant',
        'schema:alternateName': {
          '@value': identity.data.vc.credentialSubject['schema:alternateName'], // DLT/Profile webserver? Managed by Offering Mangarer? --> Profile
          '@type': 'xsd:string'
        },
        'schema:accountId': {
          '@value': identity.data.sub, // ?? DID --> DLT
          '@type': 'xsd:string'
        }
      }
    },
    'sedimark:hasOfferingContract': {
      '@id': 'https://uc.sedimark.eu/offerings/dummy-offering-id/offeringContract/dummy-offeringContract-id', // Overwritten by OM
      '@type': 'sedimark:OfferingContract',
      'odrl:profile': 'https://sedimark.eu/odrl/sedi-profile', // Overwritten by OM
      'odrl:uid': 'https://uc.sedimark.eu/offerings/dummy-offering-id/offeringContract/dummy-offeringContract-id',
      'odrl:permission': [{
        'odrl:target': 'https://uc.sedimark.eu/offerings/dummy-offering-id',
        'odrl:assigner': 'did:iota:lnk:0xf053682e4724ba221e2f49dd0adabba135cd4ccb08d492440e163482064b617a',
        'odrl:action': 'odrl:use',
        'odrl:constraint': constraints,
        'odrl:duty': [ // Whole OBJ is constant
          {
            'odrl:action': [
              {
                'odrl:action': 'sedi:purchaseDataToken',
                'odrl:refinement': [
                  {
                    'odrl:leftOperand': 'odrl:payAmount',
                    'odrl:operator': {
                      '@id': 'odrl:eq'
                    },
                    'odrl:rightOperand': { '@value': '1', '@type': 'xsd:decimal' },
                    'odrl:unit': 'sedi:nativeToken'
                  }
                ]
              }
            ],
            'odrl:constraint': [
              {
                'odrl:leftOperand': 'odrl:event',
                'odrl:operator': {
                  '@id': 'odrl:lt'
                },
                'odrl:rightOperand': 'sedi:dspContractAgreementFinalized'
              }
            ]
          }
        ]
      }],
      'odrl:prohibition': [],
      'odrl:obligation': []
    },
    'dct:issued': { // Literal by us?
      '@value': '2025-12-31T00:00:00Z',
      '@type': 'xsd:dateTime'
    },
    'dct:language': {
      '@value': 'English',
      '@type': 'xsd:string'
    },
    'dct:title': {
      '@value': offeringData.title, // title will be same as asset title if only 1 asset x offering
      '@type': 'xsd:string'
    },
    'dct:description': {
      '@value': offeringData.description,
      '@type': 'xsd:string'
    },
    'dct:publisher': {
      '@id': 'did:iota:lnk:0xf053682e4724ba221e2f49dd0adabba135cd4ccb08d492440e163482064b617a'
    },
    'dct:creator': {
      '@value': offeringData.creator, // New field? Optional, as Profile can be a Company.
      '@type': 'xsd:string'
    },
    'dcat:themeTaxonomy': {
      '@id': 'https://w3id.org/sedimark/vocab/sdm'
    },
    'dct:license': {
      '@value': offeringData.terms_and_condition,
      '@type': 'xsd:string'
    },
    'sedimark:hasAsset': [{
      '@id': 'https://uc.sedimark.eu/offerings/dummy-offering-id/assets/dummy-asset-id', // Overwritten by OW
      '@type': 'sedimark:Asset',
      'dct:title': {
        '@value': offeringData.title, // Our title field
        '@type': 'xsd:string'
      },
      'sedimark:offeredBy': {
        '@id': 'https://uc.sedimark.eu/offerings/dummy-offering-id'
      },
      'dct:description': {
        '@value': offeringData.description, // Our descr field
        '@type': 'xsd:string'
      },
      'dct:issued': {
        '@value': '2025-12-31T00:00:00Z', // ???
        '@type': 'xsd:dateTime'
      },
      'dct:creator': {
        '@value': offeringData.creator, // New field? or setted up by Query the DLT Altername?
        '@type': 'xsd:string'
      },
      'dcat:theme': {
        '@id': 'https://w3id.org/sedimark/vocab/sdm/entity/vehicle'
      },
      'dcat:keyword': keywordArrayFormatted,
      'dct:spatial': {
        '@id': 'http://www.wikidata.org/entity/Q12233',
        '@type': 'dct:Location'
      },
      'sedimark:isProvidedBy': {
        '@id': 'https://uc.sedimark.eu/offerings/dummy-offering-id/assetProvision/dummy-assetProvision-id',
        '@type': 'sedimark:AssetProvision',
        'dct:title': {
          '@value': offeringData.title,
          '@type': 'xsd:string'
        },
        'dct:format': {
          '@id': 'HttpData'
        },
        'dct:description': {
          '@value': offeringData.description,
          '@type': 'xsd:string'
        },
        'dct:issued': {
          '@value': '2025-12-31T00:00:00Z', // ???
          '@type': 'xsd:dateTime'
        },
        'dcat:accessURL': {
          '@id': offeringData.url // Access Type
        },
        'sedimark:headers': headersArrayFormatted// Filled by US, sent empy in case not in form
      }
    }
    ]
  }
  return body
}

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

/**
 * Fetch call to Create an offering.
 * @async
 * @param {json} offeringBody - Json structure that represents the offering to create
 * @returns Json response from offering Manager with the created Offering if success.
 */
export async function createOffering (offeringData) {
  const url = `${settings.offeringManagerUrl}/offerings`
  // Added identity get here, as async + if fails, return error and stop advancing.
  let identity
  try {
    identity = await getIdentity()
  } catch (error) {
    console.log('Error fetching identity in createOffering!')
    console.log(error)
    return { error: 'Failed to get identity', details: error }
  }

  const bodyCreateOffering = getCreateOfferingBody(offeringData, identity)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyCreateOffering)
  }

  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    console.log('Error on createOffering!')
    console.log(error)
    return { error }
  }
}
 /*
 * Multiple fetch call to obtain a set of Offerings, while maintaining a "pagination" structure.
 * Will simulate the pagination on their side, but it is done here!
 * --------- DEPRECATED -----------
 * Offering Manager still has the endpoint to work like this function, so this is commented for preserving.
 * @async
 * @param {Array} offeringIds - Array of STRINGS to fetch.
 * @param {string} currentPage - Used for pagination.
 * @returns An Array of JSON obj representing the Offerings.
 */
// export async function fetchOfferingsCustom (offeringIds, currentPage) {
//   // Pagination custom
//   try {
//     const pageSize = parseInt(settings.offeringsPageSize)
//     const start = (currentPage - 1) * pageSize
//     const end = start + pageSize
//     const paginatedIds = offeringIds.slice(start, end)
//     const data = await Promise.all(
//       paginatedIds.map((id) =>
//         fetchOffering(id)
//       )
//     )
//     return data
//   } catch (error) {
//     // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
//     console.log('Error on fetchOfferingsCustom!')
//     console.log(error)
//     return { error }
//   }
// }
