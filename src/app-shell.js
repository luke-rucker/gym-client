import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from './components/app-bar'
import Drawer from './components/drawer'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
    },
}))

function AppShell({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar />
            <Drawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    )
}

export default AppShell
