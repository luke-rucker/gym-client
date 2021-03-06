import React from 'react'
import { useQuery } from 'react-query'
import { Table } from 'semantic-ui-react'
import {
  FullPageSpinner,
  ErrorMessage,
  SessionDuration,
} from '../../components'
import { useAxios } from '../../context/axios-context'

function Sessions() {
  const axios = useAxios()

  const { isLoading, data, error } = useQuery(
    ['sessions', { status: 'finished' }],
    () =>
      axios
        .get('/sessions', { params: { status: 'finished' } })
        .then(response => response.data)
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (error) {
    return (
      <ErrorMessage
        message={error.response.data.message || 'Could not load gym sessions.'}
      />
    )
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Member</Table.HeaderCell>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>Finish</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Duration</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(session => (
          <Table.Row key={session.id}>
            <Table.Cell>{`${session.member.firstName} ${session.member.lastName}`}</Table.Cell>
            <Table.Cell>{new Date(session.start).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(session.finish).toLocaleString()}</Table.Cell>
            <Table.Cell textAlign="right">
              <SessionDuration session={session} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default Sessions
