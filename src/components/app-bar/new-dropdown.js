import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

function NewDropdown() {
  const history = useHistory()

  const trigger = (
    <span>
      <Icon name="plus" />
      New
    </span>
  )

  return (
    <Dropdown pointing trigger={trigger}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => history.push('/members/new')}>
          New member
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default NewDropdown
