
module.exports = class FormulasService {
  constructor() {
  }

  getRefYear = (date_1, date_2) => {
    const difference = ((date_2.getFullYear() - date_1.getFullYear()) * 12) + (date_2.getMonth() - date_1.getMonth());
    var refYear = 0
    if (difference < 0) {
      refYear = 0
    }
    else if ((difference => 0) && (difference < 12)) {
      refYear = 1
    }
    else if (difference => 12) {
      if (difference % 12 > 0) {
        refYear = Math.floor(difference / 12) + 1
      }
      else if (difference % 12 == 0) {
        refYear = Math.floor(difference / 12) + 1
      }
    }
    return refYear


  }

  getIndexValue(newOutputArray, powerPlant) {
    let result = newOutputArray.map(plant => {
      const commercialParameter = plant.commercial_parameter_name;
      const assumption = plant.assupmtions
      const ref_rate = plant.rate
      return this.IndexValue(commercialParameter, assumption, powerPlant, ref_rate)
    })
  }

  IndexValue = (commercialParameter, assumption, powerplant, rate) => {
    // const expectedAssumptions= commercialParameters[commercialParameter]
    // indexValues_3 =(assumption, ref_eco, ref_rate)
    // indexValues_5=(assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate)
    // indexValues_1=(ref_rate)


    // // SAVE:
    // interest_foreign_quarter
    // interest_local_quarter
    // outstanding_principle_foreign_quarter
    // outstanding_principle_local_quarter

    switch (commercialParameter) {


      case 'interest_foreign_annual':

        return InterestForeignAnnual(assumption, powerplant, rate)


      case 'interest_local_annual':
        return InterestLocalAnnual(assumption, powerplant, rate)

        

      case 'vom_local':
        return indexValues_3(assumption.dollar_parity, powerplant.local_cpi, ref_rate)

      case 'vom_foreign':
        return indexValues_5(assumption.dollar_parity, powerplant.us_cpi, powerplant.dollar_parity, powerplant.us_cpi, ref_rate)

      case 'water_charges':
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)

      case 'limestone_charges':
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)

      case 'ash_disposal_charges':
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)

      case 'escalable_component':
        return indexValues_5(assumption.dollar_parity, assumption.us_cpi, powerplant.dollar_parity, powerplant.us_cpi, ref_rate)

      case 'nonescalable_component_foreign':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'nonescalable_component_local':
        return indexValues_1(ref_rate)

      case 'fom_local':
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)

      case 'fom_foreign':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'sinosure':

        return indexValues_5(assumption.sinsoure_fee, assumption.dollar_parity, powerplant.sinosure_fee, powerplant.dollar_parity, ref_rate)

      case 'fixed_rate':
        return indexValues_1(ref_rate)

      case 'variable_rate':
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)

      case 'repayment_rmb':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)


      //CHECK
      case 'interest_rate_rmb':
        return intersestRateRMB(assumption.dollar_parity, powerplant.dollar_parity)

      case 'fixed_cost_jetty':
        return FixedCostJetty(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'variable_cost_jetty':
        return VariableCostJetty(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'fixed_fcc':
        return indexValues_1(ref_rate)

      case 'irsa_charges':
        return indexValues_1(ref_rate)

      case 'insurance':
        return indexValues_1(ref_rate)

      case 'fixedcostonworkingcapital':
        return indexValues_3(assumption.kibor, powerplant.kibor, ref_rate)

      case 'interest_charges_foreign':
        return indexValues_3(assumption.libor, powerplant.libor, ref_rate)

      case 'roe':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'roedc':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'wht':
        //(ROEDC + ROE) *0.075    
        const roe = indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
        const roedc = indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

        return (roe + roedc) * 0.075

      case 'annual_security_cost':
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)

      case 'proceed_from_cres':
        return indexValues_1(ref_rate)

      case 'dsra_cost':
        return indexValues_1(ref_rate)

      case 'interest_charges_local':  //interest_charges_local == interest_charges_kibor 
        return indexValues_3(assumption.kibor, powerplant.kibor, ref_rate)


      default:
        console.log("NO match")


      // return index_value

    }



    //Formula for variables with 3 parameters
    indexValues_3 = (assumption, ref_eco, ref_rate) => {
      const value = (assumption / ref_eco) * ref_rate;

      return value
    }

    //Formula for variables with 5 parameters
    indexValues_5 = (assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate) => {

      const value = ((assumption_1 / ref_eco_1) * (assumption_2 / ref_eco_2) * (ref_rate));

      return value
    }

    //Formula for variables with 1 parameters
    indexValues_1 = (ref_rate) => {
      const value = ref_rate

      return value
    }


    intersestRateRMB = (dollar_parity, Ref_dollar) => {
      const value = (dollar_parity / Ref_dollar)
      return value
    }

    FixedCostJetty = (assumption, ref_eco, ref_rate) => {
      const value = (1 + (((assumption / ref_eco) - 1) * 0.5)) * ref_rate
      return value
    }
    VariableCostJetty = (assumption, ref_eco, ref_rate) => {
      const value = (1 + (((assumption / ref_eco) - 1) * 0.6)) * ref_rate
      return value
    }

    InterestForeignAnnual = (assumption, powerplant, ref_rate) => {

      if (ref_rate.length != 4) {
        return 0
      }
      var sum = 0
      ref_rate.forEach(rate => {
        const interest = rate.interestforeignquarter_rate * (assumption.dollar_parity / powerplant.dollar_parity)
        const outstanding = rate.OutstandingPrincipleForeignQuarter_rate * assumption.dollar_parity
        const installed = (assumption.libor - powerplant.libor) / (powerplant.installed_capacity * powerplant.derated_capacity * 8670 * 1000)
        sum = interest + (outstanding * installed)
      })

      return sum / 4
    }

    InterestLocalAnnual = (assumption, powerplant, ref_rate) => {
      if (ref_rate.length != 4) {
        return 0
      }
      var sum = 0
      ref_rate.forEach(rate => {
        const interest = rate.InterestLocalQuarter_rate
        const outstanding = rate.OutstandingPrincipleLocalQuarter_rate * assumption.dollar_parity

        /// CONFORM IT 
        const installed = (assumption.libor - powerplant.libor) / (powerplant.installed_capacity * powerplant.derated_capacity * 8670 * 1000)
        /// GET IT CHECKED
        sum = interest + (outstanding * installed)

      })
      return sum / 4
    }

  }


// let pp = new PowerPlantRepository();
// console.log(pp.get(1));


// let get = async function (modelName, page) {
//   let baseRepo = new BaseRepository(modelName);
//   const response = await baseRepo.get(page);
//   return response;
// };

// let getById = function(req, res) {
//   const response = BaseRepository.getById(req, res);
//   return response;
// };

// let create = function(req, res) {
//   const response = BaseRepository.create(req, res);
//   return response;
// };

// let update = function(req, res) {
//   const response = BaseRepository.update(req, res);
//   return response;
// };

// let remove = function(req, res) {
//   const response = BaseRepository.remove(req, res);
//   return response;
// };

// module.exports = {
//   //   create create,
//   get get,
//   //   getById getById,
//   //   update update,
//   //   remove remove
// };
