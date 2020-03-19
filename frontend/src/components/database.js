import React, { Component } from 'react';
import '../database.css';
import { Table } from 'react-bootstrap';
import axios from "axios";
import DatabaseTable from './databaseTable'
class Database extends Component {
    constructor() {
        super();
        this.state = {
            tables: [],
            table: [],
            componentShow: false
        }

    };

    componentDidMount = () => {
        axios.get('/data', this.state)
            .then(response => {
                this.setState({
                    tables: response.data
                })
            })
            .catch(error => {
                console.log('bbello')
                console.log(error)
            })
    }

    renderItems = (item, index) => {
        return (
            <tr key={index}>
                <td>{item}</td>
            </tr>
        )
    }
    handleSubmit = () => {
        axios.get('/data/table', this.state)
            .then(response => {
                this.setState({
                    table: response.data,
                    componentShow: true
                })
                console.log(this.state.table[0])

            })
            .catch(error => {
                console.log('bbello')
                console.log(error)
            })
    }

    render() {

        return (

            <div className='tableOptions'>
                <Table>
                    <thead>
                        <tr>
                            <th>Table Names</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.tables).map((item, index) => this.renderItems(item, index))}
                    </tbody>
                </Table>

                <button onClick={this.handleSubmit}>Click</button>
                {this.state.componentShow ? <DatabaseTable kuchbhi={this.state.table[0]} /> : null}
            </div>




        );
    }
}

export default Database;