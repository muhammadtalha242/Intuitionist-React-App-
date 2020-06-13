import React, { Component } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';

class databaseTable extends Component {
    constructor() {
        super();
        this.state = {
            columns: [],
            data: []
        }

        this.renderHeadings = this.renderHeadings.bind(this);
    };
    rendertable = () => {

        this.setState({ data: this.props.tableData });

    }
    renderHeadings = () => {

        let c = Object.keys((this.props.tableData[0])).map((item, index) => {
            let o = {};
            o['field'] = item;
            o['title'] = item.toUpperCase()
            return o

        });
        console.log(c);
        this.setState({ columns: c });

    }

    componentDidMount = () => {
        this.renderHeadings()
        this.rendertable()

    }
    insert = (h) => {
        // h['table_name'] = this.props.tableName
        console.log(h)
        axios.post(`/${this.props.tableName[0].key}`, h)
            .then(response => {
                console.log('aa')
                console.log(response)
            }
            )
            .catch(error => {
                console.log('err')
                console.log(error.response)
            })

    }

    edit = (h) => {

        axios.patch(`/${this.props.tableName[0].key}/${h.id}`, h)
            .then(response =>
                console.log(response)
            )
            .catch(error => {
                console.log(error)
            })
    }

    delete = (h) => {

        axios.delete(`/${this.props.tableName[0].key}/${h.id}`)
            .then(response =>
                console.log(response)
            )
            .catch(error => {
                console.log(error)
            })
    }

    render() {

        return (
            <MaterialTable
                style={{ marginTop: "10%" }}
                title={this.props.tableName[0].value.charAt(0).toUpperCase() + this.props.tableName[0].value.slice(1)}
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            console.log('newData: ',newData)
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                                console.log(this.insert(newData))
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData, c) =>

                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                                this.edit(newData)
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                this.setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    console.log(oldData)
                                    return { ...prevState, data };
                                });
                                console.log(this.delete(oldData))

                            }, 600);
                        }),
                }}
            />)
    }
}

export default databaseTable;