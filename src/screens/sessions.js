import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Table, Icon, Image } from 'semantic-ui-react'
import { FullPageSpinner, ErrorMessage, SessionDuration } from '../components'
import { useAxios } from '../context/axios-context'

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
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Member</Table.HeaderCell>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>Finish</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Duration</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.length > 0 ? (
          data.map(session => (
            <Table.Row key={session.id}>
              <Table.Cell>
                <Link to={`/members/${session.member.id}`}>
                  <Image
                    src={
                      session.member.profileImage
                        ? `/api/images/${member.profileImage}`
                        : '/avatar.png'
                    }
                    alt={`${session.member.firstName} ${session.member.lastName}'s Profile Image`}
                    avatar
                  />
                  <span style={{ color: 'black' }}>
                    {`${session.member.firstName} ${session.member.lastName}`}
                  </span>
                </Link>
              </Table.Cell>
              <Table.Cell>
                {new Date(session.start).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(session.finish).toLocaleString()}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <SessionDuration session={session} />
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan="4" textAlign="center">
              <Icon name="attention" />
              No data.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default Sessions
