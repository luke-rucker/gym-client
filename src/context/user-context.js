import React from 'react'
import { useQuery } from 'react-query'
import { useAxios } from './axios-context'
import { useAuth } from './auth-context'
import { FullPageSpinner, FullPageErrorFallback } from '../components'

const UserContext = React.createContext()
const { Provider } = UserContext

function UserProvider({ children }) {
    const auth = useAuth()
    const axios = useAxios()

    const { isLoading, error, data } = useQuery(
        'me',
        () => axios.get('/users/me').then(response => response.data),
        {
            enabled: auth.isAuthenticated(),
        }
    )

    if (isLoading) {
        return <FullPageSpinner />
    }

    if (error) {
        return <FullPageErrorFallback error={error} />
    }

    function isAdmin() {
        return data.role === 'ADMIN'
    }

    return <Provider value={{ ...data, isAdmin }}>{children}</Provider>
}

function useUser() {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export { UserProvider, useUser }
