import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { AuthProvider } from './context/auth-context'
import { FetchProvider } from './context/fetch-context'

function AppProviders({ children }) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Router>
                <AuthProvider>
                    <FetchProvider>
                        <CssBaseline />
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </FetchProvider>
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}

export default AppProviders
