import React, { ReactNode } from 'react'
import Head from 'next/head'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'TOMAS' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" style={{flexGrow: 1}}>
          TOMAS
        </Typography>
        <Button variant="text" style={{ color: '#F9A826' }}
        >Nous Contacter</Button>
      </Toolbar>
    </AppBar>
    <main>
        {children}
    </main>
  </div>
)

export default Layout
