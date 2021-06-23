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
import CreateSignUpModal from './signUpModal';
import WallpaperModal from '../Pages/wallpaperPage';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexwrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        marginTop: theme.spacing(3),
    },
    gridList: {
        height: 'auto',
        width: '1500px',
    },
    tile: {
        paddingTop: theme.spacing(1),
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
    const [imageProps, setImageProps] = useState({ cellHeight: null, col: null });
    const [favorites, setFavorites] = useState([]);
    const [mobileView, setMobileView] = useState(false);
    // const [showModal, setShowModal] = useState([]);


    useEffect(() => {
        handleViewPort();
        window.addEventListener('resize', handleViewPort);
        if (localStorage.getItem('loggedIn')) {
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

        return function cleanup() {
            window.removeEventListener('resize', handleViewPort);
        }
    }, [])

    const handleViewPort = () => {
        if (window.innerWidth < 600) {
            setMobileView(true);
            setImageProps({ cellHeight: 300, col: 1 });
        }
        else {
            setImageProps({ cellHeight: 600, col: 3 });
            setMobileView(false);
        }
    }



    const handleFavorite = (wallpaper) => {

        // if (!localStorage.getItem('loggedIn'))
        //     return alert('Please Login or Sign Up to use this feature')

        const data = {
            favorites: wallpaper._id
        };
        const headers = {
            token: localStorage.getItem('token'),
        }

        if (favorites.find(id => id === wallpaper._id) === undefined) {
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
        else {
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
            .then(res => {
                window.open(`https://wallpaperengine.live/api/wallpaper/download/${imagePath}`);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    }

    // const handleClose = (wallpaperID) => {
    //     setShowModal([]);
    // }


    //Creates a grid of images to display
    const createList = () => {
        return (<GridList cellHeight={imageProps.cellHeight} className={classes.gridList} cols={imageProps.col}>
            {wallpapers.map((wallpaper) => (
                // changes col and row depending on viewport
                <GridListTile
                    key={wallpaper.image}
                    className={classes.tile}
                    cols={mobileView ? 1 : wallpaper.cols || 1}
                    rows={mobileView ? 1 : wallpaper.rows || 1}>
                    <img src={`/Images/${wallpaper.image}`} alt={wallpaper.name} />
                    <GridListTileBar
                        className={classes.gridListTileBar}
                        title={wallpaper.name}
                        actionIcon={
                            <>
                            {localStorage.getItem('loggedIn') ?
                                <IconButton className={classes.icon} onClick={() => handleFavorite(wallpaper)}>
                                    {/* checks to see if image has already been favorited then displays the correct icon */}
                                    {favorites.find(id => id === wallpaper._id) ? <HeartIcon /> : <HeartBorder />}
                                </IconButton> : null }
                                {/* // <IconButton className={classes.icon} onClick={() => setShowModal([...showModal, wallpaper._id])}>
                                // <HeartBorder classsName={classes.icon} /> 
                                // </IconButton>}

                                // <IconButton className={classes.icon} onClick={() => handleDownload(wallpaper.image)}>
                                //     <GetAppIcon />
                                // </IconButton>
                                // {showModal.find(id => id === wallpaper._id) ? <CreateSignUpModal open={true} onClose={() => handleClose(wallpaper._id)} /> : null} */}
                            </>
                        }
                    />
                </GridListTile>
            ))}
        </GridList>)
    }



    return (
        <div className={classes.root}>
            {createList()}
        </div>
    )
}