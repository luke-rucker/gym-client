import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown, Button } from 'semantic-ui-react'
import { useAuth } from '../context/auth-context'

function AppBar() {
    const history = useHistory()
    const { isAuthenticated } = useAuth()

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
                    <AvatarMenu />
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

function AvatarMenu() {
    const { logout, authState } = useAuth()

    const trigger = (
        <>
            <Image
                avatar
                src={authState.userInfo.profileImageUrl}
                alt="profile image"
            />
            <span>{authState.userInfo.firstName}</span>
        </>
    )

    return (
        <Menu.Menu
            position="right"
            style={{
                paddingRight: '10px',
                marginBottom: 'auto',
                marginTop: 'auto',
            }}
        >
            <Dropdown
                pointing
                trigger={trigger}
                image={{
                    avatar: true,
                    src: authState.userInfo.profileImageUrl,
                }}
            >
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout()}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    )
}

export default AppBar
