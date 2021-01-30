import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import MemberTable from './member-table'
import Member from './member'

function Members() {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path={path}>
                <MemberTable />
            </Route>
            <Route path={`${path}/:memberId`}>
                <Member />
            </Route>
        </Switch>
    )
}

export default Members
