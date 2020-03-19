var input = require('./input');
var express = require('express');
var app = express();
var routerr = express.Router();
var db = require('../config');

var tableNames = []
var tableValues = []

function edit(arr) {
    tableValues.push(Object.keys(arr[0]))
    for (var i = 0; i < 20; i++) {
        tableValues.push(Object.values(arr[i]))
    }
    console.log(tableValues)
    return tableValues
}

routerr.get('/', (req, res) => {
    console.log('bbb')
    tables = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'cppag_database'"


    db.query(tables)
        .then(results => {
            for (var i = 0; i < results[0].length; i++) {
                console.log(results[0][i]['TABLE_NAME'])
                tableNames.push(results[0][i]['TABLE_NAME'])
            }
            res.send(tableNames)

        })
        .catch(err => {
            res.send(err)
        })
})

routerr.get('/table', (req, res) => {
    table = "SELECT * from annualsecuritycost"


    db.query(table)
        .then(results => {
            res.send(edit(results[0]))
        })
        .catch(err => {
            res.send(err)
        })
})



module.exports = routerr

