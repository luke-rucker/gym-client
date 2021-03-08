import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Grid, Button, Form, Icon } from 'semantic-ui-react'
import { FullPageSpinner, ErrorMessage, MembersTable } from '../../components'
import { useAxios } from '../../context/axios-context'

function Members() {
  const history = useHistory()
  const location = useLocation()
  const axios = useAxios()

  const queryParam = new URLSearchParams(location.search)
  const search = queryParam.get('search') || ''

  function handleSearchChange(e) {
    const newSearch = e.target.value

    if (!newSearch) {
      queryParam.delete('search')
    } else {
      queryParam.set('search', newSearch)
    }

    history.push({
      pathname: location.pathname,
      search: queryParam.toString(),
    })
  }

  function filter(members) {
    if (!search) {
      return members
    }

    return members.filter(
      member =>
        `${member.firstName} ${member.lastName} ${member.email}`
          .toLowerCase()
          .indexOf(search.toLowerCase()) >= 0
    )
  }

  const { isLoading, error, data } = useQuery('members', () =>
    axios.get('/members').then(response => response.data)
  )

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (error) {
    return (
      <ErrorMessage
        constrained
        message={error.response.data.message || 'Could not load members.'}
      />
    )
  }

  return (
    <>
      <Grid>
        <Grid.Column width={4}>
          <Form.Input
            icon="search"
            placeholder="Find a member..."
            onChange={handleSearchChange}
            value={search}
          />
        </Grid.Column>
        <Grid.Column width={2} floated="right">
          <Button
            floated="right"
            icon
            labelPosition="left"
            color="green"
            onClick={() => history.push('/members/new')}
          >
            <Icon name="user" />
            New
          </Button>
        </Grid.Column>
      </Grid>
      <MembersTable members={filter(data)} />
    </>
  )
}

export default Members
