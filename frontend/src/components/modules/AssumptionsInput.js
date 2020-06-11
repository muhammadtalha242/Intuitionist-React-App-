import React from "react"
import './AssumptionsInput.css'
import { Table } from 'react-bootstrap';


class AssumptionInput extends React.Component {
    constructor() {
        super()
        this.sendAssumptions = this.sendAssumptions.bind(this)
        this.state = {
            date: '',
            dollar_parity: 0,
            us_cpi: 0,
            local_cpi: 0,
            kibor: 0,
            libor: 0,
            sinsoure_fee: 0,
        }
    }

    componentDidMount(){
        this.setState({
            date: this.props.date
        })
    }

    changeHandler_dollar = (event) => {
        this.setState(
            { dollar_parity: event.target.value }
        )
    }
    changeHandler_usCpi = (event) => {
        this.setState(
            { us_cpi: event.target.value }
        )
    }
    changeHandler_localCpi = (event) => {
        this.setState(
            { local_cpi: event.target.value }
        )
    }
    changeHandler_kibor = (event) => {
        this.setState(
            { kibor: event.target.value }
        )
    }
    changeHandler_libor = (event) => {
        this.setState(
            { libor: event.target.value }
        )
    }
    changeHandler_sinsoureFee = (event) => {
        this.setState(
            { sinsoure_fee: event.target.value }
        )
    }

    sendAssumptions(){
        const assmumption={
            date: this.props.date,
            dollar_parity: this.state.dollar_parity,
            us_cpi: this.state.us_cpi,
            local_cpi: this.state.local_cpi,
            kibor: this.state.kibor,
            libor: this.state.libor,
            sinsoure_fee: this.state.sinsoure_fee,
        }
        this.props.getAssumptionInput(assmumption)
    }



    render() {
        return (
            <Table className="all-assmumption-inputs">
                <thead>
                    <tr>
                        <th>{this.props.period}</th>
                        <th>AssumptionInput</th>

                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                    <td><label>Dollar_parity</label></td>
                    <td><input type="number" name="dollar_parity" required onChange={this.changeHandler_dollar} /></td>
                    </tr>
                    
                    <tr>
                    <td><label>us_cpi</label></td>
                    <td><input type="number" name="us_cpi" required onChange={this.changeHandler_usCpi} /></td>
                    </tr>
                    
                    
                    <tr>
                    <td><label>local_cpi</label></td>
                    <td><input type="number" name="local_cpi" required onChange={this.changeHandler_localCpi} /></td>
                    </tr>

                    <tr>
                    <td><label>kibor</label></td>
                    <td> <input type="number" name="kibor" required onChange={this.changeHandler_kibor} /></td>
                    </tr>

                    <tr>
                    <td><label>libor</label></td>
                    <td><input type="number" name="libor" required onChange={this.changeHandler_libor} /></td>
                    </tr>

                    <tr>
                    <td> <label>sinsoure_fee</label></td>
                    <td> <input type="number" name="sinsoure_fee" required onChange={this.changeHandler_sinsoureFee} /></td>
                    </tr>

                    
                    <tr>
                        <td><button onClick={this.sendAssumptions}>Send Assumptions</button></td>
                    </tr>
                </tbody>
            </Table>


        )
    }
}

export default AssumptionInput