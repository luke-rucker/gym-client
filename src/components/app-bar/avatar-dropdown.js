import React from 'react'
import { Image, Dropdown } from 'semantic-ui-react'
import { useAuth } from '../../context/auth-context'
import { useUser } from '../../context/user-context'

function AvatarDropdown() {
  const auth = useAuth()
  const user = useUser()

  const trigger = (
    <>
      <Image avatar src={user.profileImageUrl} alt="profile image" />
      <span>{user.firstName}</span>
    </>
  )

  return (
    <Dropdown pointing trigger={trigger}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => auth.logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AvatarDropdown
