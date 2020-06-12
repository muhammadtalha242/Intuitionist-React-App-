const express = require('express');
const app = express();
// const indexFunctions = require("./IndexFormulas")
// const Excel = require("./GenrateExcel")
const Helper = require("./Helper")
// const connection = require('../DataBaseModule/config');        //Data connection
// const commercialParametersFile = require("./CommercialParameters")

//Assumptions given by user 
//Parameters for computation -> CommercialParameters  or fuel parameters 

class Computations {

    constructor( assumptions, parameters) {
        // this.databaseConnection = databaseConnection
        this.assumptions = assumptions
        this.parameters = parameters

    }


    getAllPowerPlantsFromDatabase = async (databaseConnection) => {
        //IMPORTANT
        const query = 'select * from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on(powerplant.technical_parameter_id =technicalparameters.technical_parameter_id);'
        console.log("this is database connection ", databaseConnection)
        const PowerPlants= await databaseConnection.query(query, { type: databaseConnection.QueryTypes.SELECT })
        console.log(PowerPlants)
        return PowerPlants
    }

    addRefYear = (PowerPlants, assumption) => {

            const assumptionDate = new Date(assumption[0])
            PowerPlants.forEach(powerplant => {

                const cod = new Date(powerplant.cod)

                powerplant['year'] = Helper.getRefYear(assumptionDate, cod)
                
            });
        return PowerPlants
    }

    getCommercialParameterValueFromDatabase = async (query, powerplant) => {
        return connection.query(query, { replacements: { year: powerplant.year, numberOfPowerPlants: 261 + 1, powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })
    }

    createOutputObject = (powerplant, assumption, refRate, indexValue, parameter, existingObject) => {

        const outputPowerPlant = { ...powerplant }

        const assumptionDate = assumption[0]
        const assumptions = assumptions[1]

        outputPowerPlant['assumption_date'] = assumptionDate
        outputPowerPlant['assumptions'] = assumptions

        outputPowerPlant["refvalue"] = refRate,
            outputPowerPlant["index"] = indexValue
        console.log("outputPowerPlant:  .........................", outputPowerPlant)

        if (parameter in existingObject) {

            if (assumptionDate in existingObject[parameter]) {
                existingObject[parameter][assumptionDate].push(outputPowerPlant)
            }
            else {
                var y = []
                y.push(outputPowerPlant)
                existingObject[parameter][assumptionDate] = y
            }
        }
        else {
            var obj = {}
            var y = []
            y.push(outputPowerPlant)
            obj[assumptionDate] = y
            existingObject[parameter] = obj
        }

        return existingObject
    }
}

module.exports = Computations
