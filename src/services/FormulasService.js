const moment = require("moment")

module.exports = class FormulasService {
  constructor() { }

  getIndexValue(filteredCollection, assumptions) {
    // filteredCollection = Object.values(filteredCollection)
    for (var [collectionName, collection] of Object.entries(filteredCollection)) {

      for (var [plant_name, plant] of Object.entries(collection)) {

        const plantYear = plant.years

        const cod = moment(plant.cod)
        var updatedPlant = {}
        assumptions.findIndex(assumption => {
          const assumptionDate = moment(assumption[0])
          if (plantYear === ((assumptionDate.diff(cod, 'years') + 1))) {
            updatedPlant = this.IndexValue(
              assumption[1],
              plant

            );
          }
        })
        filteredCollection[collectionName][plant_name] = updatedPlant
      }
    }
    return filteredCollection;
  }

  IndexValue(assumption, powerplant) {
    // indexValues_3 =(assumption, ref_eco, rate)
    // indexValues_5=(assumption_1, assumption_2, ref_eco_1, ref_eco_2, rate)
    // indexValues_1=(rate)

    powerplant.commercialparameters.forEach(cp => {

      const commercialParameter = cp.commercial_parameter_name
      const rate = cp.rate

      var ref_value = 0
      switch (commercialParameter) {
        case 'interest_foreign_annual':

          ref_value = this.InterestForeignAnnual(assumption, powerplant)
          break
        case 'interest_local_annual':
          ref_value= this.InterestLocalAnnual(assumption, powerplant)
          break
        case "vom_local":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.local_cpi,
            rate
          );
          break;
        case "vom_foreign":
          ref_value = this.indexValues_5(
            assumption.dollar_parity,
            powerplant.us_cpi,
            powerplant.dollar_parity,
            powerplant.us_cpi,
            rate
          );
          break;
        case "water_charges":
          ref_value = this.indexValues_3(
            assumption.local_cpi,
            powerplant.local_cpi,
            rate
          );
          break;
        case "limestone_charges":
          ref_value = this.indexValues_3(
            assumption.local_cpi,
            powerplant.local_cpi,
            rate
          );
          break;
        case "ash_disposal_charges":
          ref_value = this.indexValues_3(
            assumption.local_cpi,
            powerplant.local_cpi,
            rate
          );
          break;
        case "escalable_component":
          ref_value = this.indexValues_5(
            assumption.dollar_parity,
            assumption.us_cpi,
            powerplant.dollar_parity,
            powerplant.us_cpi,
            rate
          );
          break;
        case "nonescalable_component_foreign":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "nonescalable_component_local":
          ref_value = this.indexValues_1(rate);
          break;
        case "fom_local":
          ref_value = this.indexValues_3(
            assumption.local_cpi,
            powerplant.local_cpi,
            rate
          );
          break;
        case "fom_foreign":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "sinosure":
          ref_value = this.indexValues_5(
            assumption.sinsoure_fee,
            assumption.dollar_parity,
            powerplant.sinosure_fee,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "fixed_rate":
          ref_value = this.indexValues_1(rate);
          break;
        case "variable_rate":
          ref_value = this.indexValues_3(
            assumption.local_cpi,
            powerplant.local_cpi,
            rate
          );
          break;
        case "repayment_rmb":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        //CHECK
        case "interest_rate_rmb":
          ref_value = this.intersestRateRMB(
            assumption.dollar_parity,
            powerplant.dollar_parity
          );
          break;
        case "fixed_cost_jetty":
          ref_value = this.FixedCostJetty(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "variable_cost_jetty":
          ref_value = this.VariableCostJetty(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "fixed_fcc":
          ref_value = this.indexValues_1(rate);
          break;
        case "irsa_charges":
          ref_value = this.indexValues_1(rate);
          break;
        case "insurance":
          ref_value = this.indexValues_1(rate);
          break;
        case "fixedcostonworkingcapital":
          ref_value = this.indexValues_3(
            assumption.kibor,
            powerplant.kibor,
            rate
          );
          break;
        case "interest_charges_foreign":
          ref_value = this.indexValues_3(
            assumption.libor,
            powerplant.libor,
            rate
          );
          break;
        case "roe":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "roedc":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "wht":
          //(ROEDC + ROE) *0.075
          const roe = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          const roedc = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );

          ref_value = (roe + roedc) * 0.075;
          break;
        case "annual_security_cost":
          ref_value = this.indexValues_3(
            assumption.dollar_parity,
            powerplant.dollar_parity,
            rate
          );
          break;
        case "proceed_from_cres":
          ref_value = this.indexValues_1(rate);
          break;
        case "dsra_cost":
          ref_value = this.indexValues_1(rate);
          break;
        case "interest_charges_local": //interest_charges_local == interest_charges_kibor
          ref_value = this.indexValues_3(
            assumption.kibor,
            powerplant.kibor,
            rate
          );
          break;
        default:
          console.log("NO match");
          console.log('commercial parameter: ', commercialParameter)
          console.log('powerplant : ', powerplant.plant_name)
          ref_value = 0
          break;
        // return index_value
      }
      cp['ref_rate'] = ref_value
    })
    return powerplant
  }

  //Formula for variables with 3 parameters
  indexValues_3(assumption, ref_eco, rate) {
    const value = (parseFloat(assumption) / parseFloat(ref_eco)) * parseFloat(rate);

    return value;
  }

  //Formula for variables with 5 parameters
  indexValues_5(assumption_1, assumption_2, ref_eco_1, ref_eco_2, rate) {
    const value =
      (parseFloat(assumption_1) / parseFloat(ref_eco_1)) * (parseFloat(assumption_2) / parseFloat(ref_eco_2)) * parseFloat(rate);

    return value;
  }

  //Formula for variables with 1 parameters
  indexValues_1(rate) {
    const value = parseFloat(rate);

    return value;
  }

  intersestRateRMB(dollar_parity, Ref_dollar) {
    const value = parseFloat(dollar_parity) / parseFloat(Ref_dollar);
    return value;
  }

  FixedCostJetty(assumption, ref_eco, rate) {
    const value = (1 + (parseFloat(assumption) / parseFloat(ref_eco) - 1) * 0.5) * parseFloat(rate);
    return value;
  }
  VariableCostJetty(assumption, ref_eco, rate) {
    const value = (1 + (parseFloat(assumption) / parseFloat(ref_eco) - 1) * 0.6) * parseFloat(rate);
    return value;
  }

  InterestForeignAnnual(assumption, powerplant) {
    if(powerplant.years >= 30){
      return 0
    }

    const allCommpara = this.groupBy(powerplant.commercialparameters, 'commercial_parameter_name')



    const { interest_foreign_quarter, outstanding_principle_foreign_quarter } = allCommpara



    var sum = interest_foreign_quarter.reduce((acc, commercialParameter, index) => {
      const interest =
        commercialParameter.rate *
        (assumption.dollar_parity / powerplant.dollar_parity);
      const outstanding =
        outstanding_principle_foreign_quarter[index].rate * assumption.dollar_parity;
      const installed =
        (assumption.libor - powerplant.libor) /
        (powerplant.installed_capacity *
          powerplant.derated_capacity *
          8670 *
          1000);
      return acc += interest + outstanding * installed;
    }, 0);

    return sum / 4;
  }

  InterestLocalAnnual(assumption, powerplant) {
    if(powerplant.years >= 30){
      return 0
    }
    const allCommpara = this.groupBy(powerplant.commercialparameters, 'commercial_parameter_name')
    const { interest_local_quarter, outstanding_principle_local_quarter } = allCommpara



    var sum = interest_local_quarter.reduce((acc, commercialParameter, index) => {
      const interest = commercialParameter.rate;
      const outstanding =
        outstanding_principle_local_quarter[index].rate * assumption.dollar_parity;

      /// CONFORM IT
      const installed =
        (assumption.libor - powerplant.libor) /
        (powerplant.installed_capacity *
          powerplant.derated_capacity *
          8670 *
          1000);
      /// GET IT CHECKED
      return acc += interest + outstanding * installed;
    }, 0);
    return sum / 4;
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
  }


};
