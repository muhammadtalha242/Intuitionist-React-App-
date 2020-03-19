import React from 'react'

class Output extends React.Component{
    render(){
        return(
            <div>
                <h1>
                    Output{this.props.visible}
                </h1>
            </div>
        )
    }
}
export default Output
