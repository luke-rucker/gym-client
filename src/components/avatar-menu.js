import React, { useState } from 'react'
import { IconButton, Avatar, Menu, MenuItem } from '@material-ui/core'
import { useAuth } from '../context/auth-context'

function AvatarMenu() {
    const { authState, logout } = useAuth()
    const { userInfo } = authState

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = event => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <IconButton
                aria-controls="avatar-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar
                    alt={userInfo.firstname + ' ' + userInfo.lastname}
                    src={userInfo.profileImageUrl}
                />
            </IconButton>
            <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default AvatarMenu
