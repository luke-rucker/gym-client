import React, { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

function AppBar() {
    const authContext = useContext(AuthContext)
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h5" className={classes.title}>
                        Jacobs University Gym
                    </Typography>
                    {authContext.isAuthenticated() ? (
                        <Button color="primary" onClick={authContext.logout()}>
                            Logout
                        </Button>
                    ) : (
                        <Button
                            component={Link}
                            to="/sign-in"
                            variant="contained"
                            color="primary"
                        >
                            Sign In
                        </Button>
                    )}
                </Toolbar>
            </MuiAppBar>
        </div>
    )
}

export default AppBar
