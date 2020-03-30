import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import InputFields from './InputFields'
class InputTable extends Component {


    constructor(props) {
        super();
        this.handleClick =this.handleClick.bind(this)
        this.state = {
            fromdate: '',
            todate: '',
            dateArray: [],
            dateObj:{},
            years:[],
            currentYear:'',
            display: false,
            isMonthly: false,
            isYearly:false
        }
    };

    componentDidMount = () => {
        console.log('=======:Render componentDidMount:========')
        this.setState((props, state) => ({
            fromdate: this.props.fromDate,
            todate: this.props.toDate,
        }))

        var dateArray = NoOfYears(this.props.fromDate, this.props.toDate)
      
        this.setState(() => ({  dateArray }))
    }

    showYearly = (item) => {
        console.log('=======:Render showYearly:========')

        this.setState({
            isYearly:true,
            isMonthly: false,
            currentYear: item
        })
        this.handleClick();
       
        // return <InputFields isYearly={true} year={item} commercialParameter={this.props.commercialParameter} assumptionInputsArray={this.props.assumptionInputsArray} />
    }
    showMonthly = (item) =>{
        console.log("month"+item)
        this.setState({
            isYearly:false,
            isMonthly: true,
            currentYear: item
            
        })
        this.handleClick();
        
    }
    
    renderItems = (item) => {
        console.log('=======:Render renderItems:========',item)
        
            return (
                <tr key={item}>
                    <td>{item}</td>
                    <td><button onClick={(e) =>this.showYearly(item)}>Yearly</button></td>
                    <td><button onClick={(e) =>this.showMonthly(item)}>Monthly</button></td>
                </tr>
            )
        }
        
    handleClick(x){
        console.log('=======:Render handleClick:========')
        this.setState({
            display : true,
            
        })
    }


    render() {
        console.log('=======:Render InputTable:========')
        
        const feild = this.state.display ? (this.state.isYearly?<InputFields isYearly={true} year={this.state.currentYear}  commercialParameter={this.props.commercialParameter} assumptionInputsArray={this.props.assumptionInputsArray} powerPlant={this.props.powerPlant} fromDate={this.props.fromDate} toDate={this.props.toDate}/> :<InputFields isMonthly={true}  year={this.state.currentYear} commercialParameter={this.props.commercialParameter} assumptionInputsArray={this.props.assumptionInputsArray} dateArray={this.state.dateArray}/>) : null;
        
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Yearly</th>
                            <th>Monthly</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(this.state.dateArray).map(item => this.renderItems(item))}
                    </tbody>
                </Table>
                {feild}
            </div>

        )

    }


}


function NoOfYears(dateFrom, dateTo) {
    var dateArray={}

    var startDate= new Date(dateFrom)
    var endDate= new Date(dateTo)
    const startYear = startDate.getFullYear()
    var startMonth = startDate.getMonth()
    var totalMonths = ((endDate.getFullYear()-startDate.getFullYear())* 12) + (endDate.getMonth()-startDate.getMonth())

    for(var a = 0 ; a<= totalMonths ;a++){
        var newMonth = startMonth + a
        var currentYear = (startYear + Math.floor(newMonth /12)).toString()
        dateArray[currentYear] = dateArray[currentYear] +1 || 1
    } 
        
    return dateArray

}

export default InputTable
