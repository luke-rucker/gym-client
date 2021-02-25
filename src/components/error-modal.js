import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'

function ErrorModal({ open, onClose, message }) {
    return (
        <Modal size="mini" open={open} onClose={onClose}>
            <Modal.Header>
                <Icon name="attention" />
                Error
            </Modal.Header>
            <Modal.Content>
                <p>{message}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={onClose}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ErrorModal
