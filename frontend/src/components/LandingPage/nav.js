import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="" style={{ color: 'rgb(0, 99, 248)',fontWeight:'900', fontSize:'1.5rem'}}><i className="fas fa-bolt" style={{ color: 'rgb(0, 99, 248)',fontWeight:'900', fontSize:'2.0rem' }}></i><span>  Intuitionist</span></li>
          <li><a href="#about">About</a></li>
          <li><a href="#mission">Mission</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/database">Database</a></li>
          <li><a href="/modules">Computations</a></li>
          <li><a href="/visualization">Visualization</a></li>
          <li><a href="/register">Register User</a></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;