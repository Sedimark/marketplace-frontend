import { handleApiRequest } from '@/utils/helpers/handleApiRequest'
import { transferPush } from '@/utils/connector'
import { NextResponse } from 'next/server'

export async function POST (request) {
  return handleApiRequest(async () => {
    const body = await request.json()
    const response = await transferPush(body.connectorId, body.counterPartyAddress, body.contractId, body.dataDestination)
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }
    return NextResponse.json(response)
  }, 'Connector Push Data')
}
