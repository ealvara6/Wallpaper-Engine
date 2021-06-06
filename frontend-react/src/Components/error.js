import React from 'react';
import Box from '@material-ui/core/Box';


export default function Error(props) {
    const defaultStyle = {
        bgcolor: '#ff8a80',
        color: 'white',
        m: 1,
        border: 1,
        padding: 1,
    }
    return(
        <Box border={1} borderColor='#e53935' borderRadius={16} {...defaultStyle}>
            <Box>{props.errors}</Box>
        </Box>
    )
}