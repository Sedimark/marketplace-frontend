import '../styles/globals.css'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/footer/Footer'
import { RegistrationProvider } from '@/context/RegistrationContext'

export default async function RootLayout ({ children }) {
  return (
    <html className='h-full'>
      <head>
        <title> Sedimark Marketplace </title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link
          rel='icon'
          href='/favicon.ico'
          sizes='32x32'
        />
      </head>
      <body className='flex flex-col min-h-full justify-between'>
        <RegistrationProvider>
          <NavBar />
          {children}
        </RegistrationProvider>
        <Footer />
      </body>
    </html>
  )
}
