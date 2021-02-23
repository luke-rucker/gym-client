import React from 'react'
import { AppBar } from './components'

function AppShell({ children }) {
    return (
        <>
            <AppBar />
            <main>{children}</main>
        </>
    )
}

export default AppShell
