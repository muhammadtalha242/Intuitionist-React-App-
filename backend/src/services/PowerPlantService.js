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

        // Restructured Results
        let filteredCollection = this.restructureOutput(collection)
        // After Indexation formulas
        let finalResults = this.formulasService.getIndexValue(filteredCollection,assumptions)
        
        return finalResults;
    }


    restructureOutput(filteredCollection) {
        var restructuredOutput = [];
        filteredCollection.forEach(collection => {
            const plant_name = collection.plant_name
            const years = collection.years
            const plantYear = `${plant_name}+${years}`
            if (plant_name in restructuredOutput) {
                if (plantYear in restructuredOutput[plant_name]) {
                    restructuredOutput[plant_name][plantYear].commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, "rate": collection.rate })
                }
                else {
                    const powerplant = { ...collection };
                    delete powerplant.commercial_parameter_name;
                    delete powerplant.paramCombineID;
                    delete powerplant.rate;
                    powerplant.commercialparameters = [
                        {
                            commercial_parameter_name: collection.commercial_parameter_name,
                            rate: collection.rate,
                        },
                    ];
                    restructuredOutput[plant_name][plantYear] = powerplant
                }
            }
            else {
                restructuredOutput[plant_name] = {}
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

