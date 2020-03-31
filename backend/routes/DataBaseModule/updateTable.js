var express = require('express');
var app = express();
var router = express.Router();
var db = require('./config')
// const bus = require('../../models/bus')
const User = require('../../models/User')


router.post('/edit', (req, res, next) => {
    const model = require('../models/' + Object.values(req.body)[0])
    set = {}
    where = {}

    for (var i = 1; i < Object.keys(req.body).length; i++) {
        if (!(Object.keys(req.body)[i].includes('id'))) {
            set[Object.keys(req.body)[i]] = Object.values(req.body)[i]
        }
        else {
            where[Object.keys(req.body)[i]] = Object.values(req.body)[i]
        }
    }
    model.update(
        set,
        { returning: true, where: where }
    )
        .then(response => {
            console.log('done')
            console.log(response)
        })
        .catch(next)

})

router.post('/delete', (req, res, next) => {
    var tableName = Object.values(req.body)[0];
    const model = require('../models/' + Object.values(req.body)[0])
    where = {}
    for (var i = 1; i < Object.keys(req.body).length; i++) {
        if (Object.keys(req.body)[i].includes('id')) {
            where[Object.keys(req.body)[i]] = Object.values(req.body)[i]
        }
    }
    model.destroy({
        where: where
    })
    var column
    var tableName = tableName.replace(/'/, "");
    for (var i = 1; i < Object.keys(req.body).length; i++) {
        if (Object.keys(req.body)[i].includes('id')) {
            column = Object.keys(req.body)[i].replace(/'/, "");
        }
    }
    table = "SELECT MAX(c) FROM t".replace(/c/, column).replace(/t/, tableName)
    var a
    db.query(table, { replacements: [column, tableName] })
        .then(results => {
            console.log(Object.values(results[0][0]))
            a = Object.values(results[0][0])
            autoincrement = "ALTER TABLE t AUTO_INCREMENT = n;".replace(/n/, a).replace(/t/, tableName)
            console.log(a[0])
            db.query(autoincrement, { replacements: [tableName, a] })
                .then(results => {
                    console.log(results)
                })
                .catch(err => {
                    res.send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })
})


router.post('/insert', (req, res, next) => {

    const model = require('../models/' + Object.values(req.body)[0])
    delete req.body['table_name']
    return model.create(req.body).then(console.log('done'));
})

module.exports = router
