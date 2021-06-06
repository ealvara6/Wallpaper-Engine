import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { About } from './Pages/about';
import { Home } from './Pages/home';
import { Switch, Route } from 'react-router-dom';
import { RenderNavbar } from './Components/navbar';
import { UserProfile } from './Pages/userProfile';
import { UserFavorites } from './Pages/userFavorites';


function App() {
  return (
    <div className="App">
      <RenderNavbar />
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/user/profile' component={UserProfile} />
        <Route path='/user/favorites' component={UserFavorites} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
