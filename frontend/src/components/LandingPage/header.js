import React, { Component } from 'react';
import Nav from "./nav";

class Header extends Component {
  render() {
    return (

      <header>
        <Nav />
        {/* <div className="head">
          <h1>Faster,Accurate< br />Price Predictions</h1>
          <div>
            <p>Store data in a database in standardized data formats for compatible and robust usage for analysis. Prediced data prepared by passing through various relevant models is displayed on an interactive visualization dashboard. </p>
            <p>Accurate electricity price forecast</p>
            <div><a className="contact" href="/login">Login</a></div>
          </div>
        </div> */}

      </header>

    );
  }
}

export default Header;
