import React from 'react'
import { useQueryClient } from 'react-query'
import { Redirect } from 'react-router-dom'
import { Button, Form, Grid, Image, Segment, Message } from 'semantic-ui-react'
import { useAuth } from '../context/auth-context'
import { useAxios } from '../context/axios-context'
import { publicAxios } from '../util/axios'

function Login() {
    const auth = useAuth()
    const queryClient = useQueryClient()
    const axios = useAxios()

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

            await queryClient.prefetchQuery('me', () =>
                axios.get('/users/me').then(response => response.data)
            )

            setErrorMessage('')
            auth.setAuthState(data)
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