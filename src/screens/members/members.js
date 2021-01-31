import React, { useState } from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { Typography, Fab, Snackbar } from '@material-ui/core'
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
    const queryClient = useQueryClient()

    const membersQuery = useQuery('members', () =>
        authAxios.get('/members').then(response => response.data)
    )

    const newMemberMutation = useMutation(
        newMember => authAxios.post('/members', newMember),
        {
            onSuccess: () => queryClient.invalidateQueries('members'),
            onSettled: () => {
                setDialogOpen(false)
                setAlertOpen(true)
            },
        }
    )

    const [dialogOpen, setDialogOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)

    function handleAlertClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setAlertOpen(false)
    }

    if (membersQuery.isLoading || newMemberMutation.isLoading) {
        return <FullPageSpinner />
    }

    return (
        <>
            <Typography variant="h4" className={classes.header}>
                Members
            </Typography>
            {membersQuery.error ? (
                <Alert severity="error" className={classes.alert}>
                    Could not load members.
                </Alert>
            ) : (
                <MembersTable rows={membersQuery.data} />
            )}
            <NewMemberDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                mutation={newMemberMutation}
            />
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleAlertClose}
            >
                {newMemberMutation.isError ? (
                    <Alert onClose={handleAlertClose} severity="error">
                        {newMemberMutation.error.response.data.message ||
                            'Could not create new member.'}
                    </Alert>
                ) : (
                    <Alert onClose={handleAlertClose} severity="success">
                        New Member created.
                    </Alert>
                )}
            </Snackbar>
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
