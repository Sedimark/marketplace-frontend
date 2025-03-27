export default function formatError (error) {
  console.log(error)
  // Handle HTTP errors (4xx, 5xx)
  if (error instanceof Response) {
    return {
      message: `HTTP error! Status: ${error.status}`,
      code: `HTTP_${error.status}`,
      details: { status: error.statusText }
    }
  }
  // Handle network errors
  if (error instanceof TypeError && error.message.includes('NetworkError')) {
    return {
      message: 'Network error. Please check your internet connection.',
      code: 'NETWORK_ERROR',
      details: error.message,
      stack: error.stack
    }
  }

  if (error instanceof TypeError && error.message.includes('Failed to parse URL')) {
    return {
      message: 'URL defined to fetch failed.',
      code: 'URL_NOT_VALID',
      details: error.message,
      stack: error.stack
    }
  }
  // Same for other errors (parsing, ...)
  // Fallback for unknown errors
  return {
    message: 'An unexpected error occurred.',
    code: 'UNKNOWN_ERROR',
    details: error.message,
    stack: error.stack
  }
}
