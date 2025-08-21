import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

const prefixes = `
    PREFIX http: <http://www.w3.org/2011/http#>
    PREFIX sedi: <https://w3id.org/sedimark/ontology#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dcat: <http://www.w3.org/ns/dcat#>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX vocab: <https://w3id.org/sedimark/vocab#>
    PREFIX schema: <https://schema.org/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
`

const offeringsData = `
    ?offering a sedi:Offering .
    ?offering sedi:hasAsset ?asset .
    ?offering dct:title ?title .
    OPTIONAL { ?offering dct:description ?description . }
    ?offering sedi:isListedBy ?listing .
    ?listing sedi:belongsTo ?participant .
    ?participant schema:accountId ?publisher .
    ?participant schema:alternateName ?alternateName .
    OPTIONAL { ?asset dct:issued ?issued . }
`

function getOfferingQueryFilter (query) {
  const lquery = query.toLowerCase()
  return `
    ${offeringsData}
    FILTER(
      CONTAINS(LCASE(?title), "${lquery}") ||
      CONTAINS(LCASE(?description), "${lquery}")
    )
  `
}

async function fetchFromCatalogue (sparQLQuery) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
    body: `query=${sparQLQuery}`
  }
  const url = `${settings.catalogueUrl}/catalogue/sparql`
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data.results.bindings
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchFromCatalogue!')
    console.log(error)
    return { error }
  }
}

function getSparQLOfferingQueryString (query, keywords, providers, currentPage, batchSize = settings.batchSize) {
  const offset = (currentPage - 1) * batchSize
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?alternateName ?issued
    WHERE { GRAPH ?g {
      ${getOfferingQueryFilter(query)}
      ${checkKeywordsToFilter(keywords)}
      ${checkProvidersToFilter(providers)}
    }}
    ORDER BY ?issued
    LIMIT ${batchSize}
    OFFSET ${offset}
  `
  return encodeURI(baseString)
}

function checkKeywordsToFilter (keywords) {
  let getKeywordFilter = ''
  if (keywords !== '' && keywords !== undefined) {
    getKeywordFilter = `
      ?asset dcat:keyword ?kw
      FILTER(?kw IN (${getSparQLKeywordFilter(keywords)}))`
  }
  return getKeywordFilter
}

function checkProvidersToFilter (providers) {
  let getProviderFilter = ''
  if (providers !== '' && providers !== undefined) {
    getProviderFilter = `
    FILTER(str(?publisher) IN (${getSparQLProviderFilter(providers)}))`
  }
  return getProviderFilter
}

function getSparQLKeywordFilter (keywords) {
  if (Array.isArray(keywords)) {
    const arrayLanguageTagged = []
    keywords.forEach(element => {
      // arrayLanguageTagged.push('"' + element + '"' + '@en')
      arrayLanguageTagged.push('"' + element + '"')
    })
    return arrayLanguageTagged
  } else {
    // return '"' + keywords + '"' + '@en'
    return '"' + keywords + '"'
  }
}

function getSparQLProviderFilter (providers) {
  if (Array.isArray(providers)) {
    const arrayFormatted = []
    providers.forEach(element => {
      arrayFormatted.push('"' + element + '"')
    })
    return arrayFormatted
  } else {
    return '"' + providers + '"'
  }
}

export async function fetchOfferings (query, keywords, providers, currentPage) {
  const sparQLQuery = getSparQLOfferingQueryString(query, keywords, providers, currentPage)
  return fetchFromCatalogue(sparQLQuery)
}

function getSparQLOfferingsCountQueryString (query = '', keywords, providers) {
  const baseString = `
  ${prefixes}
  SELECT DISTINCT (COUNT(?offering) as ?count)
  WHERE { GRAPH ?g {
    ${getOfferingQueryFilter(query)}
    ${checkKeywordsToFilter(keywords)}
    ${checkProvidersToFilter(providers)}
  }}
  `
  return encodeURI(baseString)
}

export async function fetchOfferingsCount (query, keywords, providers) {
  const sparQLQuery = getSparQLOfferingsCountQueryString(query, keywords, providers)
  const data = await fetchFromCatalogue(sparQLQuery)
  return data[0]?.count.value
}

function getSparQLProvidersQueryString (query) {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?publisher ?alternateName
    WHERE { GRAPH ?g {
      ${getOfferingQueryFilter(query)}
    }}
    ORDER BY ?publisher
  `
  return encodeURI(baseString)
}

export async function fetchProviders (query) {
  const sparQLQuery = getSparQLProvidersQueryString(query)
  const data = await fetchFromCatalogue(sparQLQuery)
  if (!data.error) {
    const providers = data.map(prov => prov.alternateName.value)
    return providers
  }
  return data
}

function getSparQLParticipantsCountQueryString () {
  const baseString = `
    ${prefixes}

    SELECT (COUNT(DISTINCT ?participant) as ?count)
    WHERE { GRAPH ?g {
      ?participant a sedi:Participant .
    }}
  `
  return encodeURI(baseString)
}

export async function fetchParticipantsCount () {
  const sparQLQuery = getSparQLParticipantsCountQueryString()
  const data = await fetchFromCatalogue(sparQLQuery)
  return data[0]?.count.value
}

function getSparQLKeywordsQueryString (query) {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?keyword
    WHERE { GRAPH ?g {
      ${getOfferingQueryFilter(query)}
      ?asset dcat:keyword ?keyword .
    }}
    ORDER BY ?keyword
  `
  return encodeURI(baseString)
}

export async function fetchKeywords (query) {
  const sparQLQuery = getSparQLKeywordsQueryString(query)
  const data = await fetchFromCatalogue(sparQLQuery)
  if (!data.error) {
    const keywords = data.map(binding => binding.keyword.value)
    return keywords
  }
  return data
}

export async function fetchRecommendedOfferings (offeringIds) {
  const idsString = offeringIds.map(id => `<${id}>`).join(', ')
  const sparQLQuery = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?issued ?license
    WHERE {
      ${offeringsData}
      FILTER(?offering IN (${idsString}))
    }
  `
  return fetchFromCatalogue(sparQLQuery)
}

export async function fetchOfferingDetails (offeringId) {
  const sparQLQuery = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?alternateName ?creator ?issued ?license (group_concat(?kw; separator=";") as ?keywords)
    WHERE { GRAPH ?g {
      ${offeringsData}
      OPTIONAL { ?offering dct:license ?license . }
      OPTIONAL { ?offering dct:creator ?creator . }
      OPTIONAL { ?asset dcat:keyword ?kw }
      FILTER(?offering IN (<${offeringId}>))
    }}
    GROUP BY ?offering ?asset ?title ?description ?publisher ?alternateName ?creator ?issued ?license
  `
  const offering = await fetchFromCatalogue(sparQLQuery)
  return offering[0]
}
