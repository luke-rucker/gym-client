import { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AuthContext } from './context/auth-context'

import Dashboard from './pages/dashboard'
import Admin from './pages/admin'
import FourOFour from './pages/four-o-four'

function AdminRoute({ children, ...rest }) {
    const auth = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={() =>
                auth.isAuthenticated() && auth.isAdmin() ? (
                    { children }
                ) : (
                    <Redirect to="/dashboard" />
                )
            }
        ></Route>
    )
}

function AuthenticatedApp() {
    return (
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <AdminRoute path="/admin">
                <Admin />
            </AdminRoute>
            <Route path="*">
                <FourOFour />
            </Route>
        </Switch>
    )
}

export default AuthenticatedApp
