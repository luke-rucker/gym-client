import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { ErrorMessage, SessionDuration } from '../../components'

function MemberSessions({ sessions, error }) {
  if (error) {
    return <ErrorMessage message="Could not load member sessions." />
  }

  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>Finish</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Duration</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sessions?.length > 0 ? (
          sessions?.map(session => (
            <Table.Row key={session.id}>
              <Table.Cell>
                {new Date(session.start).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {session.finish && new Date(session.finish).toLocaleString()}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <SessionDuration session={session} />
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan="3" textAlign="center">
              <Icon name="attention" />
              Member has no sessions.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default MemberSessions
