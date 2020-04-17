const Sequelize = require("sequelize");
const connection = require('../DataBaseModule/config');        //Data connection
const StoreResults = require("../../models/simulation")(connection,Sequelize)
const express = require('express');
const router = express.Router();
const ThermInput = require('./ThermalInput')
const HydelInput = require("./Hydel")
const RenewableInput = require("./Renewable")
const ThermalModificationInput = require("./Modification Sheets/ThermalModification")

const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name);'

router.get("/", async (req,res)=>{
    const simulation_id=req.query.id
    console.log(simulation_id)
    const response = await StoreResults.findByPk(simulation_id)
    const result= response.dataValues.results
    const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT }) 
    // ThermInput.genrateThermalInput(result,powerPlants)
    // HydelInput.genrateHydelInput(result,powerPlants)
    // RenewableInput.genrateRenewableInput(result,powerPlants)
    ThermalModificationInput.genrateThermalModifications(result,powerPlants)
    res.status(200).send('Done')

})

module.exports = router