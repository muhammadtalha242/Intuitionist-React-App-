const BaseService = require('./BaseService')
const PowerPlantRepository = require('../data/PowerPlantRepository')
const logger = require('../util/logger')
const FormulasService = require('./FormulasService');
module.exports = class PowerPlantService extends BaseService {
    constructor() {
        super();
        this.ppRepo = new PowerPlantRepository();
        this.formulasService = new FormulasService();
    }
    async getWithIncludes(page) {
        console.log("PPSERVICE");
        let collection = await this.ppRepo.getWithIncludes(page);
        let filteredCollection = JSON.parse(JSON.stringify(collection));

        return filteredCollection;
    }
    async getAllData(assumptions) {


        //Extracting dates from assumptios
        let assumptioDates = assumptions.map(assumption => {
            const assumptionDate = assumption[0]
            return assumptionDate
        })

        //Getting results from database
        let collection = await this.ppRepo.getAllData(assumptioDates);
        
        let fccCollection = await this.ppRepo.getFCCIndexValue();

        //addFccParameter Values
        let updatedCollection = this.fccParameter(fccCollection,collection)

        // Restructured Results
        let filteredCollection = this.restructureOutput(updatedCollection)
        // After Indexation formulas
        // let finalResults = this.formulasService.getIndexValue(filteredCollection,assumptions)
        
        return filteredCollection;
    }

    fccParameter(fccCollection, collectionX){
        const fccPlant ={}
        fccCollection.forEach(plant=>{
            fccPlant[plant.dataValues.power_plant_name] = plant.dataValues.rate
        })
        collectionX.forEach(plant =>{
            if(plant.commercial_parameter_name === 'fcc'){
                console.log("fccPlant[plant.plant_name]: ",fccPlant[plant.plant_name])
                plant.rate = fccPlant[plant.plant_name]
            }
        })
        return collectionX

    }

    // restructureOutput(filteredCollection) {
    //     var restructuredOutput = [];
    //     filteredCollection.forEach(collection => {
    //         const plant_name = collection.plant_name
    //         const years = collection.years
    //         const plantYear = `${plant_name}+${years}`
    //         if (plant_name in restructuredOutput) {
    //             if (plantYear in restructuredOutput[plant_name]) {
    //                 restructuredOutput[plant_name][plantYear].commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, "rate": collection.rate })
    //             }
    //             else {
    //                 const powerplant = { ...collection };
    //                 delete powerplant.commercial_parameter_name;
    //                 delete powerplant.paramCombineID;
    //                 delete powerplant.rate;
    //                 powerplant.commercialparameters = [
    //                     {
    //                         commercial_parameter_name: collection.commercial_parameter_name,
    //                         rate: collection.rate,
    //                     },
    //                 ];
    //                 restructuredOutput[plant_name][plantYear] = powerplant
    //             }
    //         }
    //         else {
    //             restructuredOutput[plant_name] = {}
    //         }

    //     })

    //     return restructuredOutput
    // }
    restructureOutput(filteredCollection) {
        var restructuredOutput = [];
        filteredCollection.forEach(collection => {
            const plant_name = collection.plant_name
            const years = collection.years
            const plantYear = `${plant_name}+${years}`
            // console.log('plantYear: ', plantYear)
            if (plant_name in restructuredOutput) {
                
                if (plantYear in restructuredOutput[plant_name]) {
                    // console.log('Third Step',restructuredOutput[plant_name])
                    restructuredOutput[plant_name][plantYear].push({ "commercial_parameter_name": collection.commercial_parameter_name, "rate": collection.rate })
                }
                else {
                    const p = {...collection}
    
                    p.commercialparameters = [
                        {
                            commercial_parameter_name: collection.commercial_parameter_name,
                            rate: collection.rate,
                        },
                    ];
                    restructuredOutput[plant_name][plantYear] = p.commercialparameters
                    // console.log('second STEP,restructuredOutput[plant_name][plantYear]:   ' , restructuredOutput)
                }
            }
            else {
                // restructuredOutput[plant_name] = {}
                // console.log('FIRST STEP pre =>   ' , restructuredOutput)
                const powerplant = { ...collection };
                delete powerplant.commercial_parameter_name;
                delete powerplant.paramCombineID;
                delete powerplant.rate;
    
                restructuredOutput[plant_name] = powerplant
                // console.log('FIRST STEP pre => ' , restructuredOutput)
                // console.log('FIRST STEP post => ' , restructuredOutput)
    
            }
    
        })
    
        return restructuredOutput
    }
    async getRefValues() {
        console.log("CALLING getRefValues")
        let out = await this.ppRepo.getRefValues()
        console.log('CALLed getRefValues')
        return out
    }
}

