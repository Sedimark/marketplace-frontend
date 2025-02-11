const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  output: 'standalone',
  env: {
    BATCH_SIZE: process.env.BATCH_SIZE ?? '40',
    CONTRACTS_PAGE_SIZE: process.env.CONTRACTS_PAGE_SIZE ?? '5'
  },
  async headers () {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  },
  // TODO: remove when integrating backend component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
module.exports = nextConfig
