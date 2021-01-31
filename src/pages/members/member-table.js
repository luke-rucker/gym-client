import React, { useState } from 'react'
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
    TableFooter,
    TablePagination,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FullPageSpinner, Alert } from '../../components'
import { useFetch } from '../../context/fetch-context'

const useStyles = makeStyles(theme => ({
    alert: {
        width: 180,
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

    return <MemberTable rows={data} />
}

const useTableStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))

function MemberTable({ rows }) {
    const classes = useTableStyles()
    const { path } = useRouteMatch()
    const history = useHistory()

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    function handleChangePage(event, newPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="member table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Joined</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : rows
                    ).map(row => (
                        <TableRow
                            key={row.id}
                            className={classes.tableRow}
                            onClick={() => history.push(`${path}/${row.id}`)}
                        >
                            <TableCell component="th" scope="row">
                                {row.firstName}
                            </TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">
                                {new Date(row.createdAt).toDateString()}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[
                                5,
                                10,
                                25,
                                { label: 'All', value: -1 },
                            ]}
                            colSpan={4}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default MemberTablePage
