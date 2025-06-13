export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get('target')
  const auth = searchParams.get('auth')

  if (!target || !auth) {
    return new Response(JSON.stringify({ error: 'Missing required query parameters.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const response = await fetch(target, {
      method: 'GET',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      }
    })

    const contentType = response.headers.get('content-type') || 'application/json'
    const data = await response.text()

    return new Response(data, {
      status: response.status,
      headers: { 'Content-Type': contentType }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Proxy fetch failed', detail: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
