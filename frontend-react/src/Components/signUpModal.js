import { React, useState } from 'react';
import axios from 'axios';
import Error from './error';
import Success from './success';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


export default function CreateSignUpModal(props) {
    const [open, setOpen] = useState(props.open);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({message: null, isError: false});
    const [success, setSuccess] = useState({message: null, isSuccess: false});
    
    //functions to handle form changes
    function handleFirstName(e) {
        setFirstName(e.target.value);
    }
    function handleLastName(e) {
        setLastName(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }


    // //functions to set modal show

    function handleClose() {
        // resets error and succes components on close
        setErrors({message: null, isError: false});
        setSuccess({message: null, isSuccess: false});
        setOpen(false);
    }


    function handleSubmit() {
        // Resets successs and error components
        setErrors({message: null, isError: false});
        setSuccess({message: null, isSuccess: false});
        var data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        }
        axios.post('/api/users', data)
        .then(res => {
            setSuccess({message: res.data.message, isSuccess: true});
        })
        .catch((err) => {
            setErrors({message: err.response.data.messages, isError: true});
        });
    }

    return(
        <Box>
            <Dialog open={open} onClose={props.onClose} aria-labelledby="for-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                {/* form data */}
                <form>
                    <DialogContent>
                        <DialogContentText>
                            Create an Account
                        </DialogContentText>
                            {success.isSuccess ? <Success message={success.message} /> : null}
                            {errors.isError ? <Error message={errors.message} /> : null}
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        autoFocus
                                        margin="dense"
                                        id="first_name"
                                        label="First Name"
                                        type="text"
                                        value={firstName}
                                        onChange={handleFirstName}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        margin="dense"
                                        id="last_name"
                                        label="Last Name"
                                        type="text"
                                        value={lastName}
                                        onChange={handleLastName}
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                required
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={handleEmail}
                            />
                            <TextField
                                required
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={handlePassword}
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Sign Up
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}