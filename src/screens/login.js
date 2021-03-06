import React from 'react'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Button, Form, Grid, Image, Segment, Message } from 'semantic-ui-react'
import { useAuth } from '../context/auth-context'
import { publicAxios } from '../util'

function Login() {
  const history = useHistory()
  const location = useLocation()
  const auth = useAuth()

  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState()

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setErrorMessage('')
      setIsLoading(true)

      const { email, password } = event.target.elements
      const { data } = await publicAxios.post('/auth/login', {
        email: email.value,
        password: password.value,
      })

      setErrorMessage('')
      auth.setAuthState(data)

      const { from } = location.state || { from: { pathname: '/dashboard' } }
      history.push(from)
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <>
      {auth.isAuthenticated() && <Redirect to="/dashboard" />}
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Image src="/logo.svg" alt="logo" />
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                required
                icon="user"
                iconPosition="left"
                placeholder="Email"
                name="email"
              />
              <Form.Input
                fluid
                required
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
              />
              <Button
                fluid
                size="large"
                style={{
                  backgroundColor: '#004180',
                  color: 'white',
                }}
                type="submit"
                loading={isLoading}
              >
                Login
              </Button>
            </Segment>
            {errorMessage && (
              <Message negative style={{ textAlign: 'center' }}>
                <p>{errorMessage}</p>
              </Message>
            )}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Login
