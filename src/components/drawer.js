import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Drawer as MuiDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import { useAuth } from '../context/auth-context'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}))

function Drawer() {
    const classes = useStyles()
    const history = useHistory()
    const { authState } = useAuth()

    const drawerItems = [
        {
            name: 'Dashboard',
            icon: <DashboardIcon />,
            onClick: () => history.push('/dashboard'),
            allowedRoles: ['ADVISOR', 'ADMIN'],
        },
        {
            name: 'Admin',
            icon: <SupervisorAccountIcon />,
            onClick: () => history.push('/admin'),
            allowedRoles: ['ADMIN'],
        },
    ]

    return (
        <MuiDrawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {drawerItems
                    .filter((item) =>
                        item.allowedRoles.includes(authState.userInfo.role)
                    )
                    .map((item) => (
                        <ListItem button key={item.name} onClick={item.onClick}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
            </List>
        </MuiDrawer>
    )
}

export default Drawer
