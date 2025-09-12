import { NextResponse } from 'next/server'
import { handleApiRequest } from '@/utils/helpers/handleApiRequest'
import { resolveDID } from '@/utils/dlt'

export async function POST (request) {
  return handleApiRequest(async () => {
    const { did } = await request.json()

    if (!did) {
      return NextResponse.json(
        { error: { message: 'DID not present in payload or malformed!' } },
        { status: 400 }
      )
    }

    const response = await resolveDID(did)

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    return NextResponse.json(response)
  }, 'DID resolver route')
}
