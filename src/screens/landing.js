import React from 'react'
import { useQuery } from 'react-query'
import { Container, Message, Header } from 'semantic-ui-react'
import { FullPageSpinner, AppBar } from '../components'
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
            <Container text style={{ textAlign: 'center' }}>
                {error ? (
                    <Message negative>
                        {error.response.data.message || 'Something went wrong!'}
                    </Message>
                ) : (
                    <Header size="huge">
                        {data.currentCapacity}/{data.maxCapacity} People are in
                        the Gym
                    </Header>
                )}
            </Container>
        </>
    )
}

export default Landing
