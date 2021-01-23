import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import publicAxios from '../util/axios'
import FullPageSpinner from '../components/full-page-spinner'
import Alert from '../components/alert'
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

const useStyles = makeStyles((theme) => ({
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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function SignIn() {
    const classes = useStyles()
    const { setAuthState } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [redirectOnLogin, setRedirectOnLogin] = useState(false)

    async function login() {
        try {
            setIsLoading(true)
            const { data } = await publicAxios.post('/auth/login', {
                email,
                password,
            })

            setAuthState(data)
            setIsLoading(false)
            setSuccessMessage(data.message)
            setErrorMessage(null)

            setTimeout(() => {
                setRedirectOnLogin(true)
            }, 700)
        } catch (error) {
            setIsLoading(false)
            setErrorMessage(error.response.data.message)
            setSuccessMessage(null)
        }
    }

    return (
        <>
            {redirectOnLogin && <Redirect to="/dashboard" />}
            {isLoading && <FullPageSpinner />}
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={(e) => {
                            e.preventDefault()
                            login()
                        }}
                        noValidate
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            onInput={(e) => setEmail(e.target.value)}
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
                            onInput={(e) => setPassword(e.target.value)}
                        />
                        {successMessage && (
                            <Alert severity="success">{successMessage}</Alert>
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
                            Sign In
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

export default SignIn
