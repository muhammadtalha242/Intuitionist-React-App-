import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className=""><i className="fas fa-bolt" style={{ color: 'rgb(0, 99, 248)' }}></i><span>  Intuitionist</span></li>
          <li><a href="#about">About</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
