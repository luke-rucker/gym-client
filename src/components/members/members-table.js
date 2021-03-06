import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table, Pagination } from 'semantic-ui-react'
import MemberActions from './member-actions'

function MembersTable({ members }) {
  const history = useHistory()

  const [page, setPage] = React.useState(0)

  const handlePageChange = (e, { activePage }) => setPage(activePage - 1)

  const rowsPerPage = 10
  const rows = members.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell textAlign="right">Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {rows.length > 0 && (
        <Table.Body>
          {rows.map(member => (
            <Table.Row key={member.id}>
              <Table.Cell
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(`/members/${member.id}`)}
              >{`${member.firstName} ${member.lastName}`}</Table.Cell>
              <Table.Cell
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(`/members/${member.id}`)}
              >
                {member.email}
              </Table.Cell>
              <Table.Cell textAlign="right">
                <MemberActions memberId={member.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      )}
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="3" textAlign="center">
            <Pagination
              activePage={page + 1}
              onPageChange={handlePageChange}
              totalPages={Math.ceil(members.length / rowsPerPage)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default MembersTable
