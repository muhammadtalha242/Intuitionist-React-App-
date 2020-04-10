const Sequelize = require("sequelize");
const connection = require('../DataBaseModule/config');        //Data connection
const StoreResults = require("../../models/simulation")(connection,Sequelize)
const express = require('express');
const router = express.Router();
const ThermInput = require('./ThermalInput')

const query = 'select * from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on(powerplant.technical_parameter_id =technicalparameters.technical_parameter_id);'

router.get("/", async (req,res)=>{
    const simulation_id=req.query.id
    console.log(simulation_id)
    const response = await StoreResults.findByPk(simulation_id)
    const result= response.dataValues.results
    const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT }) 
    res.send([result,powerPlants])
    ThermInput.genrateThermalInput(result,powerPlants)

})

module.exports = router