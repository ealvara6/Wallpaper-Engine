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


export default function LoginModal(props) {
    const [open, setOpen] = useState(props.open);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessages, setErrorMessages] =  useState([]);
    const [errorFields, setErrorFields] = useState({});
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
        setShowError(false);
    }
    function handleClose() {
        setOpen(false);
        setShowError(false);
    }

    function handleSubmit() {
        var loginInfo = {
            email: email,
            password: password
        }
        axios.post(`http://localhost:5000/api/user/login`, loginInfo)
        .then(res => {
            setOpen(false);
            localStorage.setItem('loggedIn', res.data.LoggedIn);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(localStorage.getItem('loggedIn'));
            setToken(localStorage.getItem('token'));
            window.location.href = "http://localhost:3000/home";
        })
        .catch((err) => {
            if(err.response.data.errors.length > 1){
                var errorMessages = err.response.data.errors.map(error => error.msg).join(' ');
                var errorFields = err.response.data.errors.map(error => error.param).join(' ');
            }
            else{
                var errorMessages = err.response.data.errors.msg;
                var errorFields = err.response.data.errors.param;
            }
            setErrorMessages(errorMessages);
            setErrorFields(errorFields);
            setShowError(true);
        }, [])

    }

    return(
        <Box>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Login
            </Button> 
            <Dialog open={open} onClose={handleClose} aria-labelledby="for-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {showError ? <Error errors={errorMessages} /> : null}
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