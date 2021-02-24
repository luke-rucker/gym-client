import React from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'

function NewDropdown() {
    const history = useHistory()

    const trigger = (
        <>
            <Icon name="plus" />
            <span>New</span>
        </>
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
