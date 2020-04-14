import React, { Component } from 'react'
import PersistentDrawerLeft from './PersistentDrawerLeft'
import DatabaseTable from './databaseTable'
import Error from './Error'
import Spinner from '../Spinner/spinnericon'
import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Header from '../header'
// import Footer from '../footer'
import axios from "axios";

export class DataBaseModule extends Component {
    constructor(props) {
        super(props);
        this.testVarible = "null";
        this.state = {
            tables: [],
            table: [],
            componentShow: false,
            showError: false,
            item: '',
            errorMessage: '',
            tableName: '',
            open: false
        }

    };
    componentDidMount = () => {
        axios.get('/data', this.state)
            .then(response => {
                this.setState({
                    componentShow: false,
                    tables: response.data
                })
            })
            .catch(error => {
                console.log('API-> ERROR');
                console.log(error);


                // How can we show it here?
                // {<Error error={error}/>}

                this.setState({
                    showError: true,
                    errorMessage: 'Status Code :500'
                })
            })
    }

    showSpinner = (l) => {
        this.setState({
            open: l
        })
    }

    goTo = (tableName, open) => {
        this.showSpinner(open)
        //Call query from backend to generate the database table on clicking a particular row
        axios.post('/data/link', {
            item: tableName
        })
            .then(response =>
                this.setState({
                    table: response.data,
                    componentShow: true,
                    open: !open,
                    tableName: tableName
                })
            )
            .catch(error => {
                console.log('bbello')
                console.log(error)
            })
    }
    render() {

        const errorPage = (this.state.showError ? <Error error={this.state.errorMessage} /> : null)
        this.testVarible = (this.state.open ? <Backdrop open={this.state.open}>
            <Spinner />
            {/* <CircularProgress color="inherit" /> */}
        </Backdrop> : this.state.componentShow ? <DatabaseTable tableData={this.state.table} tableName={this.state.tableName} /> : null)

        return (
            <div>
                {/* <Header/> */}

                <PersistentDrawerLeft tables={this.state.tables} goTo={this.goTo} databasetable={this.testVarible} />

                {/* Display error page */}
                {errorPage}


                {/* <Footer/> */}
            </div>
        )
    }
}

export default DataBaseModule
