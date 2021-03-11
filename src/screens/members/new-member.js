import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Header,
  Divider,
  Form,
  Button,
  Icon,
} from 'semantic-ui-react'
import { ErrorMessage } from '../../components'
import { useAxios } from '../../context/axios-context'

function NewMember() {
  const axios = useAxios()
  const history = useHistory()
  const queryClient = useQueryClient()

  const mutation = useMutation(newMember => axios.post('/members', newMember), {
    onSuccess: data => {
      queryClient.invalidateQueries('members')
      history.push(`/members/${data.data.id}`)
    },
  })

  function handleSubmit(event) {
    event.preventDefault()

    const { firstName, lastName, email } = event.target.elements
    mutation.mutate({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
    })
  }

  const [fileInputKey, setFileInputKey] = React.useState(Date.now())
  const [profileImageFile, setProfileImageFile] = React.useState(null)

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
        <Form.Field>
          <label>Profile Image</label>
          <span>
            <Button
              content="Choose File"
              labelPosition="left"
              icon="file"
              htmlFor="profileImage"
              type="button"
              as="label"
            />
            {profileImageFile ? (
              <span>
                {profileImageFile.name}
                <Icon
                  name="cancel"
                  onClick={() => {
                    setFileInputKey(Date.now()) // Force a rerender of file input component
                    setProfileImageFile(null)
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </span>
            ) : (
              <span>No file chosen.</span>
            )}
          </span>
          <Form.Input
            style={{ display: 'none' }}
            type="file"
            accept="image/png,image/jpeg .png,.jpeg"
            id="profileImage"
            key={fileInputKey}
            onChange={event => setProfileImageFile(event.target.files[0])}
          />
        </Form.Field>
        <Divider />
        {mutation.error && (
          <ErrorMessage
            message={
              mutation.error.response.data.message ||
              'Could not create new member.'
            }
          />
        )}
        <Button type="submit" color="green" loading={mutation.isLoading}>
          Create member
        </Button>
      </Form>
    </Container>
  )
}

export default NewMember
