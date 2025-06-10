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
  let offeringType = 'CONSUMER'
  if (!showConsumed) {
    offeringType = 'PROVIDER'
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
      operandRight: offeringType
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

function getTransferPushBody (connectorId, counterPartyAddress, contractId, dataDestination) {
  const body = {
    '@context': {
      '@vocab': 'https://w3id.org/edc/v0.0.1/ns/'
    },
    '@type': 'TransferRequestDto',
    connectorId,
    counterPartyAddress,
    contractId,
    protocol: 'dataspace-protocol-http',
    transferType: 'HttpData-PUSH',
    dataDestination: {
      type: 'HttpData',
      baseUrl: dataDestination
    }
  }
  return body
}
/**
 * Fetch call to obtain a set of contracts.
 * @async
 * @param {string} contractAgreementIdFilter - Value expected to filter by Contract ID.
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
 * Fetch call to obtain a set of negotiations. Filters by default the completed ones.
 * @async
 * @param {string} currentPage - Used for pagination.
 * @param {boolean} showConsumed - Used for filtering by negotiations that are "type" consuming.
 * @returns An Array of JSON obj representing the Negotiations.
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

/**
 * Post call to do a transfer PUSH of data to an external connector
 * @async
 * @param {string} connectorId - Connector ID that has the contract.
 * @param {string} counterPartyAddress - The dataspace protocol URL of the provider connector, usually in the form of <base_url>/protocol or <base_url>/api/dsp.
 * @param {string} contractId - Specific contract to get the artifact.
 * @param {string} dataDestination - URL destination where the artifact will be sent.
 * @returns JSON object with some relevant info, not used on the frontend, expected to be a 200.
 */
export async function transferPush (connectorId, counterPartyAddress, contractId, dataDestination) {
  const url = `${settings.connectorUrl}/management/v3/transferprocesses`
  const bodyTransferPush = getTransferPushBody(connectorId, counterPartyAddress, contractId, dataDestination)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyTransferPush)
  }
  console.log(options)
  try {
    const data = await fetchData(url, options).then(response => response.json())
    return data
  } catch (error) {
    // Will be 2 printed errors as there is a console.log on the fetchData helper, but as is server side can help us id the error.
    console.log('Error on transferPush!')
    console.log(error)
    return { error }
  }
}
