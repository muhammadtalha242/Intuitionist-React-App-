import React, { Component } from 'react'
import { register } from '../UserFunctions'
import { Alert, AlertTitle } from '@material-ui/lab';
class RegisterForm extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            submitted: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
            if (res['status']==200) {
                console.log('Registered Successfully')
                this.setState({
                    submitted:true
                })
                // this.setState({ submitted: true }, () => {
                //     setTimeout(() => this.setState({ submitted: false }), 5000);
                // });
            }

            else {
                this.setState({
                    error: true
                })
                console.log("err")
            }

        })
    }
    renderForm = () => {
        return (
            
            <div className="container" style={{width: '45%'}}>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register User</h1>
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
                                Register!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )

    }

    render() {
        console.log(this.state.submitted)
        if (this.state.error) {
            return (
                <div style={{ margin: 'auto' }}>
                    {this.renderForm()}
                    < Alert severity="error" style={{ width: "50%", margin: '0 auto',marginBottom:'8%' }}> <AlertTitle>Error</AlertTitle>User Already Registered</Alert >
                </div>
            )
        }
        else if(this.state.submitted) {
            return (
                <div>
                     {this.renderForm()}
                    <Alert severity="success"  style={{ width: "50%", margin: '0 auto',marginBottom:'8%' }}>Registered Succesfully!</Alert>
                </div>
               
            )
        }
        else{
            return(
                this.renderForm())
        }
    }}
export default RegisterForm