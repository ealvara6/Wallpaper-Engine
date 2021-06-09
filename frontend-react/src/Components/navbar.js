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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'white'
    },
    list: {
        width: '100%',
        maxWidth: 360,
        justifyItems: 'center',
    },
    listItem: {
        textAlign: 'center',
        justifyContent: 'center',
    }
}))

export function RenderNavbar() {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedIn);

        //change navbar bassed on viewport
        updateViewPort();
        window.addEventListener('resize', updateViewPort);

        return function cleanup() {
            window.removeEventListener('resize', updateViewPort);
        }
    },[isPhone])

    //changes state of viewport
    const updateViewPort = () => {
        var phone = window.innerWidth < 600;
        setIsPhone(phone);
    }
    
    //handles which url to go when button is clicked
    const handleButton = (e) => {
        switch(e) {
            case 'home':
                window.location.href = '/';
                break;
            case 'about':
                window.location.href = '/about';
                break;
        }
    }


    const desktopNavbar = () => {
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

    const mobileNavbar = () => {
        return(
            <Accordion>
                <AccordionSummary
                    expandIcon={<MenuIcon />}
                >
                    <Typography>Wallpaper Engine</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component='nav' className={classes.list}>
                        <ListItem button className={classes.listItem} onClick={() => handleButton('home')}>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <Divider />
                        <ListItem button className={classes.listItem} divider onClick={() => handleButton('about')}>
                            <ListItemText primary="About" />
                        </ListItem>

                        {isLoggedIn ? <Account /> :
                        <>
                            <ListItem button className={classes.listItem}>
                                <LoginModal />
                            </ListItem>
                            <Divider />
                            <ListItem button className={classes.listItem}>
                                <SignUpModal />
                            </ListItem>
                            <Divider />
                        </>}
                    </List>
                </AccordionDetails>
            </Accordion>
        )
    }

    return(
        <>
            {isPhone ? mobileNavbar() : desktopNavbar()}
        </>
    )
}