import React from 'react';
import './App.css';
import Modules from './components/modules/Modules';
import Login from './components/Login';
import Register from './components/Register';
import { Route } from 'react-router-dom';
import Landing from "./components/landing";
import DatabaseModule from "./components/DatabaseModule/DataBaseModule";

function App() {
  return (
    <div className="App">

      <Route exact path="/landing" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/modules" component={Modules} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/database" component={DatabaseModule} />
    </div>
  );
}

export default App;
