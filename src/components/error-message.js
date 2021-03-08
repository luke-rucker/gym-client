import React from 'react'
import { Message, Icon, Container } from 'semantic-ui-react'

function ErrorMessage({ constrained, message }) {
  const errorMessage = (
    <Message negative icon>
      <Icon name="frown outline" />
      <Message.Content>
        <Message.Header>Error</Message.Header>
        {message || 'Something went wrong!'}
      </Message.Content>
    </Message>
  )

  return constrained ? <Container text>{errorMessage}</Container> : errorMessage
}

export default ErrorMessage
