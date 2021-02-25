import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { publicAxios } from '../util/axios'

const AuthContext = React.createContext()
const { Provider } = AuthContext

function AuthProvider({ children }) {
    const history = useHistory()
    const queryClient = useQueryClient()

    const [expiresAt, setExpiresAt] = React.useState(
        parseInt(localStorage.getItem('expiresAt'))
    )

    function setAuthInfo({ expiresAt }) {
        localStorage.setItem('expiresAt', expiresAt)
        setExpiresAt(expiresAt)
    }

    async function logout() {
        localStorage.removeItem('expiresAt')
        setExpiresAt(null)

        await publicAxios.delete('/auth/logout')
        queryClient.clear()
        history.push('/login')
    }

    function isAuthenticated() {
        if (!expiresAt) {
            return false
        }
        return new Date() < new Date(expiresAt)
    }

    return (
        <Provider
            value={{
                setAuthState: authInfo => setAuthInfo(authInfo),
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </Provider>
    )
}

function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
