import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from './context/auth-context'
import FullPageSpinner from './components/full-page-spinner'

import Landing from './pages/landing'
import SignIn from './pages/sign-in'
import FourOFour from './pages/four-o-four'

const Dashboard = lazy(() => import('./pages/dashboard'))
const Admin = lazy(() => import('./pages/admin'))

function AuthenticatedRoute({ children, ...rest }) {
    const { isAuthenticated } = useAuth()
    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated() ? { children } : <Redirect to="/sign-in" />
            }
        ></Route>
    )
}

function AdminRoute({ children, ...rest }) {
    const { isAuthenticated, isAdmin } = useAuth()
    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated() && isAdmin() ? (
                    { children }
                ) : (
                    <Redirect to="/dashboard" />
                )
            }
        ></Route>
    )
}

function App() {
    return (
        <Suspense fallback={<FullPageSpinner />}>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route path="/sign-in">
                    <SignIn />
                </Route>
                <AuthenticatedRoute path="/dashboard">
                    <Dashboard />
                </AuthenticatedRoute>
                <AdminRoute path="/admin">
                    <Admin />
                </AdminRoute>
                <Route path="*">
                    <FourOFour />
                </Route>
            </Switch>
        </Suspense>
    )
}

export default App
