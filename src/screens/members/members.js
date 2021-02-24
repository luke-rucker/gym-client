import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Message, Grid, Button, Form, Icon, Container } from 'semantic-ui-react'
import { FullPageSpinner, MembersTable } from '../../components'
import { useFetch } from '../../context/fetch-context'

function Members() {
    const history = useHistory()
    const { authAxios } = useFetch()

    const { isLoading, error, data } = useQuery('members', () =>
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

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (error) {
        return (
            <Container text>
                <Message negative>
                    <Message.Header>Error</Message.Header>
                    {error.response.data.message || 'Could not load members.'}
                </Message>
            </Container>
        )
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
            <MembersTable members={filter(data)} />
        </>
    )
}

export default Members
