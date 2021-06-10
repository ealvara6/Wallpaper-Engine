import { React, useState, useEffect } from 'react';
import Wallpaper from '../Components/wallpaper';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export function Home(props){
    const [wallpapers, setWallpapers] = useState({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        axios.get(`/api/wallpapers`)
        .then((res) => {
            setWallpapers({isLoading: false, data: res.data, });
        });

    },[])

    return(
        <Box textAlign='center'>
            {wallpapers.isLoading ? <CircularProgress /> : 
                <Wallpaper wallpaper={wallpapers.data} />
            }
        </Box>
    );
}
