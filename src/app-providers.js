import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthProvider } from './context/auth-context'
import { FetchProvider } from './context/fetch-context'

function AppProviders({ children }) {
    return (
        <Router>
            <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>
                    <FetchProvider>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </FetchProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    )
}

export default AppProviders
