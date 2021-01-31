import React from 'react'
import { useQuery } from 'react-query'
import { Redirect } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { FullPageSpinner, AppBar, Alert } from '../components'
import { useAuth } from '../context/auth-context'
import publicAxios from '../util/axios'

const useStyles = makeStyles(theme => ({
    alert: {
        marginTop: theme.spacing(2),
        maxWidth: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    content: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}))

function Landing() {
    const classes = useStyles()
    const { isAuthenticated } = useAuth()

    const { isLoading, error, data } = useQuery(
        'gymStatus',
        () => publicAxios.get('/gym/status').then(response => response.data),
        {
            retry: false,
        }
    )

    if (isLoading) {
        return <FullPageSpinner />
    }

    return (
        <>
            {isAuthenticated() && <Redirect to="/dashboard" />}
            <AppBar />
            <div className={classes.toolbar} />
            {error ? (
                <Alert severity="error" className={classes.alert}>
                    {error.response.data.message || 'Something went wrong!'}
                </Alert>
            ) : (
                <Container className={classes.content}>
                    <Typography variant="h1">
                        {data.currentCapacity}/{data.maxCapacity} People
                    </Typography>
                    <Typography variant="h2">Are in the Gym</Typography>
                </Container>
            )}
        </>
    )
}

export default Landing
