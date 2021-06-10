import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100,
        borderStyle: 'solid'
    },
    grid: {
        padding: theme.spacing(2),
    },
    paper: {
        textAlign: 'left',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: 70,
    }
}))




export function UserProfile(props) {
    const [user, setUser] = useState({loading: true, data: null});
    const classes = useStyles();


    useEffect(() => {
        const data = {
            headers: {
                token: localStorage.getItem('token')
            }
        }
        axios.get(`/api/user/profile`, data)
        .then(res => {
            console.log(res.data);
            setUser({loading: false, data: res.data});
        })
        .catch((err) => {
            console.log(err.response);
        });
    },[])



    return(
        <Container className={classes.root}>
            {user.loading ? <Box textAlign='center'> <CircularProgress /> </Box> : 
            <Grid container className={classes.grid} spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>First Name: {user.data.first_name}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Last Name: {user.data.last_name}</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>Email: {user.data.email}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>New Password: </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Re-Enter New Password: </Paper>
                </Grid>
            </Grid>
            }
        </Container>
    )
}