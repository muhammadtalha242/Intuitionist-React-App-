// IMPORTANT -->> dont not alter
const hydelInputCols = ' NUM	...Nombre...	.PV.	.VAA	.TAA	#Uni	Tipo	....Pot	.FPMed.	.QMin..	.QMax..	.VMin..	.VMax..	.VInic.	Min.V+T	..VNC..	..ICP..	...IH..	..FP1..	..Vol1.	..FP2..	..Vol2.	..FP3..	..Vol3.	..FP4..	..Vol4.	..FP5..	..Vol5.	.Area1.	..Vol1.	.Area2.	..Vol2.	.Area3.	..Vol3.	.Area4.	..Vol4.	.Area5.	..Vol5.	.Filt1.	..Vol1.	.Filt2.	..Vol2.	.Filt3.	..Vol3.	.Filt4.	..Vol4.	.Filt5.	..Vol5.	.Cota1.	.Vol1..	.Cota2.	.Vol2..	.Cota3.	.Vol3..	.Cota4.	.Vol4..	.Cota5.	.Vol5..	.Ev1	.Ev2	.Ev3	.Ev4	.Ev5	.Ev6	.Ev7	.Ev8	.Ev9	Ev10	Ev11	Ev12	tini	tfil	.faa	tare	.varea.	tfil	.vfiltr	F.Reg..	pVar	.ICV	C.Vert.	sfal	Cos.O&M	Irxh	RendT&G	.EA.	Niv.Jus	I	JuAr	I	.TurIn1	.TotIn1	.TurIn2	.TotIn2	.TurIn3	.TotIn3	.TurIn4	.TotIn4	.TurIn5	.TotIn5	H	V	.CFuga1	..Def1.	.CFuga2	..Def2.	.CFuga3	..Def3.	.CFuga4	..Def4.	.CFuga5	..Def5.	E	PHidTur	PHidVer'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Hydel Inputx'

const InputSheets = require("./InputSheets")
const inputSheets = new InputSheets()
const Excel = require('./Excel')
const excel = new Excel()




// exports.genratehydelInput=(obj,plants)=>{
//     output = obj
//     powerplants = plants
// }

const outputs = inputSheets.getData()
const output = outputs[0]
const powerplants = outputs[1]


const creatingRowObject = (powerplant, hydelInputCols) => {


    const row = {}
    hydelInputCols.forEach(col => {
        switch (col) {
            case ' NUM':
                row[col] = powerplant.sddp_code
                break;
            case "...Nombre...":
                row[col] = powerplant.plant_name
                break;
            case ".PV.":
                row[col] = powerplant.sddp_code
                break;
            case "#Uni":
                row[col] = 1
                break;
            case "Tipo":
                row[col] = inputSheets.getTipo(powerplant)
                break;
            case "....Pot":
                row[col] = powerplant.derated_capacity
                break;
            case ".FPMed.":
                row[col] = 1
                break;
            case ".QMax..":
                row[col] = powerplant.derated_capacity
                break;
            case ".VMin..":
                row[col] = 500
                break;
            case ".VMax..":
                row[col] = 500
                break;
            case ".VInic.":
                row[col] = 1
                break;
            case "F.Reg..":
                row[col] = 0.8
                break;
            case "Cos.O&M":
                row[col] = inputSheets.getCvariables(powerplant) * 1000
                break;
            default:
                row[col] = 0
        }
    })

    console.log("ROW OBJECT:", row)
    return row


}


const hydelPlants = inputSheets.extractPlants(powerplants, "Hydel");

// hydelPlants.map((item,index)=>{


//     if(item.plant_name === 'HALMORE'){
//         console.log("index: -------->>>",index)

//         console.log(item)
//         const row = creatingRowObject(item, hydelInputCols)

//     }
// })



console.log("hydel")
const workbook = excel.workbook()
const workSheet = excel.createSheet(workbook, fileName)
excel.worksheetColumns(workSheet, hydelInputCols)
hydelPlants.forEach(powerplant => {

    const row = creatingRowObject(powerplant, hydelInputCols)
    excel.worksheetAddRow(workSheet, row)

});


excel.writeFile(workbook, fileName)
