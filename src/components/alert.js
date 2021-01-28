import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

function Alert({ children, ...props }) {
    const { showTitle, severity } = props
    return (
        <MuiAlert elevation={6} variant="filled" {...props}>
            {showTitle && (
                <AlertTitle>
                    <strong>
                        {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </strong>
                </AlertTitle>
            )}
            {children}
        </MuiAlert>
    )
}

export default Alert
