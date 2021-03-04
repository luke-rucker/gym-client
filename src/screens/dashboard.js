import React from 'react'
import { useQuery } from 'react-query'
import { Statistic, Grid, Button, Icon, Table } from 'semantic-ui-react'
import { FullPageErrorFallback, FullPageSpinner, TimeLeft } from '../components'
import { useAxios } from '../context/axios-context'

function Dashboard() {
    const axios = useAxios()

    const { isLoading, error, data } = useQuery('activeSessions', () =>
        axios.get('/sessions/?status=active').then(response => response.data)
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
                    <Statistic.Value>{data.length}/15</Statistic.Value>
                    <Statistic.Label>Members in the Gym</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Grid>
                <Grid.Column width={4} floated="right">
                    <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        color="green"
                    >
                        <Icon name="plus" />
                        Check in member
                    </Button>
                </Grid.Column>
            </Grid>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Member</Table.HeaderCell>
                        <Table.HeaderCell>Time Left</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                            Check Out
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {data.map(session => (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{`${session.member.firstName} ${session.member.lastName}`}</Table.Cell>
                            <Table.Cell>
                                <TimeLeft
                                    start={new Date(session.start)}
                                    duration={1000 * 60 * 60 * 1.5} // 1.5 hours in milliseconds
                                />
                            </Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button>Check Out</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </>
    )
}

export default Dashboard
