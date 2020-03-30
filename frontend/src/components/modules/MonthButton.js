import React  from 'react'
import AssumptionInput from './AssumptionsInput'

class MonthButton extends React.Component{
    constructor(){
        super()
        this.showAssumptions = this.showAssumptions.bind(this)
        this.state={
            displayAssumptions : false
        }
    }

    

    showAssumptions = ()=>{
        this.setState({
            displayAssumptions : !this.state.displayAssumptions
        })
    }
    render(){
        const assumptionInput = ((this.state.displayAssumptions)? <AssumptionInput period ={this.props.month} date={this.props.date} getAssumptionInput={this.props.getAssumptionInput} />:null)
        return (
            <div>
            <button onClick={this.showAssumptions}> {this.props.month} </button>
            {assumptionInput}
            </div>
        )
    }
}

export default MonthButton