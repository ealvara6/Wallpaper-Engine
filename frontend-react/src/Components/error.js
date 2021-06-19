import { React, useState } from 'react';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        m: 1,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
        textAlign: 'center',
        
    }
}))

export default function Error(props){
    const classes = useStyles();
    const message = props.message;
    const [isLoading, setIsLoading] = useState(true);

    const showError = () => {
        return <Box border={1} borderRadius={16} className={classes.root}>
            <Box>{message}</Box>
        </Box>
    }

    

    //gives feedback that users has re-submitted form
    const showLoading = () => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return <LinearProgress />
    }

    return(
        <>
            {isLoading ? showLoading() : showError()}
        </>
    )
}