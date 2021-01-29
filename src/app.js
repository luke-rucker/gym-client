import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from './context/auth-context'
import FullPageSpinner from './components/full-page-spinner'
import AppShell from './app-shell'

import Landing from './pages/landing'
import Login from './pages/login'
import FourOFour from './pages/four-o-four'

const Dashboard = lazy(() => import('./pages/dashboard'))
const Members = lazy(() => import('./pages/members'))
const Admin = lazy(() => import('./pages/admin'))

function AuthenticatedRoute({ children, ...rest }) {
    const { isAuthenticated } = useAuth()

    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated() ? (
                    <AppShell>{children}</AppShell>
                ) : (
                    <Redirect to="/login" />
                )
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
                    <AppShell>{children}</AppShell>
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
                <Route path="/login">
                    <Login />
                </Route>
                <AuthenticatedRoute path="/dashboard">
                    <Dashboard />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/members">
                    <Members />
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
