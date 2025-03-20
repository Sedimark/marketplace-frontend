import '../styles/globals.css'
import NavBar from '@/components/nav/NavBar'
import Footer from '@/components/footer/Footer'

export default async function RootLayout ({ children }) {
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
        <NavBar />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
