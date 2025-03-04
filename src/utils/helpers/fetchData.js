import formatError from '@/utils/errors/errorFormatter'

export async function fetchData (url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      // Attempt to parse the error response
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: `HTTP error! Status: ${response.status}` }
      }
      throw formatError({ ...errorData, status: response.status })
    }
    return response
  } catch (error) {
    // Probably network or CORS errors
    // Printing on server-side
    console.log(error)
    throw formatError(error)
  }
}
