import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Image, Dropdown, Button } from 'semantic-ui-react'
import { useAuth } from '../context/auth-context'

function AppBar() {
    const history = useHistory()
    const { isAuthenticated, logout, authState } = useAuth()

    return (
        <>
            <Menu borderless>
                <Menu.Item
                    onClick={() =>
                        history.push(isAuthenticated() ? '/dashboard' : '/')
                    }
                >
                    <Image size="medium" src="/logo.svg" alt="logo" />
                </Menu.Item>
                {isAuthenticated() ? (
                    <Menu.Menu
                        position="right"
                        style={{
                            paddingRight: '10px',
                            marginBottom: 'auto',
                            marginTop: 'auto',
                        }}
                    >
                        <Dropdown text={authState.userInfo.firstName} pointing>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logout()}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
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
