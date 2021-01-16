import React, { lazy, Suspense, useContext } from 'react'
import { AuthContext } from './context/auth-context'
import FullPageSpinner from './components/full-page-spinner'

const AuthenticatedApp = lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'))

function App() {
    const authContext = useContext(AuthContext)

    return (
        <Suspense fallback={<FullPageSpinner />}>
            {authContext.isAuthenticated() ? (
                <AuthenticatedApp />
            ) : (
                <UnauthenticatedApp />
            )}
        </Suspense>
    )
}

export default App
