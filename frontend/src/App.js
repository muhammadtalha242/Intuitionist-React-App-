import React from 'react';
import './App.css';
import Modules from './components/Modules';
import Login from './components/Login';
import Register from './components/Register';
import { Route } from 'react-router-dom';
import Landing from "./components/landing";
import Database from "./components/database";
function App() {
  return (
    <div className="App">

      <Route exact path="/landing" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/modules" component={Modules} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/database" component={Database} />
    </div>
  );
}

export default App;
