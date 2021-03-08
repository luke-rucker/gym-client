import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Item, Tab } from 'semantic-ui-react'
import {
  FullPageSpinner,
  ErrorMessage,
  MemberMemberships,
  MemberSessions,
} from '../../components'
import FourOFour from '../four-o-four'
import { useAxios } from '../../context/axios-context'

function Member() {
  const axios = useAxios()
  const { memberId } = useParams()

  const member = useQuery(['member', memberId], () =>
    axios.get(`/members/${memberId}`).then(response => response.data)
  )
  const memberSessions = useQuery(['member', memberId, 'sessions'], () =>
    axios.get(`/members/${memberId}/sessions`).then(response => response.data)
  )

  if (member.isLoading) {
    return <FullPageSpinner />
  }

  if (member.error) {
    if (member.error.response.status === 404) {
      return <FourOFour />
    } else {
      return (
        <ErrorMessage
          constrained
          message={
            member.error.response.data.message ||
            'Could not load the requested member.'
          }
        />
      )
    }
  }

  const panes = [
    {
      menuItem: 'Sessions',
      render: () => (
        <Tab.Pane loading={memberSessions.isLoading}>
          <MemberSessions
            sessions={memberSessions.data}
            error={memberSessions.error}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Memberships',
      render: () => (
        <Tab.Pane>
          <MemberMemberships />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <>
      <Item.Group>
        <Item>
          <Item.Image
            size="medium"
            circular
            src={member.data.profileImageUrl || '/avatar.png'}
            alt={`${member.data.firstName} ${member.data.lastName}'s Profile Image`}
          />
          <Item.Content style={{ margin: 'auto 0' }}>
            <Item.Header>{`${member.data.firstName} ${member.data.lastName}`}</Item.Header>
            <Item.Description>{`Email: ${member.data.email}`}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
      <Tab panes={panes} />
    </>
  )
}

export default Member
