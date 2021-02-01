import React, { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()
const { Provider } = AuthContext

function AuthProvider({ children }) {
    const history = useHistory()

    const token = localStorage.getItem('token')
    const userInfo = localStorage.getItem('userInfo')
    const expiresAt = localStorage.getItem('expiresAt')

    const [authState, setAuthState] = useState({
        token,
        userInfo: userInfo ? JSON.parse(userInfo) : {},
        expiresAt: parseInt(expiresAt),
    })

    function setAuthInfo({ token, userInfo, expiresAt }) {
        localStorage.setItem('token', token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        localStorage.setItem('expiresAt', expiresAt)

        setAuthState({
            token,
            userInfo,
            expiresAt,
        })
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('expiresAt')
        setAuthState({})
        history.push('/login')
    }

    function isAuthenticated() {
        if (!authState.expiresAt) {
            return false
        }
        return new Date() < new Date(authState.expiresAt)
    }

    function isAdmin() {
        return authState.userInfo.role === 'ADMIN'
    }

    function getAccessToken() {
        return localStorage.getItem('token')
    }

    return (
        <Provider
            value={{
                authState,
                setAuthState: authInfo => setAuthInfo(authInfo),
                logout,
                isAuthenticated,
                isAdmin,
                getAccessToken,
            }}
        >
            {children}
        </Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export { AuthProvider, useAuth }
