const BaseService = require('./BaseService')
const CommercialParamterRepository = require('../data/CommercialParamterRepository')
const logger = require('../util/logger')
const CalculationService = require('../services/CalculationService');

module.exports = class CommercialParamter extends BaseService {
  constructor() {
    super();
    this.cpRepo = new CommercialParamterRepository();
    this.calculationService = new CalculationService();
  }
  async getCommercialParameters(){
    let results = await this.cpRepo.getAllCommercialParameters();
    let commpara = []
    const excludedcommercialParameters = ['fcc', 'interest_foreign_quarter', 'outstanding_principle_foreign_quarter', 'outstanding_principle_local_quarter', 'interest_local_quarter']

    results.forEach(res =>{
        let value= res.dataValues.commercial_parameter_name
        if(!excludedcommercialParameters.includes(value)){
            commpara.push(value)
        }
        
        // return value
    })
    return commpara
  }
  
  async getRefValues(){
    let commercialParamsArray =await this.getCommercialParameters()
    console.log("CALLING getRefValues", )
    let year =1
    
    let out=await this.cpRepo.getRefValues(commercialParamsArray, year)
    console.log('CALLed getRefValues')
    return out    
  }
}
