import { React, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        m: 1,
        padding: theme.spacing(1),
        backgroundColor: theme.palette.success.light,
        color: theme.palette.error.contrastText,
        textAlign: 'center',
    }
}))

export default function Success(props){
    const classes = useStyles();
    const message = props.message;
    const [isLoading, setIsLoading] = useState(true);

    const showSuccess = () => {
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
            {isLoading ? showLoading() : showSuccess()}
        </>
    )
}