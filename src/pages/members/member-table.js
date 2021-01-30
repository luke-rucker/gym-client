import React from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FullPageSpinner, Alert } from '../../components'
import { useFetch } from '../../context/fetch-context'

const useStyles = makeStyles(theme => ({
    alert: {
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

function MemberTablePage() {
    const classes = useStyles()
    const { authAxios } = useFetch()

    const { isLoading, error, data } = useQuery('members', () =>
        authAxios.get('/members').then(response => response.data)
    )

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (error) {
        return (
            <Alert severity="error" className={classes.alert}>
                Could not load members.
            </Alert>
        )
    }

    return <MemberTable members={data} />
}

const useTableStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    clickable: {
        cursor: 'pointer',
    },
}))

function MemberTable({ members }) {
    const classes = useTableStyles()
    const { path } = useRouteMatch()
    const history = useHistory()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="member-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Joined</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map(member => (
                        <TableRow
                            key={member.id}
                            className={classes.clickable}
                            onClick={() => history.push(`${path}/${member.id}`)}
                        >
                            <TableCell component="th" scope="row">
                                {`${member.firstName} ${member.lastName}`}
                            </TableCell>
                            <TableCell align="right">{member.email}</TableCell>
                            <TableCell align="right">
                                {new Date(member.createdAt).toDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MemberTablePage
