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

function getNegotiationsQueryBody (currentPage, showConsumed, batchSize = settings.contractsPageSize) {
  const offset = (currentPage - 1) * batchSize
  let providerConditon = 'CONSUMER'
  if (!showConsumed) {
    providerConditon = 'PROVIDER'
  }

  // filterExpression here filters by an encoded code on state, where 1200 = "FINALIZED"
  // Be aware in the future, if calls fall when filtering, it may be because they expect a code, not a string
  // but this info is unknown to us, as it comes from the connector.
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
    },
    {
      operandLeft: 'type',
      operator: '=',
      operandRight: providerConditon
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
export async function fetchNegotiations (currentPage, showConsumed) {
  const url = `${settings.connectorUrl}/management/v3/contractnegotiations/request`
  const bodyContract = getNegotiationsQueryBody(currentPage, showConsumed)
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
