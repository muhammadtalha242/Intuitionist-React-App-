import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { login } from '../UserFunctions'
import { Alert, AlertTitle } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';
const styles = {
    root: {
        width: '500px',
        margin: '10% auto',
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};
class SimpleFormExample extends React.Component {

    state = {

        email: '',
        password: '',
        submitted: false,
        error: false
    }

    handleChange = (e) => {

        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res => {
          console.log(res)
            if (res['status']==200) {
                console.log('Login')
                this.setState({ submitted: true }, () => {
                    setTimeout(() => this.setState({ submitted: false }), 5000);
                });
                
                this.props.history.push(`/landing`)
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
        const { classes } = this.props
        return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <div><h1>Login</h1></div>

                        <TextValidator
                            variant='filled'
                            label="Email"
                            onChange={this.handleChange}
                            name="email"
                            value={this.state.email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            style={{ marginBottom: "3%" }}
                        />
                        <br />
                        <TextValidator
                            variant='filled'
                            label="Password"
                            type='password'
                            onChange={this.handleChange}
                            name="password"
                            value={this.state.password}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <br /><br />
                        <Button

                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={this.state.submitted}
                        >
                            {
                                (this.state.submitted && 'Your form is submitted!')
                                || (!this.state.submitted && 'Submit')
                            }
                        </Button>
                    </ValidatorForm>
                </CardContent>
            </Card>
        )

    }

    render() {

        if (this.state.error) {
            return (
                <div style={{ margin: 'auto' }}>
                    {this.renderForm()}
                    < Alert severity="error" style={{ width: "50%", margin: '0 auto' }}> <AlertTitle>Error</AlertTitle>Incorrect Username/Password</Alert >
                </div>
            )
        }
        else {
            return (
                <div>
                    {this.renderForm()}
                  
                </div>
                
            )
        }
    }
}

export default withStyles(styles)(SimpleFormExample);