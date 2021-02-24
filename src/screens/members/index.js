import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Members from './members'
import NewMember from './new-member'
import Member from './member'

function MembersRoutes() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <Members />
            </Route>
            <Route path={`${path}/new`}>
                <NewMember />
            </Route>
            <Route path={`${path}/:memberId`}>
                <Member />
            </Route>
        </Switch>
    )
}

export default MembersRoutes
