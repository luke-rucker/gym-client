import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { CssBaseline } from '@material-ui/core'

import { AuthProvider } from './context/auth-context'
import { FetchProvider } from './context/fetch-context'

function AppProviders({ children }) {
    return (
        <Router>
            <QueryClientProvider client={new QueryClient()}>
                <AuthProvider>
                    <FetchProvider>
                        <CssBaseline />
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </FetchProvider>
                </AuthProvider>
            </QueryClientProvider>
        </Router>
    )
}

export default AppProviders
