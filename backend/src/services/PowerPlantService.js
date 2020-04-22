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



        let assumptioDates = assumptions.map(assumption => {
            const assumptionDate = assumption[0]
            return assumptionDate
        })

        let collection = await this.ppRepo.getAllData(assumptioDates);

        let filteredCollection = JSON.parse(JSON.stringify(collection));

        filteredCollection = this.restructureOutput(filteredCollection)  
        return filteredCollection;
    }


    restructureOutput(filteredCollection) {
        let restructuredOutput = []
        filteredCollection.forEach(collection => {
            let doseNotexists = true
            let existsName = false


            restructuredOutput.forEach(arr => {
                if(arr.includes(collection)){
                    console.log("Collection all")
                    doseNotexists = false
                }
                arr.forEach(plant => {
                    
                    if (plant.plant_name === collection.plant_name && plant.years === collection.years) {
                        plant.commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate })
                        existsName = false
                        doseNotexists = false
    
                    }
                    else if (plant.plant_name === collection.plant_name && plant.years !== collection.years) {
                        existsName = true
                        doseNotexists = false

                    }
                    else {
                        existsName = false
                        doseNotexists = true
                    }
                })
                if (existsName) {

                    const powerplant = { ...collection }

                    delete powerplant.commercial_parameter_name
                    delete powerplant.paramCombineID
                    delete powerplant.rate

                    powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]

                    arr.push(powerplant)

                    existsName = false
                    doseNotexists = false

                }
            })
            if (doseNotexists) {
                const powerplant = { ...collection }

                delete powerplant.commercial_parameter_name
                delete powerplant.paramCombineID
                delete powerplant.rate

                powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]

                restructuredOutput.push([powerplant])
                doseNotexists = false
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

