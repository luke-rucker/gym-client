import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { AuthProvider } from './context/auth-context'
import { AxiosProvider } from './context/axios-context'
import { UserProvider } from './context/user-context'

function AppProviders({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: function (failureCount, error) {
          if (error?.response?.status === 404) return false
          else if (failureCount < 2) return true
          else return false
        },
      },
    },
  })

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AxiosProvider>
            <UserProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </UserProvider>
          </AxiosProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  )
}

export default AppProviders
