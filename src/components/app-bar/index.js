import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Button } from 'semantic-ui-react'
import AvatarDropdown from './avatar-dropdown'
import NewDropdown from './new-dropdown'
import { useAuth } from '../../context/auth-context'

function AppBar() {
    const history = useHistory()
    const { isAuthenticated, authState } = useAuth()

    const menuItems = [
        {
            name: 'Members',
            onClick: () => history.push('/members'),
            rolesAllowed: ['USER', 'ADMIN'],
        },
        {
            name: 'Admin',
            onClick: () => history.push('/admin'),
            rolesAllowed: ['ADMIN'],
        },
    ]

    return (
        <>
            <Menu borderless>
                <Menu.Item
                    onClick={() =>
                        history.push(isAuthenticated() ? '/dashboard' : '/')
                    }
                    header
                >
                    <Image size="mini" src="/icon.svg" alt="logo" />
                    <div style={{ paddingLeft: '4px' }}>
                        Jacobs University Gym
                    </div>
                </Menu.Item>
                {isAuthenticated() ? (
                    <>
                        {menuItems
                            .filter(menuItem =>
                                menuItem.rolesAllowed.includes(
                                    authState.userInfo.role
                                )
                            )
                            .map(menuItem => (
                                <Menu.Item
                                    onClick={menuItem.onClick}
                                    key={menuItem.name}
                                >
                                    {menuItem.name}
                                </Menu.Item>
                            ))}
                        <Menu.Menu
                            position="right"
                            style={{
                                margin: 'auto 0',
                            }}
                        >
                            <Menu.Item>
                                <NewDropdown />
                            </Menu.Item>
                            <Menu.Item>
                                <AvatarDropdown />
                            </Menu.Item>
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Item position="right">
                        <Button
                            style={{
                                backgroundColor: '#004180',
                                color: 'white',
                            }}
                            onClick={() => history.push('/login')}
                        >
                            Login
                        </Button>
                    </Menu.Item>
                )}
            </Menu>
        </>
    )
}

export default AppBar
