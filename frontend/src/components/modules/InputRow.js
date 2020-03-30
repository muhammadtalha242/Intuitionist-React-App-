import React from "react"
import AssumptionInput from './AssumptionsInput'
import MonthButton from "./MonthButton"

class InputRow extends React.Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.getAssumptionInput = this.getAssumptionInput.bind(this)
        this.handleUpdateAssumption = this.handleUpdateAssumption.bind(this)
        this.state = {
            display: false,
            isMonthly: false,
            isYearly: false,
            currentYear: 0,
            assumptionArray: []

        }
    };

    showYearly = (year) => {
        this.setState({
            isYearly: true,
            isMonthly: false,
            currentYear: year
        })
        this.handleClick();

    }
    showMonthly = (item, year) => {

        // loop on item and render button 

        this.setState({
            isYearly: false,
            isMonthly: true,
            currentYear: year

        })


        this.handleClick();

    }
    // componentWillUnmount(){
    //     this.props.updateAssumptionArray(this.state.assumptionArray)
    // }

    handleClick() {
        console.log('=======:Render handleClick:========')
        this.setState({
            display: !this.state.display
        })
    }

    handleUpdateAssumption(assumption){
        console.log("+++++++in HandleUpdateAssumptions++++++++", assumption)

        const object={
            year: this.props.year,
            assumption: assumption
        }
        this.props.updateAssumptionArray(object)
        
    }

    getAssumptionInput(input) {
        console.log("+++ inside row get assumption Inputs ++++")

        console.log(input)


        const { date, ...restOfInput } = input   //Destructing object 
        var new_array = [...this.state.assumptionArray]
        if (date["length"] > 1) {
            // new_array = [...new_array]

            date.forEach(currentDate => {
                new_array = [...new_array, [currentDate, restOfInput]]
                console.log("new_array: ", new_array)
            });
        }
        else {

            // new_array = [...new_array]
            new_array.push([date, restOfInput])
        }

        this.setState({
            assumptionArray: new_array
        },()=>{this.handleUpdateAssumption(this.state.assumptionArray)})
        
    }



    render() {
        const yearly = ((this.state.display && this.state.isYearly) ? <AssumptionInput yearly={this.state.isYearly} getAssumptionInput={this.getAssumptionInput} period={this.props.year} date={this.props.item} /> : null)
        const monthly = ((this.state.display && this.state.isMonthly) ? (this.props.item).map(date => <MonthButton getAssumptionInput={this.getAssumptionInput} month={date.toDateString().split(" ")[1]} key={date.toDateString().split(" ")[1]} date={date} />) : null)

        return (
            <tr >
                <td>{this.props.year}</td>
                <td><button onClick={(e) => this.showYearly(this.props.year)}>Yearly</button>{yearly}</td>

                <td><button onClick={(e) => this.showMonthly(this.props.item, this.props.year)}>Monthly</button>{monthly}</td>

            </tr>
        )
    }
}
export default InputRow;