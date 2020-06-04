// / IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	Nombre	Data	#Uni	GerMin	GerMax	ICP	IH	CVaria	CTransp	CoefE'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal-Modification Inputx'

const InputSheetsModification = require("./InputSheetsModification")
const Excel = require('../Excel')

const outputs = require('../SampleData/output+powerplants(thermal_modifications).json')
const output = outputs[0]
const powerplants = outputs[1]

exports.genrateThermalModification = (output, powerplants) => {

    const inputSheetsModification = new InputSheetsModification(output)
    const excel = new Excel()


    const creatingRowObject = (powerplant, thermalInputCols) => {
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
                    row[col] = powerplant.cod
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
                    row[col] = inputSheetsModification.getCvariables(powerplant) * 1000
                    break;
                case "CoefE":
                    row[col] = 1
                    break;

                default:
                    row[col] = 0
            }
        })

        // console.log("ROW OBJECT:", row)
        return row

    }







    const thermalPlants = inputSheetsModification.extractPlants(powerplants, "Thermal");


    console.log("THERMAL MODIFICATION")
    const workbook = excel.workbook()
    const workSheet = excel.createSheet(workbook, fileName)
    excel.worksheetColumns(workSheet, thermalInputCols)
    thermalPlants.forEach(powerplant => {

        const row = creatingRowObject(powerplant, thermalInputCols)
        excel.worksheetAddRow(workSheet, row)

    });


    excel.writeFile(workbook, fileName)
}