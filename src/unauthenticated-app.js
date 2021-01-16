import { Switch, Route } from 'react-router-dom'

import Landing from './pages/landing'
import Login from './pages/login'
import FourOFour from './pages/four-o-four'

function UnauthenticatedApp() {
    return (
        <Switch>
            <Route exact path="/">
                <Landing />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="*">
                <FourOFour />
            </Route>
        </Switch>
    )
}

export default UnauthenticatedApp
