import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'

function App ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App