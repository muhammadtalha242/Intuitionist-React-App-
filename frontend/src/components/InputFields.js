import React from 'react'
import axios from 'axios'
import Output from './Output'

class InputFields extends React.Component {
    constructor() {
        super()
        this.submitQuery = this.submitQuery.bind(this)
        this.getResults = this.getResults.bind(this)
        this.state = {
            isVisible: false,
            assumptionArrayObjects: [],
            query: {},
            output:0,

        }
    }

    getSubmit(event) {
        event.preventDefault();
        var years = this.state.assumptionArrayObjects;
        var assumptionObject = {};
        var fromDate = new Date(this.props.fromDate)
        var fromYear= fromDate.getFullYear().toString();
        var toDate = new Date(this.props.toDate)
        var toYear= toDate.getFullYear().toString();
        if(this.props.year === fromYear){
            assumptionObject['fromDate'] = this.props.fromDate
        }else if (this.props.year === toYear){
            assumptionObject['fromDate'] = this.props.toDate
        }
        else{
            var fromdate= this.props.year +"-01-01"
            assumptionObject['fromDate'] = fromdate
        }
        this.props.assumptionInputsArray.forEach(key => {
            assumptionObject[key] = this[`${key}`].value
        })
        years.push(assumptionObject)
        const newQuery ={
            commercialParameter : this.props.commercialParameter,
            powerPlant :this.props.powerPlant,
            assumptionArrayObjects: this.state.assumptionArrayObjects,
            fromDate:this.props.fromDate, 
            toDate:this.props.toDate
        }
        this.setState({query: newQuery,
            assumptionArrayObjects:years})

        
    }

    submitQuery(){
        console.log('this.state.query: ',this.state.query)
        axios.post('/submit', this.state.query)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        console.log('this.getResults();:')

        this.getResults();
        
    }
    getResults(){
        console.log('Response:')

        axios.get("/submit/sendResults")
        .then(response => {
            this.setState({
                output:response.data
            })
            console.log("this is response: ",response)

        })
        this.setState({
            isVisible: true
        })
    }
    renderItem(name) {
        return (
            <input name={name} key={name} ref={(input) => this[`${name}`] = input} type="number" required placeholder={name} />

        )
    }
    
    render() {

        const assumptionInputsArray = this.props.assumptionInputsArray;
        var output = (this.state.isVisible) ? <Output /> : null

        return (
            <div>
            <form onSubmit={(e) => this.getSubmit(e)} >
                
                <label>{this.props.year} </label>
                {assumptionInputsArray.map(key => this.renderItem(key))}
                
                <button type="submit" >submit Inputs </button>
                <button type="button" onClick={this.submitQuery}>submit Query →</button>
            </form>
            {output}
            </div>
        )
    }
}
export default InputFields