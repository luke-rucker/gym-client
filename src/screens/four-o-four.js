import React from 'react'
import { Grid, Container, Header } from 'semantic-ui-react'

function FourOFour() {
  return (
    <Grid style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column>
        <Container text textAlign="center">
          <Header size="huge">404</Header>
          <Header size="huge">You look lost!</Header>
        </Container>
      </Grid.Column>
    </Grid>
  )
}

export default FourOFour
