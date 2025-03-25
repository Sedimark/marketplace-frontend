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
    // As we already print on catch where it is, its commented, but in case of deep search for an error, left it here.
    // console.log(error)
    throw formatError(error)
  }
}
