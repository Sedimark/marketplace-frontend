import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

function getCreateOfferingBody (offeringData) {
  console.log('--------------OF DATA-------------')
  console.log(offeringData)
  console.log('------------OF DATA END-----------')
  const keywordArrayFormatted = []
  offeringData.keywords.forEach(keyword => {
    keywordArrayFormatted.push({ '@value': keyword, '@type': 'rdfs:Literal' })
  })
  const body = {
    '@context': {
      '@vocab': 'https://w3id.org/sedimark/ontology#',
      sedi: 'https://w3id.org/sedimark/ontology#',
      dct: 'http://purl.org/dc/terms/',
      odrl: 'http://www.w3.org/ns/odrl/2/',
      owl: 'http://www.w3.org/2002/07/owl#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      xml: 'http://www.w3.org/XML/1998/namespace',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      dcat: 'http://www.w3.org/ns/dcat#'
    },
    '@type': 'sedi:Offering',
    'sedi:isListedBy': { '@id': 'https://uc.sedimark.eu/offerings' }, // connector?
    'sedi:hasOfferingContract': { // ???
      '@id': '30a032c2-ff2d-49ac-9ab0-a04cbb586b0f',
      '@type': 'sedi:OfferingContract',
      'odrl:permission': [],
      'odrl:prohibition': [],
      'odrl:obligation': []
    },
    'dct:issued': { '@value': '2024-01-02', '@type': 'rdfs:Literal' }, // Literal by us?
    'dct:language': { '@value': 'English', '@type': 'rdfs:Literal' },
    'dct:title': { '@value': offeringData.title, '@type': 'rdfs:Literal' }, // title will be same as asset title if only 1 asset x offering
    'dct:publisher': { '@id': 'https://uc.sedimark.eu/' }, // DID ?
    'dct:creator': { '@id': 'https://uc.sedimark.eu/' }, // DID ?
    'dcat:themeTaxonomy': { '@id': 'https://w3id.org/sedimark/vocab/sdm' },
    'dct:license': { // seems its our "License" + "Terms" concated
      '@value': offeringData.terms_and_conditions,
      '@type': 'rdfs:Literal'
    },
    'sedi:hasAsset': [{
      // '@id': '387fe731-3ddf-4356-b59f-21202cb3a778',
      '@type': 'sedi:Asset',
      'dct:title': {
        '@value': offeringData.title, // Our title field
        '@type': 'rdfs:Literal'
      },
      'dct:description': { '@value': offeringData.description, '@type': 'rdfs:Literal' }, // our description field
      'dct:issued': { '@value': '2024-01-02', '@type': 'rdfs:Literal' },
      'dct:creator': { '@id': 'https://uc.sedimark.eu/' },
      'dcat:theme': { '@id': 'https://w3id.org/sedimark/vocab/sdm/entity/vehicle' },
      'dcat:keyword': keywordArrayFormatted,
      'dct:spatial': { // Where is this obtainded?
        '@id': 'http://www.wikidata.org/entity/Q12233',
        '@type': 'dct:Location'
      },
      'sedi:isProvidedBy': { // This whole section... where is obtained?
        '@id': 'https://uc.sedimark.eu/v3/assets/387fe731-3ddf-4356-b59f-21202c23a778',
        '@type': 'sedi:AssetProvision',
        'dct:title': { '@value': offeringData.title, '@type': 'rdfs:Literal' },
        'dct:format': { '@id': 'HttpData' },
        'dct:description': {
          '@value': offeringData.description,
          '@type': 'rdfs:Literal'
        },
        'dct:issued': {
          '@value': '2024-01-02', // Again, literal by us? or obtained from somewhere??
          '@type': 'rdfs:Literal'
        },
        'dcat:accessURL': { '@id': 'http://provider-connector-data-endpoint' } // Access type field?
      }
    }]

  }
  return body
}

/**
 * Fetch call to obtain ALL the IDs stored on the .
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
    return data
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
  const url = `${offeringId}`
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
  const url = `${offeringId}`
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
    const pageSize = 5
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
 * Fetch call to Create an offering.
 * @async
 * @param {json} offeringBody - Json structure that represents the offering to create
 * @returns Json response from offering Manager with the created Offering if success.
 */
export async function createOffering (offeringData) {
  const url = `${settings.offeringManagerUrl}/offerings`
  const bodyCreateOffering = getCreateOfferingBody(offeringData)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyCreateOffering)
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
