import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import InputRow from "./InputRow"
class InputTable extends Component {


    constructor(props) {
        super();
        this.updateAssumptionArray = this.updateAssumptionArray.bind(this)
        this.sendFinalAssumptions= this.sendFinalAssumptions.bind(this)
        this.state = {
            objectArray:{},
            assumptionArray: []
        }
    };

    componentDidMount = () => {
        console.log('=======:Render componentDidMount:========')
        this.setState({
            objectArray: this.props.objectArray
        })

       
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        console.log('=======:Render componentwillreceiveProps:========')
       
        var currentDateObject = this.props.objectArray;
        if(!( JSON.stringify(currentDateObject) === JSON.stringify(nextProps) )){
            this.setState({
                objectArray: nextProps.objectArray
            })
    
        }
    }
    updateAssumptionArray(assumptions){
        // var arr=[...this.state.assumptionArray]
        // arr.push(assumptions)
        this.setState({
            assumptionArray: assumptions
        })
    }

    sendFinalAssumptions(){
        this.props.getFinalAssumptions(this.state.assumptionArray)
    }
    

    render() {
        console.log('=======:Render InputTable:========')
        
        console.log("Object.entries(this.entries.dateObject): ",Object.entries(this.state.objectArray))
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Yearly</th>
                            <th>Monthly</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {Object.entries(this.state.objectArray).map(item => <InputRow key={item[0]} year={item[0]} item={item[1]} updateAssumptionArray={this.updateAssumptionArray}/>)}
                        <tr>
                            <td><button onClick={this.sendFinalAssumptions}>Send Assumptions</button></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        )

    }


}




export default InputTable
