import React from 'react'
import { useQuery } from 'react-query'
import { Statistic, Table, Icon } from 'semantic-ui-react'
import {
  FullPageErrorFallback,
  FullPageSpinner,
  CheckInMember,
  CheckOutMember,
  TimeLeft,
} from '../components'
import { useAxios } from '../context/axios-context'

function Dashboard() {
  const axios = useAxios()

  const { isLoading, error, data: activeSessions } = useQuery(
    ['sessions', { status: 'active' }],
    () =>
      axios
        .get('/sessions', { params: { status: 'active', sort: 'asc' } })
        .then(response => response.data)
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (error) {
    return <FullPageErrorFallback message={error.response.data.message} />
  }

  return (
    <>
      <Statistic.Group widths="1">
        <Statistic>
          <Statistic.Value>{activeSessions.length}/15</Statistic.Value>
          <Statistic.Label>Members in the Gym</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <CheckInMember style={{ float: 'right' }} />
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Member</Table.HeaderCell>
            <Table.HeaderCell>Time Left</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">Check Out</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activeSessions.length > 0 ? (
            activeSessions.map(session => (
              <Table.Row key={session.id}>
                <Table.Cell>{`${session.member.firstName} ${session.member.lastName}`}</Table.Cell>
                <Table.Cell>
                  <TimeLeft
                    start={new Date(session.start)}
                    duration={1000 * 60 * 60 * 1.5} // 1.5 hours in milliseconds
                  />
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <CheckOutMember sessionId={session.id} />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="3" textAlign="center">
                <Icon name="attention" />
                No members are in the gym.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}

export default Dashboard
