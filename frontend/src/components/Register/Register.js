import React, { Component } from 'react'

import NavBar from '../navBar'
import RegisterForm from './RegisterForm'
class Register extends Component {
  
    render() {
        return (
            
            <div>
                <NavBar/>
                <RegisterForm/>
            </div>
        )
    }
}

export default Register