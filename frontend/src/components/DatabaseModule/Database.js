import React, { Component } from 'react';
import './database.css';
import axios from "axios";
import DatabaseTable from './databaseTable'

class Database extends Component {
    constructor(props) {
        super(props);
        this.goTo= this.goTo.bind(this)
        this.state = {
            // tables: this.props.tables  // * DOESNOT WORK ??*
            table: [],
            componentShow: false,
            item: ''
        }

    };

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
                <div>
                </div>
                <div className='databaseTable'>
                    {this.state.componentShow ? <DatabaseTable tableData={this.state.table} tableName={this.state.tableName} /> : null}
                </div>
            </div>
        );
    }
}

export default Database;
