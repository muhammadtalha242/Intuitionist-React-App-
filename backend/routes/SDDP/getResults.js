const Sequelize = require("sequelize");
const connection = require('../DataBaseModule/config');        //Data connection
const StoreResults = require("../../models/simulation")(connection,Sequelize)
const express = require('express');
const router = express.Router();
const ThermInput = require('./ThermalInput')

router.get("/", (req,res)=>{
    const simulation_id=req.query.id
    console.log(simulation_id)
    StoreResults.findByPk(simulation_id).then(response=>{
        const result= response.dataValues.results
        console.log(result)
        res.send(result)
        ThermInput.genrateThermalInput(result)
    })

})

module.exports = router