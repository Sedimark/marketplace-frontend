import { NextResponse } from 'next/server'

/**
 * Handles API request with error handling
 * @param {Function} handler - Async function that handles the request logic
 * @param {string} operationName - Name of operation for error logging
 * @returns {Promise<NextResponse>} - Response with appropriate status code
 */
export async function handleApiRequest (handler, operationName) {
  try {
    return await handler()
  } catch (error) {
    console.error(`API error in ${operationName}:`, error)

    return NextResponse.json(
      { error: { message: error.message || 'Unknown error occurred' } },
      { status: 500 }
    )
  }
}
