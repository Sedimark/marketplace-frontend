import { handleApiRequest } from '@/utils/helpers/handleApiRequest'
import { contractNegotiationFlow } from '@/utils/connector'
import { NextResponse } from 'next/server'

export async function POST (request) {
  return handleApiRequest(async () => {
    const body = await request.json()
    const response = await contractNegotiationFlow(body.datasetID, body.counterPartyAddress, body.alternateName)
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }
    return NextResponse.json(response)
  }, 'Connector ContractNegotiation')
}
