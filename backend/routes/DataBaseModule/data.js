var input = require('../CPP&EPP/input');
var express = require('express');
var app = express();
var routerr = express.Router();
var db = require('./config');

function edit(arr) {
    var tableValues = []
    tableValues.push(Object.keys(arr[0]))
    for (var i = 0; i < arr.length; i++) {
        tableValues.push(Object.values(arr[i]))
    }
    return tableValues
}

routerr.get('/', (req, res) => {
    var tableNames = []
    var links = []
    console.log('bbb')
    tables = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'cppa_database'"


    db.query(tables)
        .then(results => {
            for (var i = 0; i < results[0].length; i++) {
                a = results[0][i]['table_name']
                b = '/' + results[0][i]['table_name']
                tableNames.push(a)
                links.push(b)

            }
            console.log(links)
            res.send(tableNames)

        })
        .catch(err => {
            res.send(err)
        })

})


routerr.post('/link', (req, res) => {
    var tableLink = (req.body.item).replace(/'/, "");
    console.log(tableLink)
    table = "SELECT * from tablename".replace(/tablename/, tableLink)

    db.query(table, { replacements: [tableLink] })
        .then(results => {
            console.log(results)
            var a = edit(results[0])
            res.send(a)
        })
        .catch(err => {
            res.send(err)
        })

}
)

module.exports = routerr

