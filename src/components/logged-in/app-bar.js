import { useAuth } from '../../context/auth-context'
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
    title: {
        flexGrow: 1,
    },
}))

function AppBar() {
    const { logout } = useAuth()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <MuiAppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Jacobs University Gym
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </MuiAppBar>
        </div>
    )
}

export default AppBar
