import React from 'react';
import Box from '@material-ui/core/Box';
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

export default function Error(props) {
    const classes = useStyles();

    return(
        <Box border={1} borderRadius={16} className={classes.root}>
            <Box>{props.errors}</Box>
        </Box>
    )
}