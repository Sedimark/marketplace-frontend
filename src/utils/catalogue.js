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

function getSparQLOfferingQueryString (query, currentPage, batchSize) {
  const offset = (currentPage - 1) * batchSize
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?created
    WHERE {
      ?offering a sedi:Offering .
      ?offering sedi:hasAsset ?asset .
      ?offering dct:title ?title .
      ?offering dct:description ?description .
      ?offering dct:publisher ?publisher .
      ?offering dct:created ?created .
      FILTER(
        (contains(str(?title), "${query}") || contains(str(?description), "${query}"))
      )
    }
    ORDER BY ?created
    LIMIT ${batchSize}
    OFFSET ${offset}
  `
  return encodeURI(baseString)
}

export default async function fetchOfferings (query, currentPage) {
  const sparQLQuery = getSparQLOfferingQueryString(query, currentPage, settings.batchSize)
  return fetchFromCatalogue(sparQLQuery)
}

function getSparQLProvidersQueryString () {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?participant
    WHERE {
      ?participant a sedi:Participant .
      ?offering a sedi:Offering .
      ?offering dct:publisher ?participant .
    }
    ORDER BY ?participant
  `
  return encodeURI(baseString)
}

export async function fetchProviders () {
  const sparQLQuery = getSparQLProvidersQueryString()
  return fetchFromCatalogue(sparQLQuery)
}

function getSparQLKeywordsQueryString () {
  const baseString = `
    ${prefixes}

    SELECT DISTINCT ?keyword
    WHERE {
      ?asset a vocab:DataAsset .
      ?asset dcat:keyword ?keyword .
    }
    ORDER BY ?keyword
  `
  return encodeURI(baseString)
}

export async function fetchKeywords () {
  const sparQLQuery = getSparQLKeywordsQueryString()
  return fetchFromCatalogue(sparQLQuery)
}
