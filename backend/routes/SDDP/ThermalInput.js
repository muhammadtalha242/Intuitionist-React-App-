// IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	...Nombre...	#Uni	Tipo	.PotIns	.GerMin	.GerMax	..Teif.	..Ih...	.CVaria	.MR.	Comb	...G1..	.CEsp.1	...G2..	.CEsp.2	...G3..	.CEsp.3	NAdF	...1	...2	...3	ComT	CTransp	StartUp	sfal	NGas	NuCC	..NombreCC..	CoefE.'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal Input'

var ouput={}
const Excel = require('./Excel')
const excel = new Excel()
var output= require('./response.json')
console.log(output)

const extractThermalPlants= (output)=>{
    let thermalPlantArray = Object.values(output.AnnualSecurityCost)[0]
    thermalPlantArray = thermalPlantArray.map(plant =>{
        if(plant.fuel_category==="Thermal") return plant    
    })  
    return thermalPlantArray
}
const getCvariables =( powerplant )=>{  
    const cvarArray =["VOM_Local","VOM_Foreign",  "WaterCharges", "LimeStoneCharges",  "AshDisposalCost", "VariableRate", "VariableCostJetty"]
    // var sum =0
    cvarArray.forEach(cvar =>{
        const plansArray =Object.values(output[cvar])[0]
        plansArray.forEach(plant =>{
        if(plant.plant_name === powerplant.plant_name){
            console.log("powerplant. ", plant.plant_name)
            console.log("powerplant.cvar ", plant.index)

        }
    })

    })
    //    arrayOfAllPlantsForAvaiable

    
    console.log("CVAR: ",)
}

// const creatingRowObject = (powerplant,thermalInputCols) => {
//     const row={}
//     row[thermalInputCols[0]] = powerplant.sddp_code
//     row[thermalInputCols[1]] = powerplant.plant_name
//     row[thermalInputCols[2]] = 1
//     row[thermalInputCols[3]]  = ((powerplant.year > 0)? 1: 0)
//     row[thermalInputCols[4]] = powerplant.derated_capacity
//     row[thermalInputCols[5]] = 0
//     row[thermalInputCols[6]] = powerplant.derated_capacity
//     row[thermalInputCols[7]] = (powerplant.forced_outages)/8760
//     row[thermalInputCols[8]] = (powerplant.forced_outages)/8760
//     getCvariables(powerplant)

//     console.log("ROW OBJECT:",row)

// }
// const thermalPlants =extractThermalPlants(output)


// thermalPlants.forEach(powerplant => {
    
//     creatingRowObject(powerplant,thermalInputCols)
// });
// exports.genrateThermalInput=(obj)=>{
//     output = obj
// }
// 

// find all the plants where plant fuel type = thermal

// console.log("THERMAL")
// const workbook =excel.workbook()
// const workSheet = excel.createSheet(workbook,fileName)
// excel.worksheetColumns(workSheet,thermalInputCols)
// excel.writeFile(workbook, fileName)
