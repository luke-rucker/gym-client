import React from 'react'
import axios from 'axios'
import { useAuth } from './auth-context'

const FetchContext = React.createContext()
const { Provider } = FetchContext

function FetchProvider({ children }) {
    const { getAccessToken, logout } = useAuth()

    const authAxios = axios.create({
        baseURL: '/api',
    })

    authAxios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${getAccessToken()}`
            return config
        },
        error => Promise.reject(error)
    )

    authAxios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                logout()
            }
            return Promise.reject(error)
        }
    )

    return (
        <Provider
            value={{
                authAxios,
            }}
        >
            {children}
        </Provider>
    )
}

function useFetch() {
    const context = React.useContext(FetchContext)
    if (context === undefined) {
        throw new Error('useFetch must be used within a FetchProvider')
    }
    return context
}

export { FetchProvider, useFetch }
