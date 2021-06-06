import React from 'react';
import Box from '@material-ui/core/Box';


export default function Success(props){
    const message = props.message
    const defaultStyle = {
        bgcolor: 'success.main',
        color: 'white',
        m: 1,
        border: 1,
        padding: 1,
    }
    return(
        <Box border={1} borderColor='success.main' borderRadius={16} {...defaultStyle}>
            <Box>{message}</Box>
        </Box>
    )
}