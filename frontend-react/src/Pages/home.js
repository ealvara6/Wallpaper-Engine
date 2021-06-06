import { React, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Wallpaper from '../Components/wallpaper';
import axios from 'axios';
// import cat from '../Images/cat.jpg';

export function Home(props){
    const [wallpapers, setWallpapers] = useState({
        isLoading: true,
        data: null,
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/wallpapers')
        .then((res) => {
            setWallpapers({isLoading: false, data: res.data, });
            console.log(res.data[0])
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
