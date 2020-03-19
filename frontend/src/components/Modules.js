import React, { Component } from 'react'
import axios from "axios";
import InputTable from './InputTable'
class Modules extends Component {

    constructor() {
        super();
        this.state = {
            powerplants: [],
            commercialparameters: [],
            powerPlant: 'AES PAK GEN',
            commercialParameter: 'AnnualSecurityCost',
            inputvalue1: '',
            inputvalue2: '',
            visible: false,
            fromdate: '',
            todate: '',
            assumptionInputs: {
                VOM_Local: ['local_cpi'],
                VOM_Foreign: ['dollar_rate', 'us_cpi'],
                WaterCharges: ['local_cpi'],
                LimeStoneCharges: ['local_cpi'],
                AshDisposalCost: ['local_cpi'],
                EscalableComponent: ['dollar_rate', 'us_cpi'],
                FOMLocal: ['local_cpi'],
                VariableRate: ['local_cpi'],
                NonEscalableComponentForeign: ['dollar_rate'],
                NonEscalableComponentLocal: [],
                FOMForeign: ['dollar_rate'],
                RepaymentRMB: ['dollar_rate'],
                FixedCostJetty: ['dollar_rate'],
                VariableCostJetty: ['dollar_rate'],
                IRSACharges: [],
                ROE: ['dollar_rate'],
                ROEDC: ['dollar_rate'],
                AnnualSecurityCost: ['dollar_rate'],
                Sinosure: ['dollar_rate', 'sinosure_fee'],
                DSRACost: [],
                ProceedFromCRES: [],
                Insurance: [],
                FixedCostOfWorkingCapital: ['kibor'],
                WHT: [],
                FixeFCC: [],
                FixedRate: [],
                InterestChargesForeign: ['libor'],
                // interestChargesKibor
                InterestRateRMB: ['dollar_rate']
                // FCC===>>
                // OutstandingPrincipleForeignQuarter
                // InterestForeignQuarter
                // OutstandingPrincipleLocalQuarter
                // InterestLocalQuarter
            }
        }

    };

    onChangeName(year) {
        this.setState({
            changeName: year
        })
    }

    componentDidMount = () => {

        axios.get("/powerplant")
            .then(response => {
                this.setState({
                    powerplants: response.data.results
                })
            })
        axios.get("/commercialparameters")
            .then(response => {
                this.setState({
                    commercialparameters: response.data.results
                })
            })
    }
    changeHandlerFromDate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            fromdate: e.target.value,
        })
    }
    changeHandlerToDate = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            todate: e.target.value,
        })
    }
    changeHandlerParameter = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        ShowHideDiv()
    }
    changeHandler = (e) => {

        this.setState({ powerPlant: e.target.value })
    }


    update(e) {
        this.props.changeName(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        // axios.post('/submit', this.state)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }
    checkCommercialParameters = () => {
        var commPara = this.state.commercialParameter;
        if (this.state.assumptionInputs[commPara].length === 0) {
            this.setState({
                visible: false
            })
        }
        else {
            this.setState({
                visible: true
            })
        }
    }



    render() {
        const { powerPlant, commercialParameter, inputvalue1, inputvalue2 } = this.state;
        var visibleState = this.state.visible
        var assumptionInputsArray = this.state.assumptionInputs[this.state.commercialParameter]
        console.log(this.state.powerPlant)
        var table = (visibleState) ? <InputTable fromDate={this.state.fromdate} toDate={this.state.todate} commercialParameter={this.state.commercialParameter} assumptionInputsArray={assumptionInputsArray} powerPlant={this.state.powerPlant} /> : null

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>From</label>
                        <input type="date" fromdate={this.state.fromdate} id="frommonth" onChange={this.changeHandlerFromDate}></input>

                        <label>To</label>
                        <input type="date" todate={this.state.todate} name="tomonth" id="tomonth" onChange={this.changeHandlerToDate}></input>

                    </div>
                    <div>
                        <select name="powerPlant" value={powerPlant} onChange={this.changeHandler}>
                            {this.state.powerplants.map(pp => (
                                <option key={pp} value={pp}>{pp}</option>))}
                        </select>
                    </div>
                    <div>
                        <select id="commercialParameter" name="commercialParameter" value={commercialParameter} onChange={this.changeHandlerParameter}>
                            {this.state.commercialparameters.map((cc, index) => (
                                <option key={index} value={cc}>{cc}</option>))}
                        </select>
                    </div>
                    <div>

                        <input id="input1" type="text" name="inputvalue1" value={inputvalue1} onChange={this.changeHandler} style={{ display: 'none' }}></input>
                        <input id="input2" type="text" name="inputvalue2" value={inputvalue2} onChange={this.changeHandler} style={{ display: 'none' }}></input>
                    </div>
                    <button type='button' onClick={this.checkCommercialParameters}> Submit</button>
                    <br />

                </form>
                {table}
            </div>
        )
    }
}

function ShowHideDiv() {
    var CP = document.getElementById("commercialParameter");
    var input1 = document.getElementById("input1");
    var input2 = document.getElementById("input2");

    input2.style.display = (CP.value === "VOM_Foreign" || CP.value === "EscalableComponent" || CP.value === 'Sinosure') ? "inline" : "none";
    input1.style.display = (CP.value === 'NonEscalableComponentLocal' || CP.value === "FixeFCC" || CP.value === 'IRSACharges' || CP.value === 'WHT' || CP.value === "FixedRate" || CP.value === "PrceedoFromCRES" || CP.value === 'DSRACost') ? "none" : "inline";

};


export default Modules