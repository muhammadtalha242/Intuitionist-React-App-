import React, { Component } from 'react'
import {endpoints} from '../Api/Endpoints'
import './database.css';
import axios from "axios";
class Insert extends Component {
    constructor() {
        super();
        this.state = {
            obj: {},
            value: '',
            values: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.inputFields = this.inputFields.bind(this)

    };


    onChange = (e, index) => {

        var arr = [...this.state.values]
        arr[index] = e.target.value

        this.setState({
            values: arr
        });

    }
    inputFields = () => {
        var arr1 = [];
        var v;
        (this.props.heading).map((item, index) => {
            v = this.state.values[index];
            if (item.includes('id')) {
                arr1.push(<div>
                    <label>{item}</label>
                    <input key={index} name={item} type="text" value={0} onChange={this.onChange} id={item} disabled ></input>
                </div>)
            }
            else {
                arr1.push(<div>
                    <label>{item}</label>
                    <input key={index} name={item} type="text" value={v} onChange={e => { this.onChange(e, index) }} id={item}></input>
                </div>)
            }
        })
        return (
            <div>
                {arr1}
            </div>
        )

    }

    onSubmit(e) {
        e.preventDefault()
        this.state.obj['table_name'] = this.props.tableName;
        (this.props.heading).map((item, index) =>
            this.state.obj[item] = this.state.values[index]
        )
        console.log(this.state.obj)

        axios.post(endpoints.database.POSTinsertRow, this.state.obj)
            .then(response =>
                console.log(response)
            )
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return (
            <div className='databaseTable'>
                {this.inputFields()}
                <button type='submit' onClick={this.onSubmit}>Insert</button>
            </div >);
    }
}

export default Insert;