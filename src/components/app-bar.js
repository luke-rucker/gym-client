import { useAuth } from '../context/auth-context'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    AppBar as MuiAppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core'

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
    const { isAuthenticated, logout } = useAuth()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Jacobs University Gym
                    </Typography>
                    {isAuthenticated() ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={logout}
                        >
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
