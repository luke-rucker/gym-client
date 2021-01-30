import React, { createContext } from 'react'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { useAuth } from './auth-context'

const FetchContext = createContext()
const { Provider } = FetchContext

function FetchProvider({ children }) {
    const { getAccessToken, getNewTokenForRequest } = useAuth()

    const authAxios = axios.create({
        baseURL: '/api',
    })

    authAxios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${getAccessToken()}`
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    createAuthRefreshInterceptor(authAxios, getNewTokenForRequest, {
        skipWhileRefreshing: false,
    })

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
    const context = useContext(FetchContext)
    if (context === undefined) {
        throw new Error('useFetch must be used within a FetchProvider')
    }
    return context
}

export { FetchProvider, useFetch }
