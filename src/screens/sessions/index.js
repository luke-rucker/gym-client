import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

function SessionsRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <h1>Sessions</h1>
      </Route>
    </Switch>
  )
}

export default SessionsRoutes
