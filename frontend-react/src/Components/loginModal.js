import { React, useEffect, useState } from 'react';
import Error from './error';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { isError } from 'lodash';


const useStyles = makeStyles((theme) => ({
    button: {
        marginRight: theme.spacing(1),
    }
}))


export default function LoginModal(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(props.open);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({message: null, isError: false});
    const [showError, setShowError] = useState(false);
    const [errorMessages, setErrorMessages] =  useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [token, setToken] = useState(null);

    //handle form change
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }



    //handle modal show
    function handleOpen() {
        setOpen(true);
        setErrors({message: null, isError: false});
    }
    function handleClose() {
        setOpen(false);
        setErrors({message: null, isError: false});
    }

    function handleSubmit() {
        // resets error component
        setErrors({message: null, isError: false});

        var loginInfo = {
            email: email,
            password: password,
        };
        axios.post(`/api/user/login`, loginInfo)
        .then(res => {
            setOpen(false);
            localStorage.setItem('loggedIn', res.data.LoggedIn);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(localStorage.getItem('loggedIn'));
            setToken(localStorage.getItem('token'));
            window.location.href = "/";
        })
        .catch((err) => {
            if(err.response.data.errors.length > 1){
                var errorMessages = err.response.data.errors.map(error => error.msg).join(' ');
            }
            else{
                var errorMessages = err.response.data.errors.msg;
            }
            setErrors({message: errorMessages, isError: true});
        }, [])

    }

    return(
        <Box>
            <Button className={classes.button} variant="outlined" color="primary" onClick={handleOpen}>
                Login
            </Button> 
            <Dialog open={open} onClose={handleClose} aria-labelledby="for-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errors.isError ? <Error message={errors.message} /> : null}
                        Please login to your account.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleEmail}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handlePassword}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}