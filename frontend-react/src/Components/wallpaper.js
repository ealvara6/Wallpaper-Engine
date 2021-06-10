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
    },
    gridListTileBar: {
        textAlign: 'center',
    }
}));


export default function Wallpaper(props) {
    const classes = useStyles();
    const [wallpapers, setWallpapers] = useState([...props.wallpaper]);
    const [imageProps, setImageProps] = useState({cellHeight: null, col: null});
    const [favorites, setFavorites] = useState([]);
    //calculates the height of the gridlist based on the number of images
    const gridHeight = wallpapers.length * 600;


    useEffect(() => {
        handleViewPort();
        window.addEventListener('resize', handleViewPort);
        if(localStorage.getItem('loggedIn')) {
            const data = {
                headers: {
                    token: localStorage.getItem('token')
                }
            }
            axios.get('/api/user/favorite', data)
            .then(res => {
                setFavorites(res.data);
            })
            .catch(err => {
                console.log(err.response.data);
            })
        }

        return function cleanup(){
            window.removeEventListener('resize', handleViewPort);        
        }
    },[])

    const handleViewPort = () => {
        if(window.innerWidth < 600)
            setImageProps({cellHeight: 300, col: 3});
        else
            setImageProps({cellHeight: 600, col: 6});
    }



    const handleFavorite = (wallpaper) => {

        if(!localStorage.getItem('loggedIn'))
            return alert('Please Login or Sign Up to use this feature')

        const data = {
            favorites: wallpaper._id
        };
        const headers = {
            token: localStorage.getItem('token'),
        }

        if(favorites.find(id => id === wallpaper._id) === undefined){
            //handles a favorite in the backend
            axios.put('/api/user/favorite', data, { headers })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.response.data);
            })
            setFavorites([...favorites, wallpaper._id])
        }
        else{
            //handles an unfavorite in the backend
            axios.put('/api/user/unfavorite', data, { headers })
            .then(res => {
            })
            .catch(err => {
                console.log(err.response.data);
            })

            //handles an unfavorite in the frontend
            setFavorites(favorites.filter(id => id !== wallpaper._id))
        }
    }


    const handleDownload = (imagePath) => {
        axios.get(`/api/wallpaper/download/${imagePath}`)
        .then( res => {
            window.open(`https://wallpaperengine.live/api/wallpaper/download/${imagePath}`);
        })
        .catch(err => {
            console.log(err.response.data);
        })
    }



    //Creates a grid of images to display
    const createList = () => {
        return( <GridList cellHeight={imageProps.cellHeight} className={classes.gridList} height={gridHeight} cols={imageProps.col}>
            {console.log(favorites)}
            {wallpapers.map((wallpaper, index) => (
                    <GridListTile key={wallpaper.image} cols={3}>
                        <img src={`Images/${wallpaper.image}`} alt={wallpaper.name} />
                        <GridListTileBar
                            className={classes.gridListTileBar}
                            title={wallpaper.name}
                            actionIcon={
                                <>
                                    <IconButton className={classes.icon} onClick={() => handleFavorite(wallpaper)}>
                                        {/* checks to see if image has already been favorited then displays the correct icon */}
                                        {(favorites.find(id => id === wallpaper._id) != undefined) ? <HeartIcon /> : <HeartBorder /> }
                                    </IconButton>
                                    <IconButton className={classes.icon} onClick={() => handleDownload(wallpaper.image)}>
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