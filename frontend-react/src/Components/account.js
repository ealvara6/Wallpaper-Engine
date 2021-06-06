import { React, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Account(props) {
    const[anchorEl, setAnchorEl] = useState(null);
    const[isLoggedIn, setIsLoggedIn] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "http://localhost:3000/home";
    }

    const handleAccount = () => {
        window.location.href = 'http://localhost:3000/user/profile';
    }

    const handleFavorites = () => {
        window.location.href = 'http://localhost:3000/user/favorites';
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
                <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}