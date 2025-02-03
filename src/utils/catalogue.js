import settings from '@/utils/settings'

export function getSparQLQueryString (query, currentPage, batchSize) {
  const offset = (currentPage - 1) * batchSize
  const baseString = `
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX http: <http://www.w3.org/2011/http#>
    prefix sedi: <https://w3id.org/sedimark/ontology#>
    prefix owl: <http://www.w3.org/2002/07/owl#>
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    prefix xml: <http://www.w3.org/XML/1998/namespace>
    prefix xsd: <http://www.w3.org/2001/XMLSchema#>
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    prefix dcat: <http://www.w3.org/ns/dcat#>
    prefix dct: <http://purl.org/dc/terms/>
    prefix dce: <http://purl.org/dc/elements/1.1/>
    prefix vocab: <https://w3id.org/sedimark/vocab#>

    SELECT DISTINCT ?offering ?asset ?title ?description ?publisher ?created ?dataset
    WHERE {
      ?offering a sedi:Offering .
      ?offering sedi:hasAsset ?asset .
      ?asset dce:title ?title .
      ?asset dce:description ?description .
      ?offering dct:publisher ?publisher .
      ?offering dct:created ?created .
      ?offering dcat:dataset ?dataset .
      FILTER(contains(str(?title), "${query}") || contains(str(?description), "${query}"))
    }
    ORDER BY ?created
    LIMIT ${batchSize}
    OFFSET ${offset}
  `
  return encodeURI(baseString)
}

export default async function fetchCatalogueData (query, currentPage) {
  const sparQLQuery = getSparQLQueryString(query, currentPage, settings.batchSize)
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
