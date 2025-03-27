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
    // As we already print on catch where it is, its commented, but in case of deep search for an error, left it here.
    // console.log(error)
    throw formatError(error)
  }
}
