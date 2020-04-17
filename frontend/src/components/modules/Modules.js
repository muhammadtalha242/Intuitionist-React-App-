import React from 'react'
import DataInput from "./DateInput"
import InputTable from './inputtabl'
import axios from "axios"

class Modules extends React.Component {
    constructor() {
        super()
        this.getDatesArray = this.getDatesArray.bind(this)
        this.getFinalAssumptions = this.getFinalAssumptions.bind(this)
        this.sendAssumption = this.sendAssumption.bind(this)
        this.state =
        {
            objectArray: {},
            showInputTable: false,
            assumptions: []

        }
    }
    getDatesArray(date, showInputTable) {

        this.setState({ objectArray: date, showInputTable: showInputTable })
    }
    getFinalAssumptions(assumptions) {
        this.setState({
            assumptions
        }, () => this.sendAssumption(this.state.assumptions))
    }
    sendAssumption(assumptions) {
        console.log("sending Query: ", assumptions)
        axios.post('/submit', assumptions)
            .then(response => {

                console.log("this is response: ", response)
                this.setState({
                    response: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const inputTable = (this.state.showInputTable ? <InputTable objectArray={this.state.objectArray} getFinalAssumptions={this.getFinalAssumptions} /> : null)
        return (
            <div>
                <DataInput getDateArray={this.getDatesArray} />
                {inputTable}
            </div>
        )
    }
}


export default Modules;