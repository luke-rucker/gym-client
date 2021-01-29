import React from 'react'
import { useRouteMatch, useParams, Switch, Route, Link } from 'react-router-dom'

function MemberTable() {
    const { url } = useRouteMatch()
}

function Member() {
    const { memberId } = useParams()
}

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
