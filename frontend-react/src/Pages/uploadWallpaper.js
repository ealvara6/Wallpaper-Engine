import { React, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Error from '../Components/error';
import Success from '../Components/success';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    title:{
        justifyContent: 'center',
        textAlign: 'center',
    },
    name:{
        marginBottom: theme.spacing(4),
    },
    tags: {
        marginBottom: theme.spacing(4),
    },
    container: {
        padding: theme.spacing(2),
    },
    img: {
        marginTop: theme.spacing(2),
        width: 200,
        height: 'auto',
    },
    form: {
        alignItems: 'stretch',
    }
}))

const opts = [
    "animal",
    "city",
    "nature",
    "space",
    "dark",
    "light",
]


export default function UploadWallpaper (props) {

    const classes = useStyles();
    const [img, setImg] = useState(null);
    const [imgDisplay, setImgDisplay] = useState(null);
    const[name, setName] = useState("");
    const[tags, setTags] = useState(null);
    const[errors, setErrors] = useState({message: null, isError: false});
    const[success, setSuccess] = useState({message: null, isSuccess: false});

    const handleChange = (e, value, field) => {
        switch(field){
            case "name":
                setName(e.target.value);
                break;
            case "tags":
                setTags(value);
                break;
            case "image":
                if(e.target.files[0] !== null){
                    setImgDisplay(URL.createObjectURL(e.target.files[0]));
                    setImg(e.target.files[0]);
                }
                break;
        }
    }

    const handleSubmit = () => {
        //resets success and error components
        setErrors({message: null, isError: false});
        setSuccess({message: null, isSuccess: false});
        const fd = new FormData();
        fd.append('image', img);
        fd.append('name', name);
        fd.append('tags', tags);
        const headerData = {
            headers:{
                token: localStorage.getItem('token'),
                'content-type': 'multipart/form-data',
            }
        };
        axios.post('/api/wallpaper/upload', fd, headerData)
        .then(res => {
            console.log(res.data.message);
            setSuccess({message: res.data.message, isSuccess: true});
            setErrors({message: null, isError: false});
        })
        .catch(err => {
            setErrors({message: err.response.data.message, isError: true});
        })
    }

    const showError = () => {
        return <Error message={errors.message} />
    }

    const showSuccess = () => {
        return <Success message={success.message} />
    }


    return(
        <Box>
            {!localStorage.getItem('loggedIn') ? <h1>Unauthorized User</h1> :
                <Grid container justify="center">
                    <Paper>
                        <Grid container className={classes.container}>
                            <Grid container className={classes.container} xs={12}>
                                <Grid item xs={12} className={classes.title}>
                                    <Typography variant="h5">Upload wallpaper</Typography>
                                    {errors.isError ? showError() : null}
                                    {success.isSuccess ? showSuccess() : null}
                                </Grid>
                            </Grid>
                            <Grid container xs={12} md={6} className={classes.container}>
                                <Grid item xs={12}>
                                    <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleChange(e, null, "image")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <img src={imgDisplay} className={classes.img} />
                                </Grid>
                            </Grid>


                            <Grid container className={classes.container, classes.form} xs={12} md={6}>
                                <Grid item xs={12}>
                                    <TextField id="imageName" label="Name" className={classes.name} onChange={(e) => handleChange(e, null, "name")}/>
                                    <Autocomplete
                                        className={classes.tags}
                                        multiple
                                        id="tags"
                                        options={opts}
                                        renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
                                        onChange={(e, value) => handleChange(e, value, "tags")}
                                    />
                                    <Box display="flex" justifyContent="flex-end">
                                        <Button variant="contained" color="primary"onClick={handleSubmit}>Upload Image</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>}
        </Box>
    )
}