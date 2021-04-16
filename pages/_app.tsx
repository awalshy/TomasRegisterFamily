import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import './style.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#133c6d'
    },
    secondary: {
      main: '#F9A826'
    }
  }
})

function App ({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme} >
    <Component {...pageProps} />
  </ThemeProvider>
}

export default App