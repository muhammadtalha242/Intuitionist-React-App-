// / IMPORTANT -->> dont not alter
const renewableInputCols = 'NUM	Nombre	Data	#Uni	.PotIns	..FatOpe	ProbFal	O&MCost	Spilling penalty'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Renewable-Modification Inputx'

const InputSheetsModification = require("./InputSheetsModification")
const Excel = require('../Excel')

// const outputs = require('../SampleData/output+powerplants(renewable_modifications).json')
// const output = outputs[0]
// const powerplants = outputs[1]

exports.genrateRenewableModification = (output, powerplants) => {

    const inputSheetsModification = new InputSheetsModification(output)
    const excel = new Excel()


    const creatingRowObject = (powerplant, renewableInputCols) => {


        const row = {}
        renewableInputCols.forEach(col => {
            switch (col) {
                case 'NUM':
                    row[col] = powerplant.sddp_code
                    break;
                case "Nombre":
                    row[col] = powerplant.plant_name
                    break;
                case "Data":
                    row[col] = powerplant.cod
                    break;
                case "#Uni":
                    row[col] = 1
                    break;

                case ".PotIns":
                    row[col] = powerplant.derated_capacity
                    break;
                case "..FatOpe":
                    row[col] = 1
                    break;
                default:
                    row[col] = 0
            }
        })

        // console.log("ROW OBJECT:", row)
        return row


    }








    const renewablePlants = inputSheetsModification.extractPlants(powerplants, "Renewable");


    console.log("renewable MODIFICATION")
    const workbook = excel.workbook()
    const workSheet = excel.createSheet(workbook, fileName)
    excel.worksheetColumns(workSheet, renewableInputCols)
    renewablePlants.forEach(powerplant => {

        const row = creatingRowObject(powerplant, renewableInputCols)
        excel.worksheetAddRow(workSheet, row)

    });


    excel.writeFile(workbook, fileName)

}