import React from 'react'
import { Container, Icon, Message } from 'semantic-ui-react'

function ErrorMessage({ message }) {
  return (
    <Container text>
      <Message negative icon>
        <Icon name="frown outline" />
        <Message.Content>
          <Message.Header>Error</Message.Header>
          {message || 'Something went wrong!'}
        </Message.Content>
      </Message>
    </Container>
  )
}

export default ErrorMessage
