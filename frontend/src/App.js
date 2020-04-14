import React from 'react';
import './App.css';
import Modules from './components/modules/Modules';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Route } from 'react-router-dom';
import Landing from "./components/LandingPage/landing";
import DatabaseModule from "./components/DatabaseModule/DataBaseModule";
import SimpleMenu from './components/modules/table'

function App() {
  return (
    <div className="App">

      <Route exact path="/landing" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/modules" component={Modules} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/database" component={DatabaseModule} />
      <Route exact path="/" component={SimpleMenu} />
    </div>
  );
}

export default App;
