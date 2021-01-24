import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import {
    AppBar as MuiAppBar,
    Toolbar,
    Button,
    Container,
    Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import FullPageSpinner from '../components/full-page-spinner'
import Alert from '../components/alert'
import { useAuth } from '../context/auth-context'
import publicAxios from '../util/axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBarIcon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    content: {
        textAlign: 'center',
    },
}))

function AppBar() {
    const classes = useStyles()
    const { isAuthenticated } = useAuth()

    return (
        <MuiAppBar position="static">
            <Toolbar>
                <FitnessCenterIcon className={classes.appBarIcon} />
                <Typography variant="h5" className={classes.title}>
                    Jacobs University Gym
                </Typography>
                <Button
                    component={Link}
                    to={isAuthenticated() ? '/dashboard' : '/login'}
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </Toolbar>
        </MuiAppBar>
    )
}

function Landing() {
    const classes = useStyles()

    const { isLoading, error, data } = useQuery(
        'gymStatus',
        () => publicAxios.get('/gym/status').then((response) => response.data),
        {
            retry: false,
        }
    )

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (error) {
        return <Alert severity="error">{error.response.data.message}</Alert>
    }

    return (
        <div className={classes.root}>
            <AppBar />
            <Container className={classes.content}>
                <Typography variant="h1">
                    {data.currentCapacity}/{data.maxCapacity} People
                </Typography>
                <Typography variant="h2">Are in the Gym</Typography>
            </Container>
        </div>
    )
}

export default Landing
