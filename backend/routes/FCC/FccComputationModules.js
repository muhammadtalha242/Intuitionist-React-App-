// 
const express = require('express');
const app = express();
const router = express.Router();
const indexFunctions = require("./IndexFormulas")
const Excel = require("./GenrateExcel")
const Helper = require("./Helper")
const connection = require('../DataBaseModule/config');        //Data connection
const FuelType = require("./FuelTypes").fuelType;




//We have all the powerplant in this array and also its corrosponding economic parameters


//++++++++++Dummy data to test+++++////////////

const output = {}
async function addingRefYear(powerPlants, assumptions, FuelType) {
    console.log("Inside printit---------------------")

    console.log("powerPlants.length: ", powerPlants.length)
    console.log("assumptions.length: ", assumptions.length)



    //loop over and find cod and calculate ref year and add it back in that powerplant object
    var x = {}
    // var FuelTypeNameArray = Object.keys(FuelType)
    for (var _ = 0; _ < FuelType.length; _++) {
        const fuelType = FuelType[_]

        x = await getDataBaseValue(fuelType, assumptions, powerPlants)


        console.log("after-3")

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
            console.log("powerplant",powerplant)
            const cod = new Date(powerplant.cod)
            console.log("COD", cod)
            powerplant['year'] = Helper.getRefYear(cod,assumptionDate)
            var refRate =[{rate:0}]
            var indexValue =[{rate:0}]
            if(powerplant.year<=0){
                
                creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)


            }else{
                if (powerplant == 'PORT_QASIM' || powerplant == 'HUANENG_ENRG' || powerplant == 'HUBCO_CPIH_1')  {
                    refRate=[{rate:0}]
                    console.log("refRate: ", refRate)
                    indexValue =indexFunctions.getIndexValueByPlant(fuelType, allAssumptions, powerplant)
                    creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)

                }
                else {
                    console.log("HERER")
    
                    var rate_query = `SELECT rate from fcc where year =:year and id in(SELECT FCC_id from commercialparameters  where  power_plant_name =:powerplant_name);`
                    out = await databaseComm(fuelType, rate_query, powerplant, assumptionDate, allAssumptions)
    
                }
    
            }
            
        }

    }
    console.log("OUT: ", out)
    return out


}

async function databaseComm(fuelType, rate_query, powerplant, assumptionDate, allAssumptions) {
    var refRate = await connection.query(rate_query, { replacements: { year: powerplant.year, numberOfPowerPlants: 261 + 1, powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })
    const indexValue = calculateIndexValue(fuelType, allAssumptions, powerplant, refRate)
    return creatingOutputObject(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)
}

calculateIndexValue=(fuelType, allAssumptions, powerplant, refRate)=>{
    console.log("refRate:-------------------->>>>", refRate)
    return indexFunctions.getIndexValue(fuelType, allAssumptions, powerplant, refRate)
}
creatingOutputObject=(fuelType,assumptionDate, allAssumptions, powerplant, indexValue, refRate)=>{
    const outputPowerPlant={...powerplant}
    // outputPowerPlant['name']= powerplant.plant_name
    outputPowerPlant['assumption_date']= assumptionDate
    outputPowerPlant['assumptions']= allAssumptions

    outputPowerPlant["refvalue"] = refRate,
    outputPowerPlant["index"] = indexValue
    console.log("outputPowerPlant:  .........................", outputPowerPlant)

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
const query = 'select * from powerplant join economicparameters on (powerplant.economic_parameters_id=economicparameters.economic_parameters_id) join technicalparameters on(powerplant.technical_parameter_id =technicalparameters.technical_parameter_id);'

router.post("/", (req, res) => {

    const assumptions = req.body["assumption"]
    console.log(req.body)
    console.log("assumptions.length: ",assumptions.length)
    // console.log(assumptions)
    var out = {}
    connection.query(query, { type: connection.QueryTypes.SELECT }).then(async powerPlants => {
        console.log("before-1")
        // const FuelType = await FuelTypeFile.getFuelType()
        console.log("using: ",FuelType)

        out = await addingRefYear(powerPlants, assumptions, FuelType)
        console.log("after-1")

    }).then(() => {
        console.log("At the end")
        
        Excel.createExcel(out)
        

    }).then(()=>{
        out = {}
    })
})

module.exports = router

