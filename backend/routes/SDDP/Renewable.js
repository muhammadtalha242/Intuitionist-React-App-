// IMPORTANT -->> dont not alter
const renewableInputCols = '!Num	Name	Bus	Type	#Uni	PotIns	FatOpe	ProbFal	SFal	Stat.	O&MCost	Spilling penalty'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Renewable Inputx'

const InputSheets = require("./InputSheets")
const inputSheets = new InputSheets()
const Excel = require('./Excel')
const excel = new Excel()




exports.genraterenewableInput=(output,powerplants)=>{
    // output = obj
    // powerplants = plants


// const outputs = inputSheets.getData()
// const output = outputs[0]
// const powerplants = outputs[1]


const creatingRowObject = (powerplant, renewableInputCols) => {
    

    const row = {}
    renewableInputCols.forEach(col => {
        switch (col) {
            case '!Num':
                row[col] = powerplant.sddp_code
                break;
                case "Name":
                    row[col] = powerplant.plant_name
                    break;
                    case "Bus":
                    row[col] = powerplant.bus_sddp_code
                    break;
            case "Stat.":
                row[col] = powerplant.sddp_code
                break;
            case "#Uni":
                row[col] = 1
                break;
            case "Type":
                row[col] = inputSheets.getTipo(powerplant)
                break;
            case "PotIns":
                row[col] = powerplant.derated_capacity
                break;
            case "FatOpe":
                row[col] = 1
                break;
            
            default:
                row[col] = 0
        }
    })

    // console.log("ROW OBJECT:", row)
    return row


}


const renewablePlants = inputSheets.extractPlants(powerplants, "Renewable");

// renewablePlants.map((item,index)=>{


//     if(item.plant_name === 'HALMORE'){
//         console.log("index: -------->>>",index)

//         console.log(item)
//         const row = creatingRowObject(item, renewableInputCols)

//     }
// })



console.log("renewable")
const workbook = excel.workbook()
const workSheet = excel.createSheet(workbook, fileName)
excel.worksheetColumns(workSheet, renewableInputCols)
renewablePlants.forEach(powerplant => {

    const row = creatingRowObject(powerplant, renewableInputCols)
    excel.worksheetAddRow(workSheet, row)

});


excel.writeFile(workbook, fileName)
}