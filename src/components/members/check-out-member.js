import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { Button, Icon } from 'semantic-ui-react'
import { useAxios } from '../../context/axios-context'
import ErrorModal from '../error-modal'

function CheckOutMember({ sessionId }) {
  const queryClient = useQueryClient()
  const axios = useAxios()

  const [errorMessage, setErrorMessage] = React.useState('')

  const mutation = useMutation(
    () => axios.patch(`/sessions/${sessionId}/finish`),
    {
      onError: error => {
        setErrorMessage(
          error.response?.data?.message || 'Could not check member out.'
        )
        setTimeout(() => setErrorMessage(''), 5000)
      },
      onSuccess: () =>
        queryClient.invalidateQueries(['sessions', { status: 'active' }]),
    }
  )

  return (
    <>
      <Button
        icon
        loading={mutation.isLoading}
        onClick={() => mutation.mutate()}
      >
        <Icon name="delete" />
      </Button>
      <ErrorModal
        open={Boolean(errorMessage)}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </>
  )
}

export default CheckOutMember
