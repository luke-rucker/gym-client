import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Typography, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import { FullPageSpinner, Alert } from '../../components'
import { useFetch } from '../../context/fetch-context'
import MembersTable from './member-table'
import NewMemberDialog from './new-member-dialog'

const useStyles = makeStyles(theme => ({
    alert: {
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        marginBottom: theme.spacing(2),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}))

function Members() {
    const classes = useStyles()
    const { authAxios } = useFetch()

    const [dialogOpen, setDialogOpen] = useState(false)

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

    return (
        <>
            <Typography variant="h4" className={classes.header}>
                Members
            </Typography>
            <MembersTable rows={data} />
            <NewMemberDialog open={dialogOpen} />
            <Fab
                color="primary"
                className={classes.fab}
                aria-label="new member"
                onClick={() => setDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default Members
