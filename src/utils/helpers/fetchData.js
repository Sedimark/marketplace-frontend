import formatError from '@/utils/errors/errorFormatter'

export async function fetchData (url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw response
    }
    return response
  } catch (error) {
    // Probably network or CORS errors
    // Printing on server-side
    console.log(error)
    throw formatError(error)
  }
}
