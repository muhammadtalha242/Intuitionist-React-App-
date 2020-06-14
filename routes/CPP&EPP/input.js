var express = require('express');
var app = express();
var router = express.Router();
var db = require('../DataBaseModule/config')


const power_plant_name = "select plant_name from powerplant";
const commercial_parameter = "select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='commercialparameters'"
// create dropdowns
function getPlantName(myArray) {
    arr = []
    var i;
    for (i = 0; i < myArray.length; i++) {
        arr.push(myArray[i]['plant_name'])
    }
    return arr;
};
function getCommercialParameterName(array) {
    arr = []
    var i;

    for (i = 0; i < array.length; i++) {

        commercialParameter = array[i]['column_name']
        console.log(commercialParameter)
        if (commercialParameter == 'commercial_id') {

        }
        else {
            index = commercialParameter.lastIndexOf("_")
            commercialParameter = commercialParameter.substring(0, index)
            arr.push(commercialParameter)
        }

    }
    return arr;
};

router.get('/powerplant', (req, res) => {
    db.query(power_plant_name, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            results = getPlantName(results)
            return res.json({
                results
            })
        }
    }
    )
});


router.get('/commercialparameters', (req, res) => {
    db.query(commercial_parameter, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            console.log(results)
            results = getCommercialParameterName(results)
            return res.json({
                results
            })
        }
    }
    )
});

module.exports = {
    router: router
}
