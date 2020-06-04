const Sequelize = require("sequelize");
const connection = require('../DataBaseModule/config');        //Data connection
const StoreResults = require("../../models/simulation")(connection, Sequelize)
const express = require('express');

module.exports = class SddpService {

    constructor() {

    } 
    async getThermalById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const ThermInput = require('./ThermalInput')

        ThermInput.genrateThermalInput(result, powerPlants)

        return res.send([result, powerPlants])

    }
    async getHydelById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const Hydel = require('./Hydel')

        Hydel.genratehydelInput(result, powerPlants)

        return res.send([result, powerPlants])

    }
    async getRenewableById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const Renewable = require('./Renewable')

        Renewable.genraterenewableInput(result, powerPlants)

        return res.send([result, powerPlants])

    }

    async getHydelModificationById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const HydelModification = require('./Modification Sheets/HydelModification')

        HydelModification.genrateHydelModification(result, powerPlants)

        return res.send([result, powerPlants])

    }
    async getThermalModificationById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const ThermalModification = require('./Modification Sheets/ThermalModification')

        ThermalModification.genrateThermalModification(result, powerPlants)

        return res.send([result, powerPlants])

    }
    async getRenewableModificationById(req, res){
    
        const query = 'select powerplant.*, technicalparameters.*, economicparameters.* ,tbc.sddp_code as bus_sddp_code  from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on (powerplant.technical_parameter_id = technicalparameters.technical_parameter_id)  left join transmissionbusconfiguration as tbc on (tbc.generator_name = powerplant.plant_name) ;'
        const powerPlants = await connection.query(query, { type: connection.QueryTypes.SELECT })
        const simulation_id = req.query.id
        console.log(simulation_id)
        const response = await StoreResults.findByPk(simulation_id)
        const result = response.dataValues.results
        const RenewableModification = require('./Modification Sheets/RenewableModification')

        RenewableModification.genrateRenewableModification(result, powerPlants)

        return res.send([result, powerPlants])

    }

    getRoutes() {

        let router = express.Router();
        router.get('/renewableSheet', this.getRenewableById)
        router.get('/thermalSheet', this.getThermalById)
        router.get('/hydelSheet', this.getHydelById)
        router.get('/hydelModSheet', this.getHydelModificationById)
        router.get('/renewableModSheet', this.getRenewableModificationById)
        router.get('/thermalModSheet', this.getThermalModificationById)
        
        return router;
    }
}
// router.get("/", async (req, res) => {
//     const simulation_id = req.query.id
//     console.log(simulation_id)
//     const response = await StoreResults.findByPk(simulation_id)
//     const result = response.dataValues.results
//     res.send([result, powerPlants])
//     ThermInput.genrateThermalInput(result, powerPlants)

// })

// module.exports = router