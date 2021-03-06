import React from 'react'
import { Table } from 'semantic-ui-react'
import { ErrorMessage } from '../../components'
import { msToHoursAndMinutes } from '../../util'

function MemberSessions({ sessions, error }) {
  if (error) {
    return <ErrorMessage message="Could not load member sessions." />
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Start</Table.HeaderCell>
          <Table.HeaderCell>Finish</Table.HeaderCell>
          <Table.HeaderCell>Duration</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sessions?.map(session => (
          <Table.Row key={session.id}>
            <Table.Cell>{new Date(session.start).toLocaleString()}</Table.Cell>
            <Table.Cell>{new Date(session.finish).toLocaleString()}</Table.Cell>
            <Table.Cell>
              <Duration session={session} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

function Duration({ session }) {
  const durationInMs = new Date(session.finish) - new Date(session.start)
  const duration = msToHoursAndMinutes(durationInMs)

  const timeComponents = []

  Object.keys(duration).forEach(interval => {
    if (!duration[interval]) {
      return
    }

    timeComponents.push(
      <span key={interval}>
        {duration[interval]} {interval}{' '}
      </span>
    )
  })

  return <>{timeComponents}</>
}

export default MemberSessions
