import settings from '@/utils/settings'

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
`

function getOfferingQueryFilter (query) {
  return `
    ?offering a sedi:Offering .
    ?offering sedi:hasAsset ?asset .
    ?offering dct:title ?title .
    ?offering dct:description ?description .
    ?offering dct:publisher ?publisher .
    ?offering dct:created ?created .
    FILTER(
      (contains(str(?title), "${query}") || contains(str(?description), "${query}"))
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
  const data = await fetch(url, options).then(response => response.json())
  return data
}

function getSparQLOfferingQueryString (query, currentPage, batchSize = settings.batchSize) {
  const offset = (currentPage - 1) * batchSize
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?created
    WHERE {
      ${getOfferingQueryFilter(query)}
    }
    ORDER BY ?created
    LIMIT ${batchSize}
    OFFSET ${offset}
  `
  return encodeURI(baseString)
}

export async function fetchOfferings (query, currentPage) {
  const sparQLQuery = getSparQLOfferingQueryString(query, currentPage)
  return fetchFromCatalogue(sparQLQuery)
}

function getSparQLOfferingsCountQueryString () {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT (COUNT(?offering) as ?count)
    WHERE {
      ?offering a sedi:Offering .
    }
  `
  return encodeURI(baseString)
}

export async function fetchOfferingsCount () {
  const sparQLQuery = getSparQLOfferingsCountQueryString()
  const data = await fetchFromCatalogue(sparQLQuery)
  return data.results.bindings[0].count.value
}

function getSparQLProvidersQueryString (query) {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?publisher
    WHERE {
      ?publisher a sedi:Participant .
      ${getOfferingQueryFilter(query)}
    }
    ORDER BY ?publisher
  `
  return encodeURI(baseString)
}

export async function fetchProviders (query) {
  const sparQLQuery = getSparQLProvidersQueryString(query)
  const data = await fetchFromCatalogue(sparQLQuery)
  const providers = data.results.bindings.map(binding => binding.publisher.value)
  return providers
}

function getSparQLParticipantsCountQueryString () {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT (COUNT(?participant) as ?count)
    WHERE {
      ?participant a sedi:Participant .
    }
  `
  return encodeURI(baseString)
}

export async function fetchParticipantsCount () {
  const sparQLQuery = getSparQLParticipantsCountQueryString()
  const data = await fetchFromCatalogue(sparQLQuery)
  return data.results.bindings[0].count.value
}

function getSparQLKeywordsQueryString (query) {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?keyword
    WHERE {
      ?asset a vocab:DataAsset .
      ?asset dcat:keyword ?keyword .
      ${getOfferingQueryFilter(query)}
    }
    ORDER BY ?keyword
  `
  return encodeURI(baseString)
}

export async function fetchKeywords (query) {
  const sparQLQuery = getSparQLKeywordsQueryString(query)
  const data = await fetchFromCatalogue(sparQLQuery)
  const keywords = data.results.bindings.map(binding => binding.keyword.value)
  return keywords
}

export async function fetchRecommendedOfferings (offeringIds) {
  const idsString = offeringIds.map(id => `<${id}>`).join(', ')
  const sparQLQuery = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?created
    WHERE {
      ?offering a sedi:Offering .
      ?offering sedi:hasAsset ?asset .
      ?offering dct:title ?title .
      ?offering dct:description ?description .
      ?offering dct:publisher ?publisher .
      ?offering dct:created ?created .
      FILTER(?offering IN (${idsString}))
    }
  `
  return fetchFromCatalogue(sparQLQuery)
}

export async function fetchOfferingDetails (offeringId) {
  const sparQLQuery = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?created ?keywords
    WHERE {
      ?offering a sedi:Offering .
      ?offering sedi:hasAsset ?asset .
      ?offering dct:title ?title .
      ?offering dct:description ?description .
      ?offering dct:publisher ?publisher .
      ?offering dct:created ?created .
      FILTER(?offering IN (<${offeringId}>))
      {
         SELECT ?asset (group_concat(?kw; separator="${settings.keywordsSeparator}") as ?keywords)
         WHERE {
           ?asset dcat:keyword ?kw
        }
        GROUP BY ?asset
      }
    }
  `
  return fetchFromCatalogue(sparQLQuery)
}
