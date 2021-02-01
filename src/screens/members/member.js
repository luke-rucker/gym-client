import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Avatar, Typography } from '@material-ui/core'
import { FullPageSpinner, Alert } from '../../components'
import FourOFour from '../four-o-four'
import { useFetch } from '../../context/fetch-context'

const useStyles = makeStyles(theme => ({
    alert: {
        marginTop: theme.spacing(2),
        maxWidth: 240,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    gridItem: {
        padding: theme.spacing(2),
    },
}))

function Member() {
    const classes = useStyles()
    const { authAxios } = useFetch()
    const { memberId } = useParams()
    const { isLoading, error, data } = useQuery(
        ['members', parseInt(memberId)],
        () =>
            authAxios
                .get(`/members/${memberId}`)
                .then(response => response.data)
    )

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (error) {
        if (error.response.status === 404) {
            return <FourOFour />
        } else {
            return (
                <Alert severity="error" className={classes.alert}>
                    Could not load the requested member.
                </Alert>
            )
        }
    }

    return (
        <Paper className={classes.paper}>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid container item xs={12}>
                    <Grid item xs={4}>
                        <Avatar
                            alt={`${data.firstName} ${data.lastName}`}
                            src={data.profileImageUrl}
                            className={classes.avatar}
                        />
                    </Grid>
                    <Grid container item xs={8} className={classes.gridItem}>
                        <Grid item xs={12}>
                            <Typography variant="h4">
                                {`${data.firstName} ${data.lastName}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="p">{data.email}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Member
