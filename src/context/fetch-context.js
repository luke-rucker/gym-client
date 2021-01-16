import React, { createContext, useContext } from 'react'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { AuthContext } from './auth-context'

const FetchContext = createContext()
const { Provider } = FetchContext

function FetchProvider({ children }) {
    const authContext = useContext(AuthContext)

    const authAxios = axios.create({
        baseURL: '/api',
    })

    authAxios.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    createAuthRefreshInterceptor(authAxios, authContext.getNewTokenForRequest, {
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

export { FetchContext, FetchProvider }
