import { useQuery } from 'react-query'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FullPageSpinner from '../components/full-page-spinner'
import Alert from '../components/alert'
import AppBar from '../components/logged-out/app-bar'
import publicAxios from '../util/axios'

const useStyles = makeStyles((theme) => ({
    content: {
        textAlign: 'center',
    },
}))

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
        <>
            <AppBar />
            <Container className={classes.content}>
                <Typography variant="h1">
                    {data.currentCapacity}/{data.maxCapacity} People
                </Typography>
                <Typography variant="h2">Are in the Gym</Typography>
            </Container>
        </>
    )
}

export default Landing
