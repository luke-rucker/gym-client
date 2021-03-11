import React from 'react'
import { Container } from 'semantic-ui-react'
import { AppBar } from './components'

function AppShell({ children }) {
  return (
    <>
      <AppBar />
      <main style={{ marginTop: '6em', paddingBottom: '2em' }}>
        <Container>{children}</Container>
      </main>
    </>
  )
}

export default AppShell
