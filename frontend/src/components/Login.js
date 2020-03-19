import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
                console.log('Login')

                this.props.history.push(`/register`)
            }
        })
    }

    render() {
        return (
            <div className="container" style={{ alignContent: 'center' }}>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
// import React, { Component } from 'react'
// import axios from 'axios'
// class Login extends Component {
//     componentDidMount = () => {
//         axios.get("/login")
//             .then(
//                 console.log("login"))
//     }

//     render() {

//         return (
//             <div className="container">
//                 <form onSubmit={(e) => login(e)}>
//                     <div class="form-group">
//                         <label for="exampleInputEmail1">Email address</label>
//                         <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                         <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//                     </div>
//                     <div class="form-group">
//                         <label for="exampleInputPassword1">Password</label>
//                         <input type="password" class="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="form-group form-check">
//                         <input type="checkbox" class="form-check-input" id="exampleCheck1" />
//                         <label class="form-check-label" for="exampleCheck1">Check me out</label>
//                     </div>
//                     <button type="submit" class="btn btn-primary">Submit</button>
//                 </form>
//             </div>

//         );
//     }
// }
// function login(e) {
//     e.preventDefault();
//     let request = {
//         email: document.getElementById("exampleInputEmail1").value,
//         password: document.getElementById("exampleInputPassword1").value
//     }
//     console.log(request['email']);
//     console.log(request['password']);
//     axios.post("/login", request)
//         .then(resp => {
//             console.log(resp.data.message)
//             alert(resp.data.message)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }


// export default Login
