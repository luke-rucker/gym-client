import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    AppBar as MuiAppBar,
    Button,
    Toolbar,
    Typography,
} from '@material-ui/core'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import AvatarMenu from '../components/avatar-menu'
import { useAuth } from '../context/auth-context'

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    clickable: {
        cursor: 'pointer',
    },
    appBarIcon: {
        paddingRight: theme.spacing(1),
        fontSize: 30,
    },
    buffer: {
        flexGrow: 1,
    },
}))

function AppBar() {
    const classes = useStyles()
    const { isAuthenticated } = useAuth()
    const history = useHistory()

    return (
        <MuiAppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <FitnessCenterIcon
                    className={`${classes.appBarIcon} ${classes.clickable}`}
                    onClick={() =>
                        history.push(isAuthenticated() ? '/dashboard' : '/')
                    }
                />
                <Typography
                    variant="h4"
                    className={classes.clickable}
                    onClick={() =>
                        history.push(isAuthenticated() ? '/dashboard' : '/')
                    }
                >
                    Jacobs University Gym
                </Typography>
                <div className={classes.buffer} />
                {isAuthenticated() ? (
                    <AvatarMenu />
                ) : (
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </MuiAppBar>
    )
}

export default AppBar
