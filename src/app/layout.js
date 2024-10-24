'use client'

import '../styles/globals.css'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/footer/Footer'
import { MetaMaskProvider } from '@metamask/sdk-react'

export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <title> Sedimark Marketplace </title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link
          rel='icon'
          href='/favicon.ico'
          sizes='32x32'
        />
      </head>
      <body>
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            dappMetadata: {
              name: 'SEDIMARK Marketplace',
              url: process.env.LOGOUT_REDIRECT_URL
            },
            checkInstallationImmediately: false
          }}
        >
          <NavBar />
          <div>
            {children}
          </div>
          <Footer />
        </MetaMaskProvider>
      </body>
    </html>
  )
}
