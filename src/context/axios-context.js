import React from 'react'
import axios from 'axios'
import { useAuth } from './auth-context'

const AxiosContext = React.createContext()
const { Provider } = AxiosContext

function AxiosProvider({ children }) {
    const auth = useAuth()

    const authAxios = axios.create({
        baseURL: '/api',
    })

    authAxios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                auth.logout()
            }
            return Promise.reject(error)
        }
    )

    return <Provider value={authAxios}>{children}</Provider>
}

function useAxios() {
    const context = React.useContext(AxiosContext)
    if (context === undefined) {
        throw new Error('useAxios must be used within a AxiosProvider')
    }
    return context
}

export { AxiosProvider, useAxios }
