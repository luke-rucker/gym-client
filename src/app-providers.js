import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthProvider } from './context/auth-context'
import { FetchProvider } from './context/fetch-context'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: function (failureCount, error) {
                if (error.response.status === 404) return false
                else if (failureCount < 2) return true
                else return false
            },
        },
    },
})

function AppProviders({ children }) {
    return (
        <Router>
            <QueryClientProvider client={queryClient}>
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
