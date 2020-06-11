import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AssumptionInput from './Dialog'
import MonthButton from "./MonthButton"
import { TableCell, Button } from "@material-ui/core";
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
class InputRow extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
        this.getAssumptionInput = this.getAssumptionInput.bind(this)
        this.handleUpdateAssumption = this.handleUpdateAssumption.bind(this)
        this.state = {
            display: false,
            isMonthly: false,
            isYearly: false,
            currentYear: 0,
            assumptionArray: [],
            anchorEl: null

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
    showMonthly = (e, year) => {
        console.log(e.currentTarget)
        // loop on item and render button 

        this.setState({
            isYearly: false,
            isMonthly: true,
            currentYear: year,
            anchorEl: e.currentTarget

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

    handleUpdateAssumption(assumption) {
        console.log("+++++++in HandleUpdateAssumptions++++++++", assumption)

        const object = {
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
        }, () => { this.handleUpdateAssumption(this.state.assumptionArray) })

    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };



    render() {

        const yearly = ((this.state.display && this.state.isYearly) ? <AssumptionInput yearly={this.state.isYearly} getAssumptionInput={this.getAssumptionInput} period={this.props.year} date={this.props.item} /> : null)
        const monthly = ((this.state.display && this.state.isMonthly) ? <StyledMenu
            id="customized-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
        >{(this.props.item).map(date => <MonthButton getAssumptionInput={this.getAssumptionInput} month={date.toDateString().split(" ")[1]} key={date.toDateString().split(" ")[1]} date={date} />)}</StyledMenu> : null)

        return (
            <TableRow >
                <TableCell>{this.props.year}</TableCell>
                <TableCell><Button variant="contained" color="primary" onClick={(e) => this.showYearly(this.props.year)}>Yearly</Button>{yearly}</TableCell>

                {/* <TableCell><Button aria-controls="simple-menu" aria-haspopup="true" variant="contained" color="secondary" onClick={(e) => this.showMonthly(this.props.item, this.props.year)}>Monthly</Button>{monthly}</TableCell> */}
                <TableCell><Button aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="secondary"
                    onClick={e => this.showMonthly(e, this.props.item, this.props.year)}>
                    Monthly
      </Button>{monthly}</TableCell>

            </TableRow>
        )
    }
}
export default InputRow;