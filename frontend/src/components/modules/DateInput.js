import React from 'react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import Button from '@material-ui/core/Button';



class DataInput extends React.Component {
    constructor() {
        super()
        this.NoOfYears = this.NoOfYears.bind(this)
        this.state = {
            fromDate: new Date('2014-08-18T21:11:54'),
            toDate: new Date('2014-08-18T21:11:54')
        }
    }
    convertDateFormat = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    changeHandlerToDate = (date) => {
        date = this.convertDateFormat(date)
        this.setState({
            toDate: date
        })
    }
    changeHandlerFromDate = (date) => {
        date = this.convertDateFormat(date)

        this.setState({
            fromDate: date
        })
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
                <form onSubmit={this.dateHandler} style={{ width: '50%', margin: 'auto' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container justify="space-around">
                            {/* container direction="row" justify="center" alignItems="center" spacing={0} */}
                            {/* <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="2%"
                                id="date-picker-inline"
                                label="From"
                                value={this.state.fromDate}
                                onChange={this.changeHandlerFromDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> */}

                            <KeyboardDatePicker

                                margin="normal"
                                id="date-picker-dialog"
                                label="From"
                                format="MM/dd/yyyy"
                                value={this.state.fromDate}
                                onChange={this.changeHandlerFromDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />


                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="To"
                                format="MM/dd/yyyy"
                                value={this.state.toDate}
                                onChange={this.changeHandlerToDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            {/* <Button     type="submit" variant="contained" color="primary" onSubmit={this.dateHandler}>GO</Button> */}
                            <Button color="primary" type="submit" variant="contained" onSubmit={this.dateHandler} size="small" style={{ padding: "0px", border: "0px", margin: "0px" }} >GO</Button>

                        </Grid>
                    </MuiPickersUtilsProvider>

                </form>

            </div>
        )
    }

}

export default DataInput;