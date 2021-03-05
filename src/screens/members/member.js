import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Container, Message, Item } from 'semantic-ui-react'
import { FullPageSpinner } from '../../components'
import FourOFour from '../four-o-four'
import { useAxios } from '../../context/axios-context'

function Member() {
  const axios = useAxios()
  const { memberId } = useParams()

  const { isLoading, error, data } = useQuery(
    ['members', { id: memberId }],
    () => axios.get(`/members/${memberId}`).then(response => response.data)
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (error) {
    if (error.response.status === 404) {
      return <FourOFour />
    } else {
      return (
        <Container text>
          <Message negative>
            <Message.Header>Error</Message.Header>
            {error.response.data.message ||
              'Could not load the requested member.'}
          </Message>
        </Container>
      )
    }
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image
          size="medium"
          circular
          src={data.profileImageUrl || '/avatar.png'}
          alt={`${data.firstName} ${data.lastName}'s Profile Image`}
        />
        <Item.Content style={{ margin: 'auto 0' }}>
          <Item.Header>{`${data.firstName} ${data.lastName}`}</Item.Header>
          <Item.Description>{`Email: ${data.email}`}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default Member
