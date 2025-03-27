import { createIdentity, getIdentity } from '@/utils/dlt'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
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
  } catch (error) {
    console.error('API error in identity creation:', error)
    return NextResponse.json(
      { error: { message: error.message || 'Unknown error occurred' } },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await getIdentity()
    
    // If it's a 404 (no identity found), return it as a valid response with status 404
    if (response?.error?.code === 'HTTP_404') {
      return NextResponse.json(
        { error: { code: 'HTTP_404', message: 'No identity found' } },
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
  } catch (error) {
    console.error('API error in fetching identity:', error)
    return NextResponse.json(
      { error: { message: error.message || 'Unknown error occurred' } },
      { status: 500 }
    )
  }
}
