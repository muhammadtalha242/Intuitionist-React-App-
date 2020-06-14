import React from 'react'
import DataInput from "./DateInput"
import InputTable from './inputtabl'
import axios from "axios"
import NavBar from '../navBar'
import Spinner from '../Spinner/spinnericon'
import Backdrop from '@material-ui/core/Backdrop';
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
            assumptions: [],
            open:false

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
            this.setState({
                open: true
            })
        axios.post('/submit', assumptions)
            .then(response => {

                console.log("this is response: ", response)
                this.setState({
                    response: response.data,
                    open:false
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const inputTable = (this.state.showInputTable ? <InputTable objectArray={this.state.objectArray} getFinalAssumptions={this.getFinalAssumptions} /> : null)
        if(this.state.open){
            return(<div>
                    <Backdrop open={this.state.open}></Backdrop><Spinner/>
                </div>)
        }
        else{
            return (
                <div>
                    <NavBar/>
                    <br/>
                    <br/>
                    <DataInput getDateArray={this.getDatesArray} />
                    {inputTable}
                </div>
            )}
    }
}


export default Modules;