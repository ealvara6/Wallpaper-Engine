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
import CreateSignUpModal from './signUpModal';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(5),
    },
    list: {
        width: '100%',
        justifyItems: 'center',
        alignItems: 'stretch',
    },
    listItem: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    divider: {
        backgroundColor: theme.palette.divider,
    },
    title: {
        color: theme.palette.text.primary,
    },
}))

export function RenderNavbar() {
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isPhone, setIsPhone] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
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

    const handleClose = () => {
        setShowModal(false);
    }


    const desktopNavbar = () => {
        return(
                <Box className={classes.root}>
                    <Navbar>
                        <Typography variant='h6' className={classes.title}>Wallpaper Engine</Typography>
                        {/* <Navbar.Brand href="home" >Wallpaper Engine</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <ButtonGroup variant="text">
                                    <Button color='primary'><Nav.Link href="/">Home</Nav.Link></Button>
                                    <Button color='primary'><Nav.Link href="/about">About</Nav.Link></Button>
                                </ButtonGroup>
                            </Nav>
                            <Nav className="ml-auto">
                                {isLoggedIn ?
                                    <Account />
                                    :
                                    <>
                                        <LoginModal />
                                        <Button color="primary" variant="outlined" onClick={() => setShowModal(true)}>Sign Up</Button>
                                        {showModal ? <CreateSignUpModal open={true} onClose={handleClose} /> : null}
                                    </>
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Divider className={classes.divider} />
                </Box>
            )
    }

    const mobileNavbar = () => {
        return(
            <Box className={classes.box}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<MenuIcon />}
                    >
                        <Typography className={classes.title}>Wallpaper Engine</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List component='nav' className={classes.list}>
                            <Divider />
                            <ListItem className={classes.listItem} onClick={() => handleButton('home')}>
                                <Button>Home</Button>
                            </ListItem>
                            <Divider />
                            <ListItem className={classes.listItem} divider onClick={() => handleButton('about')}>
                                <Button>About</Button>
                            </ListItem>

                            {isLoggedIn ? <ListItem className={classes.listItem}><Account /></ListItem> :
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
                <Divider className={classes.divider} />
            </Box>
        )
    }

    return(
        <>
            {isPhone ? mobileNavbar() : desktopNavbar()}
        </>
    )
}