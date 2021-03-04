import React from 'react'
import { Grid, Container, Message, Icon } from 'semantic-ui-react'

function FullPageErrorFallback({ message }) {
    return (
        <Grid style={{ height: '100vh' }} verticalAlign="middle">
            <Grid.Column>
                <Container text textAlign="center">
                    <Message negative>
                        <Message.Header>
                            <Icon name="frown outline" size="big" />
                            Uh oh! There's a problem...
                        </Message.Header>
                        <p>{message}</p>
                    </Message>
                </Container>
            </Grid.Column>
        </Grid>
    )
}

export default FullPageErrorFallback
