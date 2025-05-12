import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

function getContractsQueryBody (providerFilter = '', currentPage, batchSize = settings.batchSize) {
  const offset = (currentPage - 1) * batchSize
  let filterExp = []
  if (providerFilter !== '') {
    filterExp = [
      {
        operandLeft: 'providerId',
        operator: '=',
        operandRight: providerFilter
      }
    ]
  }
  const body = {
    '@context': { '@vocab': 'https://w3id.org/edc/v0.0.1/ns/' },
    '@type': 'QuerySpec',
    offset: parseInt(offset),
    limit: parseInt(batchSize),
    sortOrder: 'DESC',
    sortField: 'contractSigningDate',
    filterExpression: filterExp
  }
  return body
}
/**
 * Fetch call obtain a set of contracts. Batch defined by settings.
 * @async
 * @param {string} [providerFilter] - Can be used to filter by roviderId.
 * @param {number} currentPage - Used for pagination
 * @returns An Array of JSON obj representing the contracts
 */
export async function fetchContracts (providerFilter, currentPage) {
  const url = `${settings.connectorUrl}/management/v3/contractagreements/request`
  const bodyContract = getContractsQueryBody(providerFilter, currentPage)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyContract)
  }
  console.log(options)
  try {
    const data = await fetchData(url, options).then(response => response.json())
    console.log(data)
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchContracts!')
    console.log(error)
    return { error }
  }
}
