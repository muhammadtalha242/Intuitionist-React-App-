import React from 'react'
class Input extends React.Component{
    constructor(){
        super()
        this.getInputValue= this.getInputValue.bind(this);
        this.state={

        }
    }
    
    getInputValue(event){
            event.preventDefault();
            const eventName= event.target;
            console.log("eventName.name, eventName.value: ",eventName.name, eventName.value)
                
                
            this.setState({
                [this.props.year]:{[eventName.name]:eventName.value}
            })
            // const year = {[this.props.year]:{[eventName.name]:eventName.value}}
            // console.log(year)
            console.log(this.state.year)
            //  this.props.updateState(this.state.year)
            // console.log(this.props.commercialParameter)
        }

    render(){
        return(
            <div>
            <label>{this.props.year}</label>
            <input name={this.props.name} ref={(input) => this.desc = input} type="text" required placeholder={this.props.name} onChange={this.getInputValue} /> 
            </div>
        )
    }
}
export default Input