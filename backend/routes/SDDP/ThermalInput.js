// IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	...Nombre...	#Uni	Tipo	.PotIns	.GerMin	.GerMax	..Teif.	..Ih...	.CVaria	.MR.	Comb	...G1..	.CEsp.1	...G2..	.CEsp.2	...G3..	.CEsp.3	NAdF	...1	...2	...3	ComT	CTransp	StartUp	sfal	NGas	NuCC	..NombreCC..	CoefE.'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal Input'


const Excel = require('./Excel')
const excel = new Excel()
var output= require('./output.json')

const extractThermalPlants= (output)=>{
    let thermalPlantArray = Object.values(output.AnnualSecurityCost)[0]
    thermalPlantArray = thermalPlantArray.map(plant =>{
        if(plant.fuel_category==="Thermal") return plant.plant_name
    })  
    console.log(thermalPlantArray)
}
extractThermalPlants(output)
// exports.genrateThermalInput=(obj)=>{
//     output = obj
// }


//find all the plants where plant fuel type = thermal

// console.log("THERMAL")
// const workbook =excel.workbook()
// const workSheet = excel.createSheet(workbook,fileName)
// excel.worksheetColumns(workSheet,thermalInputCols)
// excel.writeFile(workbook, fileName)
