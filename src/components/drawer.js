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
import GroupIcon from '@material-ui/icons/Group'
import LockIcon from '@material-ui/icons/Lock'
import { useAuth } from '../context/auth-context'

const drawerWidth = 180

const useStyles = makeStyles(theme => ({
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

const drawerItems = [
    {
        name: 'Dashboard',
        icon: <DashboardIcon />,
        onClick: () => history.push('/dashboard'),
        allowedRoles: ['ADVISOR', 'ADMIN'],
    },
    {
        name: 'Members',
        icon: <GroupIcon />,
        onClick: () => history.push('/members'),
        allowedRoles: ['ADVISOR', 'ADMIN'],
    },
    {
        name: 'Admin',
        icon: <LockIcon />,
        onClick: () => history.push('/admin'),
        allowedRoles: ['ADMIN'],
    },
]

function Drawer() {
    const classes = useStyles()
    const history = useHistory()
    const { authState } = useAuth()

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
                    .filter(item =>
                        item.allowedRoles.includes(authState.userInfo.role)
                    )
                    .map(item => (
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
