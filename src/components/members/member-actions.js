import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { ErrorModal } from '../index'
import { useAxios } from '../../context/axios-context'
import { useUser } from '../../context/user-context'

function MemberActions({ memberId }) {
    const user = useUser()

    const actions = [
        {
            render: () => <EditMember key="edit" memberId={memberId} />,
            rolesAllowed: ['USER', 'ADMIN'],
        },
        {
            render: () => <DeleteMember key="delete" memberId={memberId} />,
            rolesAllowed: ['ADMIN'],
        },
    ]

    return (
        <>
            {actions
                .filter(action => action.rolesAllowed.includes(user.role))
                .map(action => action.render())}
        </>
    )
}

function EditMember({ memberId }) {
    return (
        <Button icon>
            <Icon name="edit" />
        </Button>
    )
}

function DeleteMember({ memberId }) {
    const [confirmOpen, setConfirmOpen] = React.useState(false)
    const [errorOpen, setErrorOpen] = React.useState(false)

    const axios = useAxios()
    const queryClient = useQueryClient()

    const mutation = useMutation(() => axios.delete(`/members/${memberId}`), {
        onError: () => {
            setConfirmOpen(false)
            setErrorOpen(true)
            setTimeout(() => setErrorOpen(false), 5000)
        },
        onSuccess: () => {
            setConfirmOpen(false)
            queryClient.invalidateQueries('members')
        },
    })

    return (
        <>
            <Button icon color="red" onClick={() => setConfirmOpen(true)}>
                <Icon name="trash" />
            </Button>
            <Modal
                size="mini"
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <Modal.Header>Delete Member</Modal.Header>
                <Modal.Content>
                    <p>
                        Are you sure you want to delete this member? This action
                        cannot be undone.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setConfirmOpen(false)}>
                        <Icon name="remove" /> No
                    </Button>
                    <Button
                        positive
                        loading={mutation.isLoading}
                        onClick={() => mutation.mutate()}
                    >
                        <Icon name="checkmark" /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            {mutation.error && (
                <ErrorModal
                    open={errorOpen}
                    onClose={() => setErrorOpen(false)}
                    message="Could not delete member."
                />
            )}
        </>
    )
}

export default MemberActions
