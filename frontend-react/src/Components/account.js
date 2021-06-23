import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Account(props) {
    const[anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }

    const handleAccount = () => {
        window.location.href = '/user/profile';
    }

    const handleWallpapers = () => {
        window.location.href = "/user/Wallpapers";
    }

    const handleFavorites = () => {
        window.location.href = '/user/favorites';
    }
    
    const handleUpload = () => {
        window.location.href = '/wallpaper/upload';
    }

    return(
        <div>
            <Button onClick={handleClick}>
                Account
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAccount}>My Account</MenuItem>
                <MenuItem onClick={handleWallpapers}>My Wallpapers</MenuItem>
                <MenuItem onClick={handleUpload}>Upload Wallpaper</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}