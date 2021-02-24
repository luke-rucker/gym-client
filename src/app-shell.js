import React from 'react'
import { Container } from 'semantic-ui-react'
import { AppBar } from './components'

function AppShell({ children }) {
    return (
        <>
            <AppBar />
            <main>
                <Container>{children}</Container>
            </main>
        </>
    )
}

export default AppShell
