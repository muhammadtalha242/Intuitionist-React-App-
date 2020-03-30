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
            componentShow: false,
            item: ''
        }

    };

    componentDidMount = () => {
        axios.get('/data', this.state)
            .then(response => {
                this.setState({
                    tables: response.data
                },
                    // console.log(response.data),
                    // console.log(this.state.tables)
                )
            })
            .catch(error => {
                console.log('bbello')
                console.log(error)
            })
    }


    goTo = (ite, event) => {
        //Call query from backend to generate the database table on clicking a particular row
        axios.post('/data/link', {
            item: ite
        })
            .then(response =>
                this.setState({
                    table: response.data,
                    componentShow: true,
                    tableName: ite
                })
            )
            .catch(error => {
                console.log('bbello')
                console.log(error)
            })
    }

    //Generate rows of the particular table to render
    renderItems = (item, index) => {

        return (
            //Add event handler on click on the particular cell
            <tr key={index}>
                <td onClick={e => { this.goTo(item, e) }}>{item}</td>
            </ tr>
        )
    }

    render() {

        return (
            <div>
                <div className='tableOptions'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Table Names</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.tables).map((item, index) => this.renderItems(item, index))}
                        </tbody>
                    </Table>
                </div>
                <div className='databaseTable'>
                    {this.state.componentShow ? <DatabaseTable tableData={this.state.table} tableName={this.state.tableName} /> : null}
                </div>
            </div>
        );
    }
}

export default Database;