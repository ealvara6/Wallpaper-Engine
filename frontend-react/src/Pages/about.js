import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    info: {
        textAlign: 'left',
        alignItems: 'stretch',
        marginLeft: theme.spacing(3),
        color: theme.palette.text.secondary,
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
    },
    aboutTitle: {
        textAlign: 'left',
        color: theme.palette.text.primary,
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
    },
    contactTitle: {
        textAlign: 'center',
    }
}));

export function About(props){
    const classes = useStyles();

    return(
        <Container className={classes.root}>
            <Grid container className={classes.grid} spacing={0}>
                <Grid className={classes.photo} item xs={12} sm={5}>
                    <img className={classes.img} src="Images/headshots/headshot.png" alt="Headshot" />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <h1 className={classes.aboutTitle}>About</h1>
                    <p className={classes.info}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eligendi, sint expedita dolores, optio itaque atque quasi ipsam architecto distinctio voluptas at, veniam minus earum! Ullam ipsum corporis officia neque qui provident doloremque? Rem eligendi ullam illo maiores facilis deserunt eum molestiae et, impedit quaerat sapiente omnis veritatis commodi explicabo aperiam saepe nam at laborum. Aliquam exercitationem atque esse sit sed mollitia dolore! Ducimus sapiente velit cupiditate, quas, eos accusantium necessitatibus, debitis quos sequi doloremque vero excepturi deleniti iusto voluptatum ullam temporibus delectus consequuntur aperiam facilis ab at rerum sunt asperiores. Minus eius architecto sapiente qui possimus, non facere accusamus laboriosam hic ipsa recusandae quas porro sed velit exercitationem dignissimos placeat, necessitatibus eligendi quisquam atque. Quia expedita atque laborum repellendus velit, pariatur numquam inventore dignissimos sit commodi quae dicta, magni, laboriosam incidunt illo optio necessitatibus. Sunt nesciunt rerum, magni assumenda iure maiores nulla minima tempora unde, necessitatibus modi tempore molestiae quod quas animi neque. Praesentium et maiores molestiae suscipit vel! Incidunt maxime ex velit! Odio perspiciatis, ipsa rem repudiandae, aperiam explicabo omnis saepe rerum facilis voluptatibus optio nemo nam enim ad, nobis harum beatae modi asperiores quaerat molestiae quos alias. Iste accusantium eveniet adipisci optio maiores. Aliquam illo temporibus vitae!</p>
                </Grid>
            </Grid>
        </Container>
    )
}