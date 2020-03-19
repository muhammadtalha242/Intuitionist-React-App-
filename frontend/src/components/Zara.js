import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
// import axios from "axios";
// import Modules from './Modules'
class Zara extends Component {


    constructor(props) {
        super();
        this.state = {
            fromdate: '',
            todate: '',
            arr: [],
        }

    };

    componentDidMount = () => {
        this.setState((props, state) => ({
            fromdate: this.props.fromDate,
            todate: this.props.toDate,
        }))
        var array = NoOfYears(this.props.fromDate, this.props.toDate)
        this.setState(() => ({ arr: array }))
    }


    render() {
        const items = this.state.arr.map(function (item) {
            return (
                <tr>
                    <td>{item}</td>
                    <td><button>Yearly</button></td>
                    <td><button>Monthly</button></td>
                </tr>
            )
        });
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
                        {items}
                    </tbody>
                </Table>
            </div>

        )

    }


}


function NoOfYears(year1, year2) {
    var arr = []
    var from = year1.split("-")

    var f = from[0]
    var to = year2.split("-")
    var t = to[0]

    var i = 0
    for (i = f; i <= t; i++) {
        arr.push(i);
    }
    return arr

}


export default Zara