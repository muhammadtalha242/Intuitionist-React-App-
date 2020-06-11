import React, { Component } from 'react'

export class Error extends Component {
    render() {
        return (
            <div>
                <h1>
                    Database not connected : {this.props.error}
                </h1>
            </div>
        )
    }
}

export default Error
