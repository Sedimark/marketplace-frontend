import { createIdentity, getIdentity } from '@/utils/dlt'
import { NextResponse } from 'next/server'
import { handleApiRequest } from '@/utils/helpers/handleApiRequest'

export async function POST (request) {
  return handleApiRequest(async () => {
    const { username } = await request.json()

    if (!username) {
      return NextResponse.json(
        { error: { message: 'Username is required' } },
        { status: 400 }
      )
    }

    const response = await createIdentity(username)

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    return NextResponse.json(response)
  }, 'identity creation')
}

export async function GET () {
  return handleApiRequest(async () => {
    const response = await getIdentity()

    // If it's a 404 (no identity found), return it as a valid response with status 404
    if (response?.error?.code === 'HTTP_404') {
      return NextResponse.json(
        { error: { code: 'HTTP_404', message: 'No identity found, registration required.' } },
        { status: 404 }
      )
    }

    // If there's any other error, return it with status 500
    if (response?.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    // If successful, return the identity data
    return NextResponse.json(response)
  }, 'fetching identity')
}
