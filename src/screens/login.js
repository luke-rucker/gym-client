import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { FullPageSpinner, Alert } from '../components'
import { useAuth } from '../context/auth-context'
import publicAxios from '../util/axios'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function Login() {
    const classes = useStyles()
    const { isAuthenticated, setAuthState } = useAuth()

    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setIsLoading(true)

            const { email, password } = event.target.elements
            const { data } = await publicAxios.post('/auth/login', {
                email: email.value,
                password: password.value,
            })

            setErrorMessage('')
            setSuccessMessage(data.message)

            // Delay so success message is visibly rendered before redirect
            setTimeout(() => setAuthState(data), 500)
        } catch (error) {
            setIsLoading(false)
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <>
            {isAuthenticated() && <Redirect to="/dashboard" />}
            {isLoading && <FullPageSpinner />}
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Login</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        {successMessage && (
                            <Alert severity="success" hideTitle>
                                {successMessage}
                            </Alert>
                        )}
                        {errorMessage && (
                            <Alert severity="error">{errorMessage}</Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Login
