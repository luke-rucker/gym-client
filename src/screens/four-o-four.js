import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import AppShell from '../app-shell'
import { AppBar } from '../components'
import { useAuth } from '../context/auth-context'

const useStyles = makeStyles(theme => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    message: {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
}))

function FourOFour() {
    const classes = useStyles()
    const { isAuthenticated } = useAuth()

    const message = (
        <div className={classes.message}>
            <SentimentVeryDissatisfiedIcon style={{ fontSize: 80 }} />
            <Typography variant="h3">You look lost!</Typography>
        </div>
    )

    return (
        <>
            {isAuthenticated() ? (
                <AppShell>{message}</AppShell>
            ) : (
                <>
                    <AppBar />
                    <div className={classes.toolbar} />
                    {message}
                </>
            )}
        </>
    )
}

export default FourOFour
