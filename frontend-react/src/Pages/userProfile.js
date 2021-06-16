import { React, useState, useEffect } from 'react';
import DeleteUser from '../Components/deleteUser';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Success from '../Components/success';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 100,
    },
    grid: {
        padding: theme.spacing(2),
    },
    paper: {
        textAlign: 'left',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    header: {
        marginBottom: theme.spacing(1),
    },
    saveButton: {
        justifyContent: 'flex-end',
    },
    deleteButton: {
        alignSelf: 'flex-start',
    },
    title: {
        marginLeft: theme.spacing(3),
    }
}))




export function UserProfile(props) {
    const [userData, setUserData] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const classes = useStyles();


    useEffect(() => {
        const data = {
            headers: {
                token: localStorage.getItem('token')
            }
        }
        axios.get(`/api/user/profile`, data)
        .then(res => {
            setUserData(res.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.response);
        });
    },[])


    const handleChange = (e, id) => {
        console.log(e.target.value);
        switch(id) {
            case 'first_name':
                setUserData({...userData, first_name: e.target.value});
                console.log(userData);
                break;
            case 'last_name':
                setUserData({...userData, last_name: e.target.value});
                break;
            case 'email':
                setUserData({...userData, email: e.target.value});
                break;
            case 'password':
                setUserData({...userData, password: e.target.value});
                break;
        }
    }

    const handleErrors = (err) => {
        Object.keys(err.errors).map((key, index) => {
            setErrors(errors => [...errors, err.errors[key]]);
        })
    }

    const showErrorMessage = (field) => {
        //displays error message based on the error
        var index = errors.findIndex(x => x.path === field);
        return <TextField error id={field + "_error"} defaultValue={userData[field]} helperText={errors[index].message} onChange={(e) => handleChange(e, field)} />;
    }

    const handleSubmit = () => {
        setErrors([]);
        const headerData = {
            headers: {
                token: localStorage.getItem('token'),
            },
        }
        const data = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password,
        }
        axios.put('/api/user/profile', data, headerData)
        .then(res => {
            if(res.data.errors !== undefined){
                handleErrors(res.data);
            }
            else
                setSuccess(true);
        })
        .catch(err => {
            console.log(err);
        });
}


    return(
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>Account Profile</Typography>
                {success ? <Success message='Profile Successfully Updated!' /> : null}
                {isLoading ? <Box textAlign='center'> <CircularProgress /> </Box> : 
                <Grid container className={classes.grid} spacing={2}>
                    <Grid item xs={12} md={6}>
                        {/* Error.find is used to check if an error occured within the given field */}
                        <Paper className={classes.paper}>
                            {errors.find(({ path }) => path === "first_name") ? 
                                showErrorMessage("first_name")
                            :
                                <TextField key={isLoading ? 'notLoadedYet' : 'loaded'} id="first-name" label='First Name' defaultValue={userData.first_name} onChange={(e) => handleChange(e, 'first_name')} />
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            {errors.find(({ path }) => path === "last_name") ? 
                                showErrorMessage("last_name")
                            :
                                <TextField key={isLoading ? 'notLoadedYet' : 'loaded'} id="last-name" label='Last Name' defaultValue={userData.last_name} onChange={(e) => handleChange(e, 'last_name')} />
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            {errors.find(({ path }) => path === "email") ?
                                showErrorMessage("email")
                            :
                                <TextField id="email" key={isLoading ? 'notLoadedYet' : 'loaded'} type='email' label='Email' defaultValue={userData.email} fullWidth onChange={(e) => handleChange(e, 'email')} />
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            {console.log(userData.password)}
                            {errors.find(({ path }) => path === "password") ? 
                                showErrorMessage("password")
                            :
                                <TextField id="password" key={isLoading ? 'notLoadedYet' : 'loaded'} inputProps={{autocomplete: 'new-password'}} type='password' fullWidth label='New Password' onChange={(e) => handleChange(e, 'password')} />
                            }
                        </Paper>
                    </Grid>
                </Grid>
                }
                <Grid container>
                    <Grid container xs={6} className={classes.deleteButton}>
                        <DeleteUser />
                    </Grid>
                    <Grid container xs={6} className={classes.saveButton}>
                        <Button variant='contained' color='primary' className={classes.button} onClick={handleSubmit}>Save Changes</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}