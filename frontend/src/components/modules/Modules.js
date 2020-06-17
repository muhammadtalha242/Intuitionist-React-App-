import React from 'react'
import DataInput from "./DateInput"
import InputTable from './inputtabl'
import axios from "axios"
import NavBar from '../navBar'
import Spinner from '../Spinner/spinnericon'
import Backdrop from '@material-ui/core/Backdrop';
import { Alert, AlertTitle } from '@material-ui/lab';
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
            open:false,
            computation:false

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
                    open:false,
                    computation: true
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
        else if(this.state.computation){
            return(
                <div>
                    <NavBar/>
                    <br/>
                    <br/>
                    <DataInput getDateArray={this.getDatesArray} />
                    {inputTable}
                    <br/>
                    <br/>
                    <br/>
                    <Alert severity="success"  style={{ width: "50%", margin: '0 auto' }}>Computations done successfully! <br/> You can now view the excel sheets</Alert>

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