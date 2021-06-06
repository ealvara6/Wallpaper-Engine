import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Account from './account';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import LoginModal from './loginModal';
import SignUpModal from './signUpModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'white'
    },
}))

export function RenderNavbar() {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn)
    },[])

    const handleLogin = () => {
        if(showLoginModal)
            return setShowLoginModal(false);
        return setShowLoginModal(true);
    }

    const handleSignUp = () => {
        if(showSignUpModal)
            return setShowSignUpModal(false);
        return setShowSignUpModal(true);
    }

    return(
        <Box>
            <Navbar className={classes.root}>
                <Navbar.Brand href="home">Wallpaper Engine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ButtonGroup variant="text" color="primary">
                            <Button><Nav.Link href="/">Home</Nav.Link></Button>
                            <Button><Nav.Link href="/about">About</Nav.Link></Button>
                        </ButtonGroup>
                    </Nav>
                    <Nav className="ml-auto">
                        {isLoggedIn ?
                            <Account />
                            :
                            <>
                                <LoginModal />
                                <SignUpModal />
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Box>
    )
}