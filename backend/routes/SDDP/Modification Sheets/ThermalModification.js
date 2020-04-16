// / IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	Nombre	Data	#Uni	GerMin	GerMax	ICP	IH	CVaria	CTransp	CoefE'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal-Modification Inputx'

const InputSheetsModification = require ("./InputSheetsModification")
const Excel = require('../Excel')

const outputs = require('../SampleData/output+powerplants(thermal_modifications).json')
const output = outputs[0]
const powerplants = outputs[1]
const inputSheetsModification = new InputSheetsModification(output)
const excel = new Excel()


const creatingRowObject =(powerplant, thermalInputCols,date) =>{
    const plant_date = new Date(powerplant.change_date)
    const assumption_date = new Date(date)
    const row = {}
    thermalInputCols.forEach(col => {
        switch (col) {
            case '!Num':
                row[col] = powerplant.sddp_code
                break;
            case "Nombre":
                row[col] = powerplant.plant_name
                break;
            case "Data":
                row[col] = (powerplant.change_date)
                break;
            case "#Uni":
                row[col] = 1
                break;
            
            case "GerMax":
                row[col] = powerplant.derated_capacity
                break;
            case "ICP":
                row[col] = powerplant.forced_outages
                break;
            case "IH":
                row[col] = powerplant.forced_outages
                break;
            case "CTransp":

            if(plant_date>= assumption_date){
                console.log("0")
                console.log(`plant_date>= assumption_date ${plant_date>= assumption_date}`)
                row[col] =  'zero'
                break;
                
            }
            else{
                console.log("123")
                console.log(`plant_date>= assumption_date ${plant_date>= assumption_date}`)
                row[col] =  'not zero'

                break;
                
            }
            case "CoefE":
                row[col] = 1
                break;
           
            default:
                row[col] = 0
        }
    })

    console.log("ROW OBJECT:", row)
    return row

}







const thermalPlants = inputSheetsModification.extractPlants(powerplants, "Thermal");


console.log("THERMAL MODIFICATION")
const workbook = excel.workbook()
const workSheet = excel.createSheet(workbook, fileName)
excel.worksheetColumns(workSheet, thermalInputCols)
const nameOfCommparams = Object.keys(outputs[0])
const dateArray = Object.keys(output[nameOfCommparams[0]]).reverse()
console.log(dateArray)
dateArray.forEach(date=>{

    thermalPlants.forEach(powerplant => {

        const row = creatingRowObject(powerplant, thermalInputCols,date)
        excel.worksheetAddRow(workSheet, row)
    
    });
    
})



excel.writeFile(workbook, fileName)