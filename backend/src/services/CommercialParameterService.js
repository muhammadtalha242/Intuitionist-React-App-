const BaseService = require('./BaseService')
const CommercialParamterRepository = require('../data/CommercialParamterRepository')
const logger = require('../util/logger')
const FormulasService = require('./FormulasService');
const CalculationsService = require('./CalculationsService');
const PowerPlantService = require('../services/PowerPlantService');

module.exports = class CommercialParamter extends BaseService {
    constructor() {
        super();
        this.cpRepo = new CommercialParamterRepository();
        this.formulasService = new FormulasService();
        this.calculationsService = new CalculationsService();
        this.powerplantService = new PowerPlantService();
        this.commercialParamsArray = null
        this.powerplantArray = null

    }


    async getCommercialParameters() {
        let results = await this.cpRepo.getAllCommercialParameters();
        let commpara = []
        const excludedcommercialParameters = ['fcc']

        results.forEach(res => {
            let value = res.dataValues.commercial_parameter_name
            if (!excludedcommercialParameters.includes(value)) {
                commpara.push(value)
            }

            // return value
        })
        return commpara
    }

    async getPlantsAndParameters() {
        let page = 1;
        this.commercialParamsArray = await this.getCommercialParameters() // Try cashing it

        this.powerplantArray = await this.powerplantService.getWithIncludes(page)

    }

    async getRefValues(assumptions) {
        await this.getPlantsAndParameters()
        console.log("assumptions: ", assumptions)
        let out = []

        for (var _ = 0; _ < this.powerplantArray.length; _++) {

            const powerPlant = this.powerplantArray[_]

            let ref_years = assumptions.map(assumption => {
                const assumptionDate = new Date(assumption[0])
                const plantCOD =  new Date(powerPlant.economicparameter.cod)
                return this.formulasService.getRefYear(plantCOD, assumptionDate)
            })

            console.log("powerplantName: ", powerPlant.plant_name)
            console.log("ref_years: ", ref_years)

            const queryOutput = await this.cpRepo.getRefValues(this.commercialParamsArray, ref_years,powerPlant.plant_name)
            out.push(this.calculationsService.getPlantsRefValue(assumptions,powerPlant,queryOutput))
        }


        console.log('done',out)
        return out
    }
}
