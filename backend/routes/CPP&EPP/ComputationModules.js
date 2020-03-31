// 
const express = require('express');
const app = express();
const router = express.Router();
const indexFunctions = require("./IndexFormulas")
const Excel = require("./GenrateExcel")
const Helper = require("./Helper")
const connection = require('../DataBaseModule/config');        //Data connection
const commercialParameters = require("./CommercialParameters").commercialParameters




//We have all the powerplant in this array and also its corrosponding economic parameters


//++++++++++Dummy data to test+++++////////////

const powerPlants = [
    {
        plant_name: 'Mix(Captive)',
        power_plant_code: 19001,
        fca_code: '704',
        sddp_code: '299.0000',
        company: null,
        address: 'abcecfghijk',
        longitude: '69.466',
        latitude: '35.48',
        project_nature: 'Private',
        policy_reference: null,
        agreement_type: 'PPA',
        contract_type: 'Take and Pay',
        units: '1.0000',
        technical_parameter_id: 261,
        disco_id: 4,
        economic_parameters_id: 261,
        dollar_parity: '1.0000',
        us_cpi: '1.0000',
        local_cpi: '1.0000',
        cod: '2019-01-01',
        term: 30,
        end_year: 2045,
        kibor: '0.0000',
        libor: '0.0000',
        sinsoure_fee: '0.0100',
        rmb_rate: '0.0200',
        technology: 'CCGT',
        fuel_category: 'Thermal',
        fuel_code: 19,
        installed_capacity: '200.0000',
        derated_capacity: null,
        msl: '0.0000',
        scheduled_outages: '720.0000',
        forced_outages: '550.0000',
        auxilary_consumption: '20.0000',
        rate_emission_CO2: '1.9000',
        rate_emission_NOx: '1.9000',
        rate_emission_SOx: '1.7000',
        reserve_primary: '0.0000',
        reserve_secondary: '1.0000',
        reserve_tertiary: '1.0000',
        min_time_up: '3.0000',
        min_time_down: '0.5000',
        fuel_type: null,
        heat_reat_MSL: '0.5000',
        heat_rate_50: '0.6000',
        heat_rate_75: '0.7000',
        heat_rate_90: '0.8000',
        heat_rate_FL: '0.9000',
        ramp_up_rate: '0.0000',
        ramp_down_rate: null,
        repair_time_mean: '4.0000',
        repair_time_min: '1.0000',
        repair_time_max: '6.0000',
        ref_fuel_cost: null,
        startup_cost: null,
        availability_for_cp: null,
        fuel_calorific_value: null,
        synchronization_time: '2.0000',
    },
    {
        plant_name: 'Kashmir',
        power_plant_code: 7031,
        fca_code: null,
        sddp_code: '262.0000',
        company: null,
        address: 'abcecfghijk',
        longitude: '69.466',
        latitude: '35.48',
        project_nature: 'Private',
        policy_reference: null,
        agreement_type: 'PPA',
        contract_type: 'Take and Pay',
        units: '1.0000',
        technical_parameter_id: 228,
        disco_id: 4,
        economic_parameters_id: 228,
        dollar_parity: '105.0000',
        us_cpi: '245.5190',
        local_cpi: '216.6100',
        cod: '2020-07-01',
        term: 0,
        end_year: 2051,
        kibor: '0.0600',
        libor: '0.0000',
        sinsoure_fee: '0.0000',
        rmb_rate: '0.0200',
        technology: 'CCGT',
        fuel_category: 'Thermal',
        fuel_code: 7,
        installed_capacity: '40.0000',
        derated_capacity: '40.0000',
        msl: '0.0000',
        scheduled_outages: '720.0000',
        forced_outages: '550.0000',
        auxilary_consumption: '20.0000',
        rate_emission_CO2: '1.9000',
        rate_emission_NOx: '1.9000',
        rate_emission_SOx: '1.7000',
        reserve_primary: '0.0000',
        reserve_secondary: '1.0000',
        reserve_tertiary: '1.0000',
        min_time_up: '3.0000',
        min_time_down: '0.5000',
        fuel_type: null,
        heat_reat_MSL: '0.5000',
        heat_rate_50: '0.6000',
        heat_rate_75: '0.7000',
        heat_rate_90: '0.8000',
        heat_rate_FL: '0.9000',
        ramp_up_rate: '0.0000',
        ramp_down_rate: null,
        repair_time_mean: '4.0000',
        repair_time_min: '1.0000',
        repair_time_max: '6.0000',
        ref_fuel_cost: null,
        startup_cost: null,
        availability_for_cp: null,
        fuel_calorific_value: null,
        synchronization_time: '2.0000',
    }
]

const output = {}
async function addingRefYear(powerPlants, assumptions, commercialParameters) {
    console.log("Inside printit---------------------")

    console.log("powerPlants.length: ", powerPlants.length)
    console.log("assumptions.length: ", assumptions.length)



    //loop over and find cod and calculate ref year and add it back in that powerplant object
    var x = {}
    var commercialParametersNameArray = Object.keys(commercialParameters)
    for (var _ = 0; _ < commercialParametersNameArray.length; _++) {
        const commercialParameter = commercialParametersNameArray[_]

        x = await getDataBaseValue(commercialParameter, assumptions, powerPlants)


        console.log("after-3")

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

            //powerplant to display

            const cod = new Date(powerplant.cod)

            powerplant['year'] = Helper.getRefYear(assumptionDate, cod)


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

            out = await databaseComm(commercialParameter, rate_query, powerplant, assumptionDate, allAssumptions)
        }

    }
    return out


}

async function databaseComm(commercialParameter, rate_query, powerplant, assumptionDate, allAssumptions) {
    var refRate = await connection.query(rate_query, { replacements: { year: powerplant.year, numberOfPowerPlants: 261 + 1, powerplant_name: powerplant.plant_name }, type: connection.QueryTypes.SELECT })

    console.log("refRate:-------------------->>>>", refRate)
    const indexValue = indexFunctions.getIndexValue(commercialParameter, allAssumptions, powerplant, refRate)

    const outputPowerPlant={...powerplant}
    // outputPowerPlant['name']= powerplant.plant_name
    outputPowerPlant['assumption_date']= assumptionDate
    outputPowerPlant['assumptions']= allAssumptions

    outputPowerPlant["refvalue"] = refRate,
    outputPowerPlant["index"] = indexValue
    console.log("outputPowerPlant:  .........................", outputPowerPlant)

    if (commercialParameter in output) {

        if (assumptionDate in output[commercialParameter]) {
            output[commercialParameter][assumptionDate].push(outputPowerPlant)
        }
        else {
            var y = []
            y.push(outputPowerPlant)
            output[commercialParameter][assumptionDate] = y
        }
    }
    else {
        var obj = {}
        var y = []
        y.push(outputPowerPlant)
        obj[assumptionDate] = y
        output[commercialParameter] = obj
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
    // console.log(typeof(assumptions))
    var out = {}
    connection.query(query, { type: connection.QueryTypes.SELECT }).then(async stopp => {
        console.log("before-1")

        out = await addingRefYear(powerPlants, assumptions, commercialParameters)
        console.log("after-1")

    }).then(() => {
        console.log("At the end")
        
        Excel.createExcel(out)
        res.json(out)

    }).then(()=>{
        out = {}
    })
})

module.exports = router

