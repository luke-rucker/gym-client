import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

function Alert({ children, ...props }) {
    const { hideTitle, ...rest } = props
    return (
        <MuiAlert elevation={6} variant="filled" {...rest}>
            {!hideTitle && (
                <AlertTitle>
                    <strong>
                        {props.severity.charAt(0).toUpperCase() +
                            props.severity.slice(1)}
                    </strong>
                </AlertTitle>
            )}
            {children}
        </MuiAlert>
    )
}

export default Alert
