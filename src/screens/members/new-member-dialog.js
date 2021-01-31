import React from 'react'
import {
    Button,
    Grid,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'

function NewMemberDialog({ open, setOpen, mutation }) {
    function handleClose() {
        setOpen(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const { firstName, lastName, email } = event.target.elements
        mutation.mutate({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
        })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">New Member</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent style={{ paddingTop: 0 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default NewMemberDialog
