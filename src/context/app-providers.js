import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from 'react-router-dom'

import { AuthProvider } from './auth-context'
import { FetchProvider } from './fetch-context'

function AppProviders({ children }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Router>
                <AuthProvider>
                    <FetchProvider>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </FetchProvider>
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}

export default AppProviders
