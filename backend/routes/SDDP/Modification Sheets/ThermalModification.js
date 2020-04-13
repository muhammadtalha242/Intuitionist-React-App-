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