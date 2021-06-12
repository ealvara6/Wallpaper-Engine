import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Box from '@material-ui/core/box';
import { About } from './Pages/about';
import { Home } from './Pages/home';
import { Switch, Route } from 'react-router-dom';
import { RenderNavbar } from './Components/navbar';
import { UserProfile } from './Pages/userProfile';
import { UserFavorites } from './Pages/userFavorites';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: theme.palette.background.default,
  },
  footer: {
    marginBottom: '200px',
  }
}))

function App() {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <RenderNavbar />
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/user/profile' component={UserProfile} />
        <Route path='/user/favorites' component={UserFavorites} />
        <Route path='/' component={Home} />
      </Switch>
      <Box className={classes.footer}></Box>
    </div>
  );
}

export default App;
