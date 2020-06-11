
//--------ALL FILES IN SDDP MODULES ARE SEPERATLY BUILD NOT INTEGRATED -----------

// IMPORTANT -->> dont not alter
const thermalInputCols = '!Num	...Nombre...	#Uni	Tipo	.PotIns	.GerMin	.GerMax	..Teif.	..Ih...	.CVaria	.MR.	Comb	...G1..	.CEsp.1	...G2..	.CEsp.2	...G3..	.CEsp.3	NAdF	...1	...2	...3	ComT	CTransp	StartUp	sfal	NGas	NuCC	..NombreCC..	CoefE.'.split("\t")
// IMPORTANT -->> dont not alter
const fileName = 'Thermal Input'

const InputSheets = require ("./InputSheets")
const inputSheets = new InputSheets()
const Excel = require('./Excel')
const excel = new Excel()


// const outputs = inputSheets.getData()
// var output = "outputs[0]"
// var powerplants = "outputs[1]"

exports.genrateThermalInput=(output,powerplants)=>{
    // output = obj
    // powerplants = plants




const getFCCrefFuelCost = (powerplant) => {
    const plantsArray = Object.values(output[Object.keys(output)[0]])[1][1]

    var out = 0
    plantsArray.forEach(plant => {


        if (plant.name === powerplant.plant_name) {
            const result = (plant.fccvalue[0]['rate'])
            const refFuel = powerplant.ref_fuel_cost

            out = result / refFuel


        }


    })
    return out

}

const getSDDPNumber =(powerplantName)=>{
    var sddp_code = null
    powerplants.forEach(plant => {


        if (plant.plant_name === powerplantName) {
            sddp_code = plant.sddp_code
        }


    })
   
    return sddp_code
}


// parentPlant :[children plant]



const creatingRowObject = (powerplant, thermalInputCols) => {
    const plantWithMultiFuels ={
        'KAPCO-B1':['KAPCO_B1_HSD','KAPCO_B1_LNG','KAPCO_B1_RFO'],
        'KAPCO-B3':['KAPCO_B3_HSD','KAPCO_B3_LNG'],
        'HALMORE':['HALMORE_Gas','Halmore_HSD'],
        'SAIF_POWER':['SAIF_PWR_HSD'],
        'SAPPHIRE':['SAPPHIRE_HSD'],
        'ORIENT_PWR':['ORNT_PWR_HSD'],
        'Engro_PWR':['Engro_PWR_SD'],
        'BHIKKI':['BHIKKI_HSD'],
        'BallokiRLNG':['Balloki_HSD'],
        'HAVELI_BHDSH':['HAVELIBH_HSD'],
        'NOORIABAD':['NURIABADPHSD'],
        'JMSH2_B2':['JMSH2_B2_LNG','JMSH2_B2_RFO'],
        'JMSH3_B2':['JMSH3_B2_LNG','JMSH3_B2_RFO'],
        'JMSH4_B2':['JMSH4_B2_LNG','JMSH4_B2_RFO'],
        'KOTRI_B3':['KOTRI_B3LNG'],
        'GUDDU_B3':['GUDDU_B3_RFO'],
        'MZFRGRH1_B1':['MGARH1_B1LNG'],
        'MZFRGRH2_B1':['MGARH2_B1RFO'],
        'MZFRGRH3_B1':['MGARH3_B1RFO'],
        'MZFRGRH4_B2':['MGARH4_B2RFO'],
        'MZFRGRH5_B3':['MGARH5_B3LNG'],
        'MZFRGRH6_B3':['MZFRGRH6_B3'],
        'SPS_FSD_B5':['G3SPSFsdFOB5'],
        'GTPS_FSD_B4':['GTPS_FSDB4LN'],
        'KAPCO-B2-132':['KAP_B2_132FO','KAP_B2_132HS','KAP_B2_132LN'],
        'KAPCO-B2-220':['KAP-B2-220LN','KAP-B2-220HS','KAP-B2-220FO']
    
    }
    
    
    
    
    
    
    
    const row = {}
    row[thermalInputCols[0]] = powerplant.sddp_code
    row[thermalInputCols[1]] = powerplant.plant_name
    row[thermalInputCols[2]] = 1
    row[thermalInputCols[3]] = inputSheets.getTipo(powerplant)
    row[thermalInputCols[4]] = powerplant.derated_capacity
    row[thermalInputCols[5]] = 0
    row[thermalInputCols[6]] = powerplant.derated_capacity
    row[thermalInputCols[7]] = (powerplant.forced_outages) / 8760
    row[thermalInputCols[8]] = (powerplant.forced_outages) / 8760
    row[thermalInputCols[9]] = inputSheets.getCvariables(powerplant) * 1000
    row[thermalInputCols[10]] = ((powerplant.fuel_type === 'Nuclear' || powerplant.fuel_type === 'Baggase') ? 1 : 0)
    row[thermalInputCols[11]] = powerplant.fuel_code
    row[thermalInputCols[12]] = 100
    row[thermalInputCols[13]] = getFCCrefFuelCost(powerplant)
    row[thermalInputCols[14]] = 0
    row[thermalInputCols[15]] = 0
    row[thermalInputCols[16]] = 0
    row[thermalInputCols[17]] = 0
    
    const plantName = powerplant.plant_name
    if (plantName in plantWithMultiFuels){
        

        row[thermalInputCols[18]] = plantWithMultiFuels[plantName].length //NAdf
        row[thermalInputCols[19]] = (plantWithMultiFuels[plantName][0] ? getSDDPNumber(plantWithMultiFuels[plantName][0])  : 0 )  //1
        row[thermalInputCols[20]] = (plantWithMultiFuels[plantName][1] ? getSDDPNumber(plantWithMultiFuels[plantName][1])  : 0 )
        row[thermalInputCols[21]] = (plantWithMultiFuels[plantName][2] ? getSDDPNumber(plantWithMultiFuels[plantName][2])  : 0 )  //3
 
    }
    else{
        
        row[thermalInputCols[18]] = 0 //NAdf
        row[thermalInputCols[19]] = 0  //1
        row[thermalInputCols[20]] = 0  //2
        row[thermalInputCols[21]] = 0   //3
    }
    row[thermalInputCols[22]] = 0
    row[thermalInputCols[23]] = 0
    row[thermalInputCols[24]] = 0
    row[thermalInputCols[25]] = 0
    row[thermalInputCols[26]] = 0
    row[thermalInputCols[27]] = 0
    row[thermalInputCols[28]] = 0
    row[thermalInputCols[29]] = 0   //coef (ONLY THIS IS LEFT)

    console.log("ROW OBJECT:", row)
    return row


}


const thermalPlants = inputSheets.extractPlants(powerplants, "Thermal");

// thermalPlants.map((item,index)=>{
   
    
//     if(item.plant_name === 'HALMORE'){
//         console.log("index: -------->>>",index)
        
//         console.log(item)
//         const row = creatingRowObject(item, thermalInputCols)

//     }
// })



console.log("THERMAL")
const workbook = excel.workbook()
const workSheet = excel.createSheet(workbook, fileName)
excel.worksheetColumns(workSheet, thermalInputCols)
thermalPlants.forEach(powerplant => {

    const row = creatingRowObject(powerplant, thermalInputCols)
    excel.worksheetAddRow(workSheet, row)

});


excel.writeFile(workbook, fileName)
}