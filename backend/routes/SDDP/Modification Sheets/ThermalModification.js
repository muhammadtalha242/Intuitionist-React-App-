// / IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	Nombre	Data	#Uni	GerMin	GerMax	ICP	IH	CVaria	CTransp	CoefE'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal-Modification Inputx'

const InputSheetsModification = require("./InputSheetsModification")
const Excel = require('../Excel')

// const outputs = require('../SampleData/output+powerplants(thermal_modifications).json')
// const output = outputs[0]
// const powerplants = outputs[1]

exports.genrateThermalModifications = (outputs, powerplants) => {

    // thermalModification(outputs, powerplants)
}


const creatingRowObject = (powerplant, thermalInputCols, date) => {
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
                row[col] = (plant_date >= assumption_date ? plant_date : assumption_date)
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
            case "CVaria":
                row[col] = (plant_date >= assumption_date ? 0 : inputSheetsModification.getCvariables(powerplant) * 1000)
                break;
            case "CoefE.":
                row[col] = 1
                break;

            default:
                row[col] = 0
        }
    })

    console.log("ROW OBJECT:", row)
    return row

}






const thermalModification = (outputs, powerplants) => {
    const inputSheetsModification = new InputSheetsModification(outputs)

    const thermalPlants = inputSheetsModification.extractPlants(powerplants, "Thermal");

    const excel = new Excel()

    const workbook = excel.workbook()
    const workSheet = excel.createSheet(workbook, fileName)
    excel.worksheetColumns(workSheet, thermalInputCols)
    const nameOfCommparams = Object.keys(outputs[0])
    const dateArray = Object.keys(outputs[nameOfCommparams[0]]).reverse()
    console.log(dateArray)
    dateArray.forEach(date => {

        thermalPlants.forEach(powerplant => {

            const row = creatingRowObject(powerplant, thermalInputCols, date)
            excel.worksheetAddRow(workSheet, row)

        });

    })



    excel.writeFile(workbook, fileName)
}