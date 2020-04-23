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
        var restructuredOutput = []
        var nameArray = false
        filteredCollection.forEach(collection => {
            var internalArray = false
            var externalAray = false
            var updated = false


            restructuredOutput.forEach(arr => {

                arr.forEach(plant => {
                    if (plant.plant_name === collection.plant_name) {

                        nameArray = true

                        if (plant.years === collection.years) {

                            plant.commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate })
                            updated = true
                        } else {

                            internalArray = true
                        }
                    } else if (!updated && !internalArray) {
                        nameArray = false
                    }

                })
                if (internalArray && !updated) {

                    const powerplant = { ...collection }

                    delete powerplant.commercial_parameter_name
                    delete powerplant.paramCombineID
                    delete powerplant.rate

                    powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]

                    arr.push(powerplant)


                }

            })
            if (!nameArray) {
                const powerplant = { ...collection }

                delete powerplant.commercial_parameter_name
                delete powerplant.paramCombineID
                delete powerplant.rate

                powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]

                restructuredOutput.push([powerplant])
                nameArray = true
                externalAray = true


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

