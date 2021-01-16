import React from 'react'
import ReactDOM from 'react-dom'
import AppProviders from './context/app-providers'
import App from './app'

ReactDOM.render(
    <AppProviders>
        <App />
    </AppProviders>,
    document.getElementById('root')
)
