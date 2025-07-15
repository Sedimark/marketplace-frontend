// Disabled! This proxy route is to handle the PULL data when creating a new tab to the user with the URL + Aut headers, as there is no other
// way as this one to open a new tab with Auth headers on it.
// BE AWARE!! THIS NEEDS A GOOD LOOK ON SECURITY REWORK! As they could try to access outside url while using the sedimark marketplace as origin!
//
// export async function GET (request) {
//   const { searchParams } = new URL(request.url)
//   const target = searchParams.get('target')
//   const auth = searchParams.get('auth')

//   if (!target || !auth) {
//     return new Response(JSON.stringify({ error: 'Missing required query parameters.' }), {
//       status: 400,
//       headers: { 'Content-Type': 'application/json' }
//     })
//   }

//   try {
//     const response = await fetch(target, {
//       method: 'GET',
//       headers: {
//         Authorization: auth,
//         'Content-Type': 'application/json'
//       }
//     })

//     const contentType = response.headers.get('content-type') || 'application/json'
//     const data = await response.text()

//     return new Response(data, {
//       status: response.status,
//       headers: { 'Content-Type': contentType }
//     })
//   } catch (err) {
//     return new Response(JSON.stringify({ error: 'Proxy fetch failed', detail: err.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     })
//   }
// }
