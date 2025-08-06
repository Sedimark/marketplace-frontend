import { handleApiRequest } from '@/utils/helpers/handleApiRequest'
import { deleteOffering } from '@/utils/offeringManager'
import { NextResponse } from 'next/server'

export async function DELETE (request) {
  return handleApiRequest(async () => {
    const body = await request.json()
    const { offeringId } = body

    const response = await deleteOffering(offeringId)
    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }
    return NextResponse.json(response)
  }, 'Offering Manager Delete')
}
