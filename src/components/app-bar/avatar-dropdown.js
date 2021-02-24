import React from 'react'
import { Image, Dropdown } from 'semantic-ui-react'
import { useAuth } from '../../context/auth-context'

function AvatarDropdown() {
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
        <Dropdown pointing trigger={trigger}>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AvatarDropdown
