import '@/styles/globals.css'

export const metadata = {
  title: "UniCon",
  description: "Video Conferencing Solution for everyone!"
}

import Provider from '@/components/Provider'
import Nav from '@/components/Nav'

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav></Nav>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout