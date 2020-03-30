import React, { Component } from 'react';
import '../database.css';
import axios from "axios";
class Edit extends Component {
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

    componentDidMount() {
        this.setState({
            values: this.props.values[0]
        })
    }

    onChange = (e, index) => {
        console.log(e.target.value)

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
            console.log(v)
            if (item.includes('id')) {
                arr1.push(<div>
                    <label>{item}</label>
                    <input key={index} name={item} type="text" value={this.props.values[0][index]} onChange={this.onChange} id={item} disabled ></input>
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
        const arr = [];
        this.state.obj['table_name'] = this.props.tableName;
        (this.props.heading).map((item) =>
            arr.push(item)
        )
        for (var i = 0; i < arr.length; i++) {
            this.state.obj[arr[i]] = document.getElementById(arr[i]).value
        }

        axios.post("/update/edit", this.state.obj)
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
                <button type='submit' onClick={this.onSubmit}>Edit</button>
            </div >);
    }
}

export default Edit;