import React, { Component } from 'react';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li className="logo"><i className="fas fa-bolt" style={{ color: 'rgb(0, 99, 248)' }}></i><span>  Intuitionist</span></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Mission</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
