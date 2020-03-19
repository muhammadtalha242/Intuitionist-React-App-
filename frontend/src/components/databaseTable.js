import React, { Component } from 'react';
import '../database.css';
import { Table } from 'react-bootstrap';
import axios from "axios";
class databaseTable extends Component {
    constructor() {
        super();
        this.state = {
            table: [],
        }
    };

    renderItems = (item, index) => {
        return (
            <tr key={index}>
                <td>{item}</td>
            </tr>
        )
    }

    render() {
        return (

            <div className='databaseTable'>
                <Table>
                    <thead>
                        
                            here
                        
                        {(this.props.kuchbhi).map((item, index) => this.renderItems(item, index))}
                    </thead>
                    {/* 
                        <tbody>
                            {(this.state.table[0]).map((item, index) => this.renderItems(item, index))}
                        </tbody> */}
                </Table>

            </div>


        );
    }
}

export default databaseTable;