import React, { lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth } from './context/auth-context'
import { useUser } from './context/user-context'
import { FullPageSpinner } from './components'

import AppShell from './app-shell'

import Landing from './screens/landing'
import Login from './screens/login'
import FourOFour from './screens/four-o-four'

const Dashboard = lazy(() => import('./screens/dashboard'))
const Members = lazy(() => import('./screens/members'))
const Sessions = lazy(() => import('./screens/sessions'))
const Admin = lazy(() => import('./screens/admin'))

function AuthenticatedRoute({ children, ...rest }) {
    const auth = useAuth()

    return (
        <Route
            {...rest}
            render={() =>
                auth.isAuthenticated() ? (
                    <AppShell>{children}</AppShell>
                ) : (
                    <Redirect to="/login" />
                )
            }
        ></Route>
    )
}

function AdminRoute({ children, ...rest }) {
    const auth = useAuth()
    const user = useUser()

    return (
        <Route
            {...rest}
            render={() =>
                auth.isAuthenticated() && user.isAdmin() ? (
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
                <AuthenticatedRoute path="/sessions">
                    <Sessions />
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
