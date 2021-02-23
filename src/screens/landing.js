import React from 'react'
import { useQuery } from 'react-query'
import { Container, Typography } from '@material-ui/core'
import { FullPageSpinner, AppBar, Alert } from '../components'
import publicAxios from '../util/axios'

function Landing() {
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
            <AppBar />
            {error ? (
                <Alert severity="error">
                    {error.response.data.message || 'Something went wrong!'}
                </Alert>
            ) : (
                <Container>
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
