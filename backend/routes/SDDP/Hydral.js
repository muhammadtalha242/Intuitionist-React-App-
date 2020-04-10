// IMPORTANT -->> dont not alter
const hydelInputCols = ' NUM	...Nombre...	.PV.	.VAA	.TAA	#Uni	Tipo	....Pot	.FPMed.	.QMin..	.QMax..	.VMin..	.VMax..	.VInic.	Min.V+T	..VNC..	..ICP..	...IH..	..FP1..	..Vol1.	..FP2..	..Vol2.	..FP3..	..Vol3.	..FP4..	..Vol4.	..FP5..	..Vol5.	.Area1.	..Vol1.	.Area2.	..Vol2.	.Area3.	..Vol3.	.Area4.	..Vol4.	.Area5.	..Vol5.	.Filt1.	..Vol1.	.Filt2.	..Vol2.	.Filt3.	..Vol3.	.Filt4.	..Vol4.	.Filt5.	..Vol5.	.Cota1.	.Vol1..	.Cota2.	.Vol2..	.Cota3.	.Vol3..	.Cota4.	.Vol4..	.Cota5.	.Vol5..	.Ev1	.Ev2	.Ev3	.Ev4	.Ev5	.Ev6	.Ev7	.Ev8	.Ev9	Ev10	Ev11	Ev12	tini	tfil	.faa	tare	.varea.	tfil	.vfiltr	F.Reg..	pVar	.ICV	C.Vert.	sfal	Cos.O&M	Irxh	RendT&G	.EA.	Niv.Jus	I	JuAr	I	.TurIn1	.TotIn1	.TurIn2	.TotIn2	.TurIn3	.TotIn3	.TurIn4	.TotIn4	.TurIn5	.TotIn5	H	V	.CFuga1	..Def1.	.CFuga2	..Def2.	.CFuga3	..Def3.	.CFuga4	..Def4.	.CFuga5	..Def5.	E	PHidTur	PHidVer'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Hydel Input'

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
    row[hydelInputCols[0]] = powerplant.sddp_code
    row[hydelInputCols[1]] = powerplant.plant_name
    row[hydelInputCols[2]] = 1
    row[hydelInputCols[3]] = inputSheets.getTipo(powerplant)
    row[hydelInputCols[4]] = powerplant.derated_capacity
    row[hydelInputCols[5]] = 0
    row[hydelInputCols[6]] = powerplant.derated_capacity
    row[hydelInputCols[7]] = (powerplant.forced_outages) / 8760
    row[hydelInputCols[8]] = (powerplant.forced_outages) / 8760
    row[hydelInputCols[9]] = inputSheets.getCvariables(powerplant) * 1000
    row[hydelInputCols[10]] = ((powerplant.fuel_type === 'Nuclear' || powerplant.fuel_type === 'Baggase') ? 1 : 0)
    row[hydelInputCols[11]] = powerplant.fuel_code
    row[hydelInputCols[12]] = 100
    row[hydelInputCols[13]] = getFCCrefFuelCost(powerplant)
    row[hydelInputCols[14]] = 0
    row[hydelInputCols[15]] = 0
    row[hydelInputCols[16]] = 0
    row[hydelInputCols[17]] = 0



    row[hydelInputCols[18]] = 0 //NAdf
    row[hydelInputCols[19]] = 0  //1
    row[hydelInputCols[20]] = 0  //2
    row[hydelInputCols[21]] = 0   //3

    row[hydelInputCols[22]] = 0
    row[hydelInputCols[23]] = 0
    row[hydelInputCols[24]] = 0
    row[hydelInputCols[25]] = 0
    row[hydelInputCols[26]] = 0
    row[hydelInputCols[27]] = 0
    row[hydelInputCols[28]] = 0
    row[hydelInputCols[29]] = 0   //coef (ONLY THIS IS LEFT)

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
