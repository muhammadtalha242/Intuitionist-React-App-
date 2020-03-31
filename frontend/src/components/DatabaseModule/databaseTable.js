import React, { Component } from 'react';
import './database.css';
import { Table } from 'react-bootstrap';
import Edit from "./edit";
import axios from "axios";
import Insert from './insert';
import './databasetable.css';
class databaseTable extends Component {



    
    constructor() {
        super();
        this.state = {
            arr: [],
            showEditForm: false,
            showInsertForm: false,
            deleterow: {}
        }
        this.clickEditHandler = this.clickEditHandler.bind(this);
        this.clickInsertHandler = this.clickInsertHandler.bind(this);
    };

    clickEditHandler = (item) => {
        this.setState({ showEditForm: true })
        this.state.arr.push(item)
        console.log(this.state.arr)
    }
    clickInsertHandler = () => {
        console.log('click')
        this.setState({ showInsertForm: true })
        // this.state.arr.push(item)
        // console.log(this.state.arr)
    }
    clickDeleteHandler = (item) => {
        this.state.deleterow['table_name'] = this.props.tableName
        for (var i = 0; i < this.props.tableData[0].length; i++) {
            this.state.deleterow[this.props.tableData[0][i]] = item[i]
        }

        console.log(this.state.deleterow)
        axios.post("/update/delete", this.state.deleterow)
            .then(response =>
                console.log(response)
            )
            .catch(error => {
                console.log(error)
            })
        window.location.reload();

    }
    rendertable = () => {
        // this.props.tableData.shift()
        return (
            this.props.tableData.map((item, index) =>
                <tr key={index}>
                    {item.map((sub, i) =>
                        <td key={i}>{sub}</td>)
                    }
                    <td><button onClick={e => { this.clickEditHandler(item) }}> Edit </button></td>
                    <td><button onClick={e => { this.clickDeleteHandler(item) }}>Delete</button></td>
                </tr>,
            ))
    }
    renderHeadings = (item, index) => {
        return (
            <th key={index}>{item}</th>)
    }

    render() {

        if ((this.state.showEditForm === false) && (this.state.showInsertForm === false)) {
            return (
                < >
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {(this.props.tableData[0]).map((item, index) => this.renderHeadings(item, index))}
                                <th></th>
                                <th><button onClick={this.clickInsertHandler}>Insert row</button></th>
                            </tr>
                        </thead>

                        <tbody className="database">
                            {this.rendertable()}
                        </tbody>
                    </Table>

                </ >
            );
        }
        else if (this.state.showEditForm === true) {
            return (

                <Edit heading={this.props.tableData[0]} values={this.state.arr} tableName={this.props.tableName} />
            )
        }

        else if (this.state.showInsertForm === true) {
            console.log('true')
            return (

                <Insert heading={this.props.tableData[0]} values={this.state.arr} tableName={this.props.tableName} />
            )
        }
    }
}

export default databaseTable;