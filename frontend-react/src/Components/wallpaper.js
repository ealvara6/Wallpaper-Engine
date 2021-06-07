import { React, useState, useEffect } from 'react';
import axios from 'axios';
import HeartBorder from '@material-ui/icons/FavoriteBorderOutlined';
import HeartIcon from '@material-ui/icons/Favorite';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexwrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 1500,
    },
    icon: {
        color: 'white',
    }
}));


export default function Wallpaper(props) {
    const classes = useStyles();
    const [wallpapers, setWallpapers] = useState([...props.wallpaper]);
    //calculates the height of the gridlist based on the number of images
    const gridHeight = wallpapers.length * 600;




    const handleFavorite = (wallpaper, index) => {

        if(!localStorage.getItem('loggedIn'))
            return alert('Please Login or Sign Up to use this feature')

        
        console.log(localStorage.getItem('token'));
        const data = {
            favorites: wallpaper._id
        };
        const headers = {
            token: localStorage.getItem('token'),
        }
        if(!wallpaper.favorite){
            //handles a favorite in the backend
            axios.put('/api/user/favorite', data, { headers })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data);
            })

            //handles a favorite in the frontend
            const newWallpapers = [...wallpapers];
            wallpaper.favorite = true;
            newWallpapers[index] = wallpaper;
            setWallpapers(newWallpapers);
        }
        else{
            //handles an unfavorite in the backend
            axios.put('/api/user/unfavorite', data, { headers })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data);
            })

            //handles an unfavorite in the frontend
            const newWallpapers = [...wallpapers];
            wallpaper.favorite = false;
            newWallpapers[index] = wallpaper;
            setWallpapers(newWallpapers);
        }
    }


    //Creates a grid of images to display
    const createList = () => {
        return( <GridList cellHeight={600} className={classes.gridList} height={gridHeight} cols={6}>
            {wallpapers.map((wallpaper, index) => (
                    <GridListTile key={wallpaper.image} cols={3}>
                        <img src={wallpaper.image} alt={wallpaper.name} />
                        <GridListTileBar
                            title={wallpaper.name}
                            actionIcon={
                                <>
                                    <IconButton className={classes.icon} onClick={() => handleFavorite(wallpaper, index)}>
                                        {wallpaper.favorite ? <HeartIcon /> : <HeartBorder /> }
                                    </IconButton>
                                    <IconButton className={classes.icon}>
                                        <GetAppIcon />
                                    </IconButton>
                                </>
                            }
                        >
                        </GridListTileBar>
                    </GridListTile>
        ))}
        </GridList>)
    }


    return(
        <div className={classes.root}>
        {createList()}
        </div>
    )
}