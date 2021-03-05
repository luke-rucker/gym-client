import React from 'react'
import { Grid, Container, Icon, Header } from 'semantic-ui-react'
import { AppBar } from '../components'
import { useAuth } from '../context/auth-context'

function FourOFour() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated() ? (
        <FourOFourMessage />
      ) : (
        <>
          <AppBar />
          <FourOFourMessage />
        </>
      )}
    </>
  )
}

function FourOFourMessage() {
  return (
    <Grid style={{ height: '90vh' }} verticalAlign="middle">
      <Grid.Column>
        <Container text textAlign="center">
          <Icon name="frown outline" size="huge" />
          <Header size="huge">You look lost!</Header>
        </Container>
      </Grid.Column>
    </Grid>
  )
}

export default FourOFour
