import React, { Component } from 'react'
import Database from './Database'
import DatabaseTable from './databaseTable'
import Error from './Error'
import './database.css';
import { Table } from 'react-bootstrap';
import axios from "axios";

export class DataBaseModule extends Component {
    constructor() {
        super();
        this.state = {
            tables: [],
            table: [],
            componentShow: false,
            showError: false,
            item: '',
            errorMessage:'',
        }

    };
    componentDidMount = () => {
        axios.get('/data', this.state)
            .then(response => {
                this.setState({
                    componentShow:true,
                    tables: response.data
                })
            })
            .catch(error => {
                console.log('ERROR');
                console.log(error);
                // How can we show it here?
                // {<Error error={error}/>}


                this.setState({
                    showError:true,
                    errorMessage: error
                })
            })
    }
    render() {
        const errorPage = (this.state.showError?<Error error={this.state.errorMessage}/>:null)

        return (
            <div>
                
                <Database tables={this.state.tables}/>
                
                {/* Display error page */}
                {errorPage}
            </div>
        )
    }
}

export default DataBaseModule
