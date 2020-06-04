// / IMPORTANT -->> dont not alter
const hydelInputCols = 'NUM	Nombre	Data	#Uni	QMin	QMax	Min.V+T	FPMed	VMax	Pot	ICP	IH	IEA	AfxTur	Afl1	Afl2	Afl3	Afl4	Afl5	TurIn1	TurIn2	TurIn3	TurIn4	TurIn5	Outflow1	Outflow2	Outflow3	Outflow4	Outflow5	Elevation1	Elevation2	Elevation3	Elevation4	Elevation5'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Hydel-Modification Inputx'

const InputSheetsModification = require ("./InputSheetsModification")
const Excel = require('../Excel')

const outputs = require('../SampleData/output+powerplants(hydel_modifications).json')
const output = outputs[0]
const powerplants = outputs[1]
const inputSheetsModification = new InputSheetsModification(output)
const excel = new Excel()


const creatingRowObject = (powerplant, hydelInputCols) => {


    const row = {}
    hydelInputCols.forEach(col => {
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
            
            case "QMax":
                row[col] = powerplant.derated_capacity
                break;
            case "FPMed":
                row[col] = 1
                break;
            case "Pot":
                row[col] = powerplant.derated_capacity
                break;
            
            case "VMax":
                row[col] = 500
                break;
           
            default:
                row[col] = 0
        }
    })

    console.log("ROW OBJECT:", row)
    return row


}






const hydelPlants = inputSheetsModification.extractPlants(powerplants, "Hydel");


console.log("hydel MODIFICATION")
const workbook = excel.workbook()
const workSheet = excel.createSheet(workbook, fileName)
excel.worksheetColumns(workSheet, hydelInputCols)
hydelPlants.forEach(powerplant => {

    const row = creatingRowObject(powerplant, hydelInputCols)
    excel.worksheetAddRow(workSheet, row)

});


excel.writeFile(workbook, fileName)