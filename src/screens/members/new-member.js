import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import {
    Container,
    Header,
    Divider,
    Form,
    Button,
    Message,
} from 'semantic-ui-react'
import { useAxios } from '../../context/axios-context'

function NewMember() {
    const axios = useAxios()
    const history = useHistory()
    const queryClient = useQueryClient()

    const mutation = useMutation(
        newMember => axios.post('/members', newMember),
        {
            onSuccess: (data, variables, context) => {
                queryClient.invalidateQueries('members')
                history.push(`/members/${data.data.id}`)
            },
        }
    )

    function handleSubmit(event) {
        event.preventDefault()

        const { firstName, lastName, email } = event.target.elements
        mutation.mutate({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
        })
    }

    return (
        <Container text>
            <Header as="h2">Create a new member</Header>
            <Divider />
            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        required
                        label="First Name"
                        placeholder="First Name"
                        name="firstName"
                    />
                    <Form.Input
                        fluid
                        required
                        label="Last Name"
                        placeholder="Last Name"
                        name="lastName"
                    />
                </Form.Group>
                <Form.Input
                    fluid
                    required
                    label="Email"
                    placeholder="Email"
                    name="email"
                />
                <Divider />
                {mutation.error && (
                    <Message negative>
                        {mutation.error.response.data.message ||
                            'Could not create new member.'}
                    </Message>
                )}
                <Button
                    type="submit"
                    color="green"
                    loading={mutation.isLoading}
                >
                    Create member
                </Button>
            </Form>
        </Container>
    )
}

export default NewMember
