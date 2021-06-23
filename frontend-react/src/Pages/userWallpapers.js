import { React, useState, useEffect } from 'react';
import Wallpaper from '../Components/wallpaper';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function UserWallpapers () {
    const [isLoading, setIsLoading] = useState(true);
    const [wallpapers, setWallpapers] = useState({isLoading: true, data: null})

    useEffect(() => {
        const headerData = {
            headers: {
                token: localStorage.getItem('token'),
            },
        };
        axios.get('/api/user/wallpapers', headerData)
        .then(res => {
            setWallpapers({isLoading: false, data: [res.data]});
        })
        .catch(err => {
            console.log(err);
        })
    },[]);
    
    return(
        <Box display="flex" justifyContent="center">
            {wallpapers.isLoading ? <CircularProgress /> : <Wallpaper wallpaper={wallpapers.data} />}
        </Box>
    )
}