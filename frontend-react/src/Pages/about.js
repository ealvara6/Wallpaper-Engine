import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'black',
        padding: 0,
    },
    grid: {
        backgroundColor: 'white',
    },
    info: {
        backgroundColor: 'red',
        textAlign: 'left',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    block: {
        backgroundColor: 'blue',
        padding: theme.spacing(2),
        margin: 50,

    }
}));

export function About(props){
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <Grid container className={classes.grid} spacing={0}>
                <Grid className={classes.photo} item xs={12} sm={5}>
                    <img src="Images/headshots/headshot.png" alt="" />
                </Grid>
                <Grid container className={classes.info} item xs={12} sm={7}>
                    <Grid className={classes.block} xs={12}>test</Grid>
                    <Grid className={classes.block} xs={12}>test</Grid>
                </Grid>
            </Grid>
        </Container>
    )
}