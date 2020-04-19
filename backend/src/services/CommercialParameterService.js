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
  
  async getRefValues(){
    console.log("CALLING getRefValues")
    let out=await this.cpRepo.getRefValues()
    console.log('CALLed getRefValues')
    return out    
  }
}
