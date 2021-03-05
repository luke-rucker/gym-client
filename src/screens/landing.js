import React from 'react'
import { useQuery } from 'react-query'
import { Redirect } from 'react-router-dom'
import { Container, Message, Header } from 'semantic-ui-react'
import { FullPageSpinner, AppBar } from '../components'
import { useAuth } from '../context/auth-context'
import { publicAxios } from '../util/axios'

function Landing() {
  const auth = useAuth()

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
      {auth.isAuthenticated() && <Redirect to="/dashboard" />}
      <AppBar />
      <Container text style={{ textAlign: 'center' }}>
        {error ? (
          <Message negative>
            {error.response.data.message || 'Something went wrong!'}
          </Message>
        ) : (
          <Header size="huge">
            {data.currentCapacity}/{data.maxCapacity} People are in the Gym
          </Header>
        )}
      </Container>
    </>
  )
}

export default Landing
