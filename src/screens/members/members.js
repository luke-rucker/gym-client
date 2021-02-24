import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Grid, Button, Form, Icon } from 'semantic-ui-react'
import { FullPageSpinner, MembersTable } from '../../components'
import { useFetch } from '../../context/fetch-context'

function Members() {
    const history = useHistory()
    const { authAxios } = useFetch()

    const membersQuery = useQuery('members', () =>
        authAxios.get('/members').then(response => response.data)
    )

    const [search, setSearch] = React.useState('')

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

    if (membersQuery.isLoading) {
        return <FullPageSpinner />
    }

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <Form.Input
                        icon="search"
                        placeholder="Find a member..."
                        onChange={e => setSearch(e.target.value)}
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
            <MembersTable members={filter(membersQuery.data)} />
        </>
    )
}

export default Members
