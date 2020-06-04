// 
const express = require('express');
const app = express();
const router = express.Router();
const indexFunctions = require("./IndexFormulas");
const Helper = require("./Helper");
const connection = require('../DataBaseModule/config');        //Data connection
const commercialParametersFile = require("./CommercialParameters");


const Sequelize = require("sequelize");
const StoreResults = require("../../models/simulation")(connection, Sequelize)


const output = {}
async function addingRefYear(powerPlants, assumptions, commercialParameters) {
    console.log("Inside printit---------------------")

    // console.log("powerPlants.length: ", powerPlants.length)
    // console.log("assumptions.length: ", assumptions.length)
    // console.log("assumptions.length: ", commercialParameters)



    //loop over and find cod and calculate ref year and add it back in that powerplant object
    var x = {}
    for (var _ = 0; _ < commercialParameters.length; _++) {
        const commercialParameter = commercialParameters[_]

        x = await getDataBaseValue(commercialParameter, assumptions, powerPlants)

    }
    return x

}

async function getDataBaseValue(commercialParameter, assumptions, powerPlants) {

    for (var x = 0; x < assumptions.length; x++) {
        const assumption = assumptions[x]


        const assumptionDate = new Date(assumption[0])
        const allAssumptions = assumption[1]

        var out = {}
        const numberOfPowerPlants = powerPlants.length
        for (var i = 0; i < numberOfPowerPlants; i++) {
            //Powerplant to use for calculation
            var powerplant = powerPlants[i]


            //Calculating Ref Year 
            const cod = new Date(powerplant.cod)
            const refyear = Helper.getRefYear(cod, assumptionDate)
            powerplant['year'] = refyear



            if ((commercialParameter == 'interestforeignannual' || commercialParameter == 'interestlocalannual') && (powerplant.year <= 30)) {
                if (commercialParameter == 'interestlocalannual') {
                    var rate_query = "SELECT ilq.rate  as InterestLocalQuarter_rate , olq.rate as OutstandingPrincipleLocalQuarter_rate from InterestLocalQuarter as ilq join OutstandingPrincipleLocalQuarter as olq on (ilq.id= olq.id )  where ilq.year = :year and ilq.id in(SELECT InterestLocalQuarter_id from commercialparameters cp where cp.power_plant_name =:powerplant_name);"
                }
                else if (commercialParameter == 'interestforeignannual') {
                    var rate_query = "SELECT ifq.rate  as interestforeignquarter_rate , opq.rate as OutstandingPrincipleForeignQuarter_rate from interestforeignquarter as ifq join OutstandingPrincipleForeignQuarter as opq on (ifq.id= opq.id )  where ifq.year = :year and ifq.id in(SELECT interestforeignquarter_id from commercialparameters cp where cp.power_plant_name =:powerplant_name);"
                }
            }
            else {

                var rate_query = `SELECT rate from ${commercialParameter} where year =:year and id in(SELECT ${commercialParameter + "_id"} from commercialparameters  where  power_plant_name =:powerplant_name);`
            }
            var fcc_query = `SELECT rate from fcc where year =1 and id in(SELECT fcc_id from commercialparameters  where  power_plant_name =:powerplant_name);`

            out = await databaseComm(commercialParameter, fcc_query, rate_query, powerplant, assumptionDate, allAssumptions)
        }

    }
    return out


}
// Function to run query and return structured Out object
async function databaseComm(commercialParameter, fcc_query, rate_query, powerplant, assumptionDate, allAssumptions) {
    var refRate = [{ rate: 0 }]
    var indexValue = 0
    var fccRate = [{ rate: 0 }]
    if (powerplant.year > 0) {
        refRate = await connection.query(rate_query, { replacements: { year: powerplant.year, powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })
        fccRate = await connection.query(fcc_query, { replacements: { powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })
        indexValue = indexFunctions.getIndexValue(commercialParameter, allAssumptions, powerplant, refRate)
    }

    console.log("refRate:-------------------->>>>", refRate)
    console.log("fccRate:-------------------->>>>", fccRate)


    const outputPowerPlant = {}
    outputPowerPlant['name']= powerplant.plant_name
    outputPowerPlant['year']= powerplant.year

    outputPowerPlant["refvalue"] = refRate,
        outputPowerPlant["fccvalue"] = fccRate,

        outputPowerPlant["index"] = indexValue



// Structure of output object 
// {
//     commercialParameter_1:{
//         date_1:{
//             [{All powerplant objects}]
//         }
//         date_2:{
//             [{All powerplant objects}]
//         }
//     },
//     commercialParameter_2:{
//         date_1:{
//             [{All powerplant objects}]
//         }
//         date_2:{
//             [{All powerplant objects}]
//         }
//     }
// }




    if (commercialParameter in output) {

        if (assumptionDate in output[commercialParameter]) {
            output[commercialParameter][assumptionDate][1].push(outputPowerPlant)
        }
        else {
            var completeArray=[[allAssumptions]]
            var powerPlants = []
            powerPlants.push(outputPowerPlant)
            completeArray.push(powerPlants)

            output[commercialParameter][assumptionDate] = completeArray

        }
    }
    else {
        var obj = {}
        var completeArray=[[allAssumptions]]
        var powerPlants = []
        powerPlants.push(outputPowerPlant)
        completeArray.push(powerPlants)
        obj[assumptionDate] = completeArray
        output[commercialParameter] = obj
    }

    return output
}

// ------IMPORTANT-------
const query = 'select * from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on(powerplant.technical_parameter_id =technicalparameters.technical_parameter_id);'

router.post("/", (req, res) => {

    //Request object -> assumption Date and assumption values
    const assumptions = req.body["assumption"]
    console.log("assumptions.length: ", assumptions.length)

    var out = {}
    connection.query(query, { type: connection.QueryTypes.SELECT }).then(async powerPlants => {
        // Getting all the commercial parameters from database  
        const commercialParameters = await commercialParametersFile.getCommercialParameters()


        //Main function
        out = await addingRefYear(powerPlants, assumptions, commercialParameters)


    }).then(() => {
        console.log("At the end")
        
        Excel.createExcel(out)
        
        console.log("After computations")
        res.json(out)
        
        StoreResults.create({ user_id: 1, results: out }).then(response => {
            console.log('database updated')
        }).catch(error => console.log('ERROR: ', error))

    }).then(()=>{
        out = {}
    })
})

module.exports = router

