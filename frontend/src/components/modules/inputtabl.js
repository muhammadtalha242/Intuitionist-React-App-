import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputRow from "./InputRow";
import Button from '@material-ui/core/Button';
// import styles from './styles'

const styles = {
    root: {
        width: '55%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%'
    },
    container: {
        maxHeight: 550,
    }
};
class InputTable extends Component {


    constructor(props) {
        super();
        this.updateAssumptionArray = this.updateAssumptionArray.bind(this)
        this.sendFinalAssumptions = this.sendFinalAssumptions.bind(this)
        this.state = {
            objectArray: {},
            assumptionArray: [],
            columns: [{ id: 'year', label: 'Year', minWidth: 170 },
            { id: 'yearly', label: 'Yearly', minWidth: 100 },
            { id: 'monthly', label: 'Monthly', minWidth: 100 }],
            page: 0,
            rowsPerPage: 10
        }
    };

    componentDidMount = () => {
        console.log('=======:Render componentDidMount:========')
        this.setState({
            objectArray: this.props.objectArray
        })


    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('=======:Render componentwillreceiveProps:========')

        var currentDateObject = this.props.objectArray;
        if (!(JSON.stringify(currentDateObject) === JSON.stringify(nextProps))) {
            this.setState({
                objectArray: nextProps.objectArray
            })

        }
    }
    updateAssumptionArray(assumptions) {
        // var arr=[...this.state.assumptionArray]
        // arr.push(assumptions)
        this.setState({
            assumptionArray: assumptions
        })
    }

    sendFinalAssumptions() {
        this.props.getFinalAssumptions(this.state.assumptionArray)
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0
        })
    };



    render() {
        const { classes } = this.props
        console.log('=======:Render InputTable:========')
        console.log(Object.entries(this.state.objectArray).length)
        console.log("Object.entries(this.entries.dateObject): ", Object.entries(this.state.objectArray))
        return (
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {this.state.columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Object.entries(this.state.objectArray).map(item => <InputRow key={item[0]} year={item[0]} item={item[1]} updateAssumptionArray={this.updateAssumptionArray} />)}
                            <TableRow hover role="checkbox" tabIndex={-1}>
                                <TableCell><Button onClick={this.sendFinalAssumptions}>Send Assumptions</Button></TableCell>
                            </TableRow>
                            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow> */}

                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination

                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={Object.entries(this.state.objectArray).length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                /> */}
            </Paper>
        );
    }


}




export default withStyles(styles)(InputTable)
