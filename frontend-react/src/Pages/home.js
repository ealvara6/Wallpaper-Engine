import { React, useState, useEffect } from 'react';
import Wallpaper from '../Components/wallpaper';
import axios from 'axios';

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
        <>
            {wallpapers.isLoading ? <h1>Loading...</h1> : 
                <Wallpaper wallpaper={wallpapers.data} />
            }
        </>
    );
}
