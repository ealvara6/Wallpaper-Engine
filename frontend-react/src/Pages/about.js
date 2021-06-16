import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(153,153,153,1) 100%)',
    },
    box: {
        marginBottom: 50,
    },
    Grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Grid2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(63, 81, 181, 0.07)',
    },
    Grid3: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        padding: theme.spacing(6),
    },
    title: {
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
    },
    info: {
        color: theme.palette.text.secondary,
    },
    centerCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export function About(props){
    const classes = useStyles();

    return(
        <Box className={classes.root}>
        {/* // <Container className={classes.root}> */}
            {/* <Grid container className={classes.grid} spacing={0}>
                <Grid className={classes.photo} item xs={12} sm={5}>
                    <img className={classes.img} src="Images/headshots/headshot.png" alt="Headshot" />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Typography variant='h5' className={classes.aboutTitle}>About</Typography>
                    <Typography variant='body1' className={classes.info}>
                        Hi, My name is Eduardo. I am an aspiring developer currently working on personal web development projects. I graduted from the University of Houston under the C.T Bauer College of Business with a degree in Management Information Systems with magna cum laude honors. During my time in the College of Business, I took an MIS intro course where the curriculum covered excel and its features. I discovered that I enjoyed thinking logically and creating functions that improved efficiency in the workflow. I then decided to take additional courses related to programming such as Intro into Object Oriented Programming. During this course I discovered how much I enjoyed programming and logical thinking which drove me to major in MIS. My electives consisted of more techincal courses such as Intro Into Web Development, Intro Into LAMP stack, Advanced Database Management systems, and Advanced Transaction Processing Systems.
                    </Typography>
                    <Typography variant='body1' className={classes.info}>
                        I am currently interested in back-end or front-end web development positions. I am currently working on a website that allows you to download and save images that can be used as wallpapers for your desktop and/or mobile devices.<br />The technologies I am currently using are:
                        <ul>
                            <li>Front-end: React.js</li>
                            <li>Middleware: Node.js</li>
                            <li>Database: MongoDB</li>
                        </ul>
                         The features I have currently implemented are:
                        <ul>
                            <li>User creation with authentication token</li>
                            <li>Favoriting system</li>
                            <li>restful API functions</li>
                            <li>Image downloading</li>
                        </ul>
                        Contact: <br />
                        Email: Eduardo.alvarado1234@ymail.com <br />
                        Phone: 832-853-5119
                    </Typography>
                </Grid>
            </Grid> */}
            <Grid container className={classes.Grid}>
                <Grid container xs={12} sm={3} className={classes.centerCenter}><img src="/Images/headshots/headshot.png" alt="headshot" /></Grid>
                <Grid item xs={12} sm={7}>
                    <Grid item className={classes.block}>
                            <Typography variant='h4' className={classes.title}>Who Am I?</Typography>
                            <Typography className={classes.info}>Hi, My name is Eduardo. I am an aspiring developer currently working on personal web development projects. I graduted from the University of Houston under the C.T Bauer College of Business with a degree in Management Information Systems with magna cum laude honors.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Box className={classes.box}></Box> */}
            <Grid container className={classes.Grid2}>
                <Grid item xs={12} sm={7} className={classes.block}>
                    <Typography variant='h4' className={classes.title}>What Brought Me Here</Typography>
                    <Typography className={classes.info}>During my time in the College of Business, I took an MIS intro course where the curriculum covered excel and its features. I discovered that I enjoyed thinking logically and creating functions that improved efficiency in the workflow. I then decided to take additional courses related to programming such as Intro into Object Oriented Programming. During this course I discovered how much I enjoyed programming and logical thinking which drove me to major in MIS. My electives consisted of more techincal courses such as Intro Into Web Development, Intro Into LAMP stack, Advanced Database Management systems, and Advanced Transaction Processing Systems.</Typography>
                </Grid>
                <Grid container xs={12} sm={3} className={classes.centerCenter}><img src="/Images/stock_photos/university.jpg" alt="Code" /></Grid>
            </Grid>
            {/* <Box className={classes.box}></Box> */}
            <Grid container className={classes.Grid3}>
                <Grid container xs={12} sm={3} className={classes.centerCenter}><img src="/Images/stock_photos/future.jpg" alt="future" /></Grid>
                <Grid item xs={12} sm={7} className={classes.block}>
                    <Typography variant='h4' className={classes.title}>Current Projects</Typography>
                    <Typography className={classes.info}>I am currently interested in back-end or front-end web development positions. I am currently working on a website that allows you to download and save images that can be used as wallpapers for your desktop and/or mobile devices.<br />The technologies I am currently using are:
                        <ul>
                            <li>Front-end: React.js</li>
                            <li>Middleware: Node.js</li>
                            <li>Database: MongoDB</li>
                        </ul>
                         The features I have currently implemented are:
                        <ul>
                            <li>User creation with authentication token</li>
                            <li>Favoriting system</li>
                            <li>restful API functions</li>
                            <li>Image downloading</li>
                        </ul>
                        Contact: <br />
                        Email: Eduardo.alvarado1234@ymail.com <br />
                        Phone: 832-853-5119</Typography>
                </Grid>
            </Grid>
            {/* <Box className={classes.box}></Box> */}
        {/* // </Container> */}
        </Box>
    )
}