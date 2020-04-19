const BaseService = require('./BaseService')
const CommercialParamterRepository = require('../data/CommercialParamterRepository')
const logger = require('../util/logger')
const CalculationService = require('../services/CalculationService');
const PowerPlantService = require('../services/PowerPlantService');

module.exports = class CommercialParamter extends BaseService {
    constructor() {
        super();
        this.cpRepo = new CommercialParamterRepository();
        this.calculationService = new CalculationService();
        this.powerplantService = new PowerPlantService();
        this.commercialParamsArray = null
        this.powerplantArray = null

    }


    async getCommercialParameters() {
        let results = await this.cpRepo.getAllCommercialParameters();
        let commpara = []
        const excludedcommercialParameters = ['fcc', 'interest_foreign_quarter', 'outstanding_principle_foreign_quarter', 'outstanding_principle_local_quarter', 'interest_local_quarter']

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
        let page = 3;
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
                return this.calculationService.getRefYear(plantCOD, assumptionDate)
            })

            console.log("powerplantName: ", powerPlant.plant_name)
            console.log("ref_years: ", ref_years)
            
            out.push(await this.cpRepo.getRefValues(this.commercialParamsArray, ref_years,powerPlant.plant_name))
            
        }


        console.log('done',out)
        return out
    }
}
