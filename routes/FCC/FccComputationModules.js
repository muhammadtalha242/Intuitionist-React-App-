// 
const express = require('express');
const app = express();
const router = express.Router();
const indexFunctions = require("./IndexFormulas")
// const Excel = require("./GenrateFccExcel")
const Helper = require("./Helper")
const connection = require('../DataBaseModule/config');        //Data connection
const FuelType = require("./FuelTypes").fuelType;




//We have all the powerplant in this array and also its corrosponding economic parameters


//++++++++++Dummy data to test+++++////////////

const output = {}
async function addingRefYear(powerPlants, assumptions, FuelType) {
    


    //loop over and find cod and calculate ref year and add it back in that powerplant object
    var x = {}
    // var FuelTypeNameArray = Object.keys(FuelType)
    for (var _ = 0; _ < FuelType.length; _++) {
        const fuelType = FuelType[_]

        x = await getDataBaseValue(fuelType, assumptions, powerPlants)



    }
    return x

}

async function getDataBaseValue(fuelType, assumptions, powerPlants) {

    for (var x = 0; x < assumptions.length; x++) {

        const assumption = assumptions[x]

        const assumptionDate = new Date(assumption[0])
        const allAssumptions = assumption[1]

        var out = {}
        const numberOfPowerPlants = powerPlants.length
        for (var i = 0; i < numberOfPowerPlants; i++) {
            //Powerplant to use for calculation
            var powerplant = powerPlants[i]

            //powerplant to display
            const cod = new Date(powerplant.cod)
            powerplant['year'] = Helper.getRefYear(cod,assumptionDate)
            var refRate =[{rate:0}]
            var indexValue =[{rate:0}]
            if(powerplant.year<=0){
                
                creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)


            }else{
                if (powerplant == 'PORT_QASIM' || powerplant == 'HUANENG_ENRG' || powerplant == 'HUBCO_CPIH_1')  {
                    refRate=[{rate:0}]
                    indexValue =indexFunctions.getIndexValueByPlant(fuelType, allAssumptions, powerplant)
                    creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)

                }
                else {
    
                    var rate_query = `SELECT rate from fcc where year =:year and id in(SELECT FCC_id from commercialparameters  where  power_plant_name =:powerplant_name);`
                    out = await databaseComm(fuelType, rate_query, powerplant, assumptionDate, allAssumptions)
    
                }
    
            }
            
        }

    }
    return out


}

async function databaseComm(fuelType, rate_query, powerplant, assumptionDate, allAssumptions) {
    var refRate = await connection.query(rate_query, { replacements: { year: powerplant.year, numberOfPowerPlants: 261 + 1, powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })
    const indexValue = calculateIndexValue(fuelType, allAssumptions, powerplant, refRate)
    return creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)
}

calculateIndexValue=(fuelType, allAssumptions, powerplant, refRate)=>{
    return indexFunctions.getIndexValue(fuelType, allAssumptions, powerplant, refRate)
}
creatingOutputObject=(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)=>{
    const outputPowerPlant={...powerplant}
    // outputPowerPlant['name']= powerplant.plant_name
    outputPowerPlant['assumption_date']= assumptionDate
    outputPowerPlant['assumptions']= allAssumptions

    outputPowerPlant["refvalue"] = refRate,
    outputPowerPlant["index"] = indexValue

    if (fuelType in output) {

        if (assumptionDate in output[fuelType]) {
            output[fuelType][assumptionDate].push(outputPowerPlant)
        }
        else {
            var y = []
            y.push(outputPowerPlant)
            output[fuelType][assumptionDate] = y
        }
    }
    else {
        var obj = {}
        var y = []
        y.push(outputPowerPlant)
        obj[assumptionDate] = y
        output[fuelType] = obj
    }
    
    return output

}
 



// ------IMPORTANT-------
const query = 'select * from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on(powerplant.technical_parameter_id =technicalparameters.technical_parameter_id) limit 70;'

router.post("/", (req, res) => {

    const assumptions = req.body["assumption"]
    // console.log(assumptions)
    var out = {}
    connection.query(query, { type: connection.QueryTypes.SELECT }).then(async powerPlants => {
        // const FuelType = await FuelTypeFile.getFuelType()

        out = await addingRefYear(powerPlants, assumptions, FuelType)

    }).then(() => {
        
        // Excel.createfccExcel(out)
        

    }).then(()=>{
        out = {}
    })
})

module.exports = router

