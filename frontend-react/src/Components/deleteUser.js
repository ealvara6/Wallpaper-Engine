import {React, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    deleteButton: {
        color: theme.palette.error.main,
    },
}));


export default function DeleteUser(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteConfirmation = () => {
        setOpen(true);
    }

    const handleDelete = () => {
        const data = {
            headers: {
                token: localStorage.getItem('token'),
            },
        };

        axios.delete('/api/user/profile', data)
        .then(() =>{
                localStorage.clear();
                window.location.href = "/";
            }
        )
        .catch((err) => {
            console.log(err.response)
        });
    }

    return(
        <Typography>
            <Button onClick={handleDeleteConfirmation} className={classes.deleteButton}>
                Delete Account
            </Button>
            <Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="account-deletion-title">Are you sure you want to delete you account?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="account-deletion-description">
                            All your profile data, favorites, and wallpapers will be deleted from our database permanently.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} className={classes.deleteButton}>
                            Delete Account
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Typography>
    )
}