import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import { Form } from 'semantic-ui-react'
import { useAxios } from '../../context/axios-context'
import ErrorModal from '../error-modal'

function CheckInMember({ style }) {
  const queryClient = useQueryClient()
  const axios = useAxios()

  const [selectedMember, setSelectedMember] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const searchResults = useQuery(
    ['members', { search: searchQuery }],
    () =>
      axios
        .get('/members', { params: { search: searchQuery } })
        .then(response => response.data),
    {
      enabled: Boolean(searchQuery),
    }
  )

  const checkInMember = useMutation(
    memberId => axios.post(`/members/${memberId}/sessions`),
    {
      onError: error => {
        setErrorMessage(
          error.response?.data?.message || 'Could not check member in.'
        )
        setTimeout(() => setErrorMessage(''), 5000)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['sessions', { status: 'active' }])
      },
    }
  )

  function handleSubmit() {
    if (!selectedMember) return
    checkInMember.mutate(selectedMember)
  }

  return (
    <>
      <Form style={style} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Dropdown
            selection
            search
            clearable
            placeholder="Check in member"
            disabled={searchResults.isFetching}
            loading={searchResults.isFetching}
            onSearchChange={(e, { searchQuery }) =>
              setSearchQuery(searchQuery.toLowerCase())
            }
            options={
              searchResults.data?.map(member => ({
                key: member.id,
                text: `${member.firstName} ${member.lastName}`,
                value: member.id,
              })) || []
            }
            value={selectedMember}
            onChange={(e, { value }) => setSelectedMember(value)}
          />
          <Form.Button type="submit" color="green">
            Check in
          </Form.Button>
        </Form.Group>
      </Form>
      <ErrorModal
        open={Boolean(errorMessage)}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </>
  )
}

export default CheckInMember
