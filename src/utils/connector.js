import settings from '@/utils/settings'
import { fetchData } from '@/utils/helpers/fetchData'

function getContractsQueryBody (contractAgreementIdFilter) {
  const body = {
    '@context': { '@vocab': 'https://w3id.org/edc/v0.0.1/ns/' },
    '@type': 'QuerySpec',
    filterExpression: [
      {
        operandLeft: 'id',
        operator: '=',
        operandRight: contractAgreementIdFilter
      }
    ]
  }
  return body
}

function getNegotiationsQueryBody (currentPage, batchSize = settings.batchSize) {
  const offset = (currentPage - 1) * batchSize
  const body = {
    '@context': { '@vocab': 'https://w3id.org/edc/v0.0.1/ns/' },
    '@type': 'QuerySpec',
    offset: parseInt(offset),
    limit: parseInt(batchSize),
    sortOrder: 'DESC',
    sortField: 'createdAt',
    filterExpression: [{
      operandLeft: 'state',
      operator: '=',
      operandRight: 1200
    }]
  }
  return body
}

function getTransferProcessQueryBody (contractAgreementIdFilter) {
  const body = {
    '@context': {
      '@vocab': 'https://w3id.org/edc/v0.0.1/ns/'
    },
    '@type': 'QuerySpec',
    offset: 0,
    // Hard limit, should we limit differently? For now, showing last 10
    limit: 10,
    sortOrder: 'DESC',
    sortField: 'stateTimestamp',
    filterExpression: [{
      operandLeft: 'contractId',
      operator: '=',
      operandRight: contractAgreementIdFilter
    }]
  }
  return body
}
/**
 * Fetch call to obtain a set of contracts.
 * @async
 * @param {string} contractAgreementIdFilter - Can be used to filter by Contract ID.
 * @returns An Array of JSON obj representing the contracts
 */
export async function fetchContracts (contractAgreementIdFilter) {
  const url = `${settings.connectorUrl}/management/v3/contractagreements/request`
  const bodyContract = getContractsQueryBody(contractAgreementIdFilter)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyContract)
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchContracts!')
    console.log(error)
    return { error }
  }
}
/**
 * WIP, will be used on the future. Probably used for individual contracts & whole overview page.
 * @async
 * @param {string} contractAgreementIdFilter - Can be used to filter by Contract ID.
 * @returns An Array of JSON obj representing the Transfer Process
 */
export async function fetchTransferProcess (contractAgreementIdFilter) {
  const url = `${settings.connectorUrl}/management/v3/transferprocesses/request`
  const bodyContract = getTransferProcessQueryBody(contractAgreementIdFilter)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyContract)
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchTransferProcess!')
    console.log(error)
    return { error }
  }
}
/**
 * Fetch call to obtain a set of negotiations. WIP to support filtering, order by...
 * @async
 * @param {string} currentPage - Used for pagination
 * @returns An Array of JSON obj representing the Negotiations
 */
export async function fetchNegotiations (currentPage) {
  const url = `${settings.connectorUrl}/management/v3/contractnegotiations/request`
  const bodyContract = getNegotiationsQueryBody(currentPage)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyContract)
  }
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on fetchNegotiations!')
    console.log(error)
    return { error }
  }
}
