import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

function ErrorMessage({ message }) {
  return (
    <Message negative icon>
      <Icon name="frown outline" />
      <Message.Content>
        <Message.Header>Error</Message.Header>
        {message || 'Something went wrong!'}
      </Message.Content>
    </Message>
  )
}

export default ErrorMessage
