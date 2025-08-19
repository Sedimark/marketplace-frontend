import { handleApiRequest } from '@/utils/helpers/handleApiRequest'
import { submitUserData } from '@/utils/webserver'
import { NextResponse } from 'next/server'

export async function POST (request) {
  return handleApiRequest(async () => {
    const body = await request.json()
    const response = await submitUserData(body)
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }
    return NextResponse.json(response)
  }, 'Webserver Submit UserInfo')
}
