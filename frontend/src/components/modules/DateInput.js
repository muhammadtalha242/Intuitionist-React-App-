import React from 'react'

class DataInput extends React.Component {
    constructor() {
        super()
        this.NoOfYears = this.NoOfYears.bind(this)
        this.state = {
            fromDate: '',
            toDate: ''
        }
    }
    changeHandlerToDate = (event) => {
        this.setState(
            { toDate: event.target.value }
        )
    }
    changeHandlerFromDate = (event) => {
        this.setState(
            { fromDate: event.target.value }
        )
    }


    dateHandler = (event) => {
        event.preventDefault()
        var objectArray = this.NoOfYears()
        if (Object.keys(objectArray).length >= 1) {
            var showInputTable = true
        }
        else {
            var showInputTable = false
        }
        this.props.getDateArray(objectArray, showInputTable)
    }

    NoOfYears() {

        var years = {};

        var fromDate = new Date(this.state.fromDate)
        var toDate = new Date(this.state.toDate)

        for (var currentDate = fromDate; currentDate <= toDate; currentDate.setMonth(currentDate.getMonth() + 1)) {
            var d = new Date(currentDate)
            
            if (d.getFullYear() in years) {
                years[d.getFullYear()].push(d)
            }
            else {
                var y = []
                y.push(d)
                years[d.getFullYear()] = y
            }
        }
        console.log("years:", years)
        return years

    }



    render() {
        return (
            <div>
                <form onSubmit={this.dateHandler}>
                    <label>From</label>
                    <input type="date" name="FromDate" onChange={this.changeHandlerFromDate} />

                    <label>To</label>
                    <input type="date" name="ToMonth" onChange={this.changeHandlerToDate} />

                    <button type='Submit'> GO </button>
                </form>
            </div>
        )
    }

}

export default DataInput;