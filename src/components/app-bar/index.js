import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import AvatarDropdown from './avatar-dropdown'
import NewDropdown from './new-dropdown'
import { useUser } from '../../context/user-context'

function AppBar() {
  const history = useHistory()
  const user = useUser()

  const menuItems = [
    {
      name: 'Members',
      onClick: () => history.push('/members'),
      rolesAllowed: ['USER', 'ADMIN'],
    },
    {
      name: 'Sessions',
      onClick: () => history.push('/sessions'),
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
      <Menu fixed="top" borderless>
        <Menu.Item as={Link} to="/dashboard" header>
          <Image size="mini" src="/icon.svg" alt="logo" />
          <div style={{ paddingLeft: '4px' }}>Jacobs University Gym</div>
        </Menu.Item>
        {menuItems
          .filter(menuItem => menuItem.rolesAllowed.includes(user.role))
          .map(menuItem => (
            <Menu.Item onClick={menuItem.onClick} key={menuItem.name}>
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
      </Menu>
    </>
  )
}

export default AppBar
