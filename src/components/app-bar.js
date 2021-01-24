import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    AppBar as MuiAppBar,
    Button,
    Toolbar,
    Typography,
} from '@material-ui/core'
import { useAuth } from '../context/auth-context'

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
}))

function AppBar() {
    const classes = useStyles()
    const { logout } = useAuth()

    return (
        <MuiAppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h5" className={classes.title}>
                    Jacobs University Gym
                </Typography>
                <Button variant="contained" color="primary" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar
