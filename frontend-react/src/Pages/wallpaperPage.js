import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    img: {
        width: 500,
        height: 'auto',
    }
}))

export default function WallpaperModal(props) {
    const classes = useStyles();
    const { open, wallpaper, onClose } = props;

    const handleClose = () => {
        onClose(wallpaper._id);
    }

    return (
        <Box>

                    <Dialog open={open} onClose={handleClose} maxWidth='lg'>
                        {console.log("modal was called.")}
                        <DialogTitle id="wallpaper-modal">{wallpaper.name}</DialogTitle>
                        <DialogContent>
                            <img className={classes.img} src={`/Images/${wallpaper.image}`} alt={`${wallpaper.name}`} />
                            <DialogContentText>test</DialogContentText>
                        </DialogContent>
                    </Dialog>
        </Box>
    )
}