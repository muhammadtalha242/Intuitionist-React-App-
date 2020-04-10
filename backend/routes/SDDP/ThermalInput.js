// IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	...Nombre...	#Uni	Tipo	.PotIns	.GerMin	.GerMax	..Teif.	..Ih...	.CVaria	.MR.	Comb	...G1..	.CEsp.1	...G2..	.CEsp.2	...G3..	.CEsp.3	NAdF	...1	...2	...3	ComT	CTransp	StartUp	sfal	NGas	NuCC	..NombreCC..	CoefE.'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal Input'


const Excel = require('./Excel')
const excel = new Excel()
var outputs = require('./output+powerplants.json')
// console.log(outputs[1])

const output = outputs[0]

const powerplants = outputs[1]

// exports.genrateThermalInput=(obj,plants)=>{
//     output = obj
//     powerplants = plants
// }


const extractThermalPlants = (powerplants) => {
    const thermalPowerPlants = []
    powerplants.forEach(plant => {
        if (plant.fuel_category === 'Thermal') {
            thermalPowerPlants.push(plant)
        }
    })

    return thermalPowerPlants
}

const getFCCrefFuelCost = (powerplant)=>{
    const plantsArray = Object.values(output["VOM_Local"])[1][1]
    var out = 0
    plantsArray.forEach(plant => {
            
        
        if(plant.name === powerplant.plant_name){
            const result= (plant.fccvalue[0]['rate'])
            const refFuel = powerplant.ref_fuel_cost
            
            out = result /refFuel
            

        }
        

    })
    return out

}

const getCvariables = (powerplant) => {
    const cvarArray = ["VOM_Local", "VOM_Foreign", "WaterCharges", "LimeStoneCharges", "AshDisposalCost", "VariableRate", "VariableCostJetty"]

    var sum =0
    cvarArray.forEach(cvar => {
        
        const plantsArray = Object.values(output[cvar])[1][1]
        
        plantsArray.forEach(plant => {
            
            
            if(plant.name === powerplant.plant_name){
                var index = plant.index
                if(typeof(plant.index)==='object' &&(plant.index !== null)){
                    index = index[0]["rate"]
                }
                sum = sum + index
                
            }
        })

    })
    return sum
}

const creatingRowObject = (powerplant,thermalInputCols) => {
    const row={}
    row[thermalInputCols[0]] = powerplant.sddp_code
    row[thermalInputCols[1]] = powerplant.plant_name
    row[thermalInputCols[2]] = 1
    row[thermalInputCols[3]]  = ((powerplant.year > 0)? 1: 0)
    row[thermalInputCols[4]] = powerplant.derated_capacity
    row[thermalInputCols[5]] = 0
    row[thermalInputCols[6]] = powerplant.derated_capacity
    row[thermalInputCols[7]] = (powerplant.forced_outages)/8760
    row[thermalInputCols[8]] = (powerplant.forced_outages)/8760
    row[thermalInputCols[9]] = getCvariables(powerplant) * 1000
    row[thermalInputCols[10]] = ((powerplant.fuel_type === 'Nuclear' || powerplant.fuel_type === 'Baggase' ) ? 1 : 0 )
    row[thermalInputCols[11]] = powerplant.fuel_code
    row[thermalInputCols[12]] = 100
    row[thermalInputCols[13]] = getFCCrefFuelCost (powerplant)
    row[thermalInputCols[14]] = 0
    row[thermalInputCols[15]] = 0
    row[thermalInputCols[16]] = 0
    row[thermalInputCols[17]] = 0
    row[thermalInputCols[18]] = 0 //NAdf
    row[thermalInputCols[19]] = 0  //1
    row[thermalInputCols[20]] = 0  //2
    row[thermalInputCols[21]] = 0   //3
    row[thermalInputCols[22]] = 0   
    row[thermalInputCols[23]] = 0
    row[thermalInputCols[24]] = 0
    row[thermalInputCols[25]] = 0
    row[thermalInputCols[26]] = 0
    row[thermalInputCols[27]] = 0
    row[thermalInputCols[28]] = 0
    row[thermalInputCols[29]] = 0   //coef

    console.log("ROW OBJECT:",row)
    return row


}
const thermalPlants = extractThermalPlants(powerplants);
// getCvariables(powerplants[0])
// creatingRowObject(powerplants[1],thermalInputCols)




// find all the plants where plant fuel type = thermal

console.log("THERMAL")
const workbook =excel.workbook()
const workSheet = excel.createSheet(workbook,fileName)
excel.worksheetColumns(workSheet,thermalInputCols)
thermalPlants.forEach(powerplant => {

    const row = creatingRowObject(powerplant,thermalInputCols)
    excel.worksheetAddRow(workSheet,row)

});


excel.writeFile(workbook, fileName)
