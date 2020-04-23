module.exports = class FormulasService {
  constructor() {}

  getRefYear(date_1, date_2) {
    const difference =
      (date_2.getFullYear() - date_1.getFullYear()) * 12 +
      (date_2.getMonth() - date_1.getMonth());
    var refYear = 0;
    if (difference < 0) {
      refYear = 0;
    } else if (((difference) => 0) && difference < 12) {
      refYear = 1;
    } else if ((difference) => 12) {
      if (difference % 12 > 0) {
        refYear = Math.floor(difference / 12) + 1;
      } else if (difference % 12 == 0) {
        refYear = Math.floor(difference / 12) + 1;
      }
    }
    return refYear;
  }

  getIndexValue(newOutputArray, powerPlant) {
    let result = newOutputArray.map((plant) => {
      const commercialParameter = plant.commercial_parameter_name;
      const assumption = plant.assupmtions;
      const rate = plant.rate;
      const output = this.IndexValue(
        commercialParameter,
        assumption,
        powerPlant,
        rate
      );
      plant["index_value"] = output;
      return plant;
    });
    return result;
  }

  IndexValue(commercialParameter, assumption, powerplant, rate) {
    // const expectedAssumptions= commercialParameters[commercialParameter]
    // indexValues_3 =(assumption, ref_eco, rate)
    // indexValues_5=(assumption_1, assumption_2, ref_eco_1, ref_eco_2, rate)
    // indexValues_1=(rate)

    // // SAVE:
    // interest_foreign_quarter
    // interest_local_quarter
    // outstanding_principle_foreign_quarter
    // outstanding_principle_local_quarter

    switch (commercialParameter) {
      // case 'interest_foreign_annual':

      //   return InterestForeignAnnual(assumption, powerplant, rate)

      // case 'interest_local_annual':
      //   return InterestLocalAnnual(assumption, powerplant, rate)

      case "vom_local":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "vom_foreign":
        return indexValues_5(
          assumption.dollar_parity,
          powerplant.economicparameter.us_cpi,
          powerplant.economicparameter.dollar_parity,
          powerplant.economicparameter.us_cpi,
          rate
        );

      case "water_charges":
        return indexValues_3(
          assumption.local_cpi,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "limestone_charges":
        return indexValues_3(
          assumption.local_cpi,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "ash_disposal_charges":
        return indexValues_3(
          assumption.local_cpi,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "escalable_component":
        return indexValues_5(
          assumption.dollar_parity,
          assumption.us_cpi,
          powerplant.economicparameter.dollar_parity,
          powerplant.economicparameter.us_cpi,
          rate
        );

      case "nonescalable_component_foreign":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "nonescalable_component_local":
        return indexValues_1(rate);

      case "fom_local":
        return indexValues_3(
          assumption.local_cpi,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "fom_foreign":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "sinosure":
        return indexValues_5(
          assumption.sinsoure_fee,
          assumption.dollar_parity,
          powerplant.economicparameter.sinosure_fee,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "fixed_rate":
        return indexValues_1(rate);

      case "variable_rate":
        return indexValues_3(
          assumption.local_cpi,
          powerplant.economicparameter.local_cpi,
          rate
        );

      case "repayment_rmb":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      //CHECK
      case "interest_rate_rmb":
        return intersestRateRMB(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity
        );

      case "fixed_cost_jetty":
        return FixedCostJetty(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "variable_cost_jetty":
        return VariableCostJetty(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "fixed_fcc":
        return indexValues_1(rate);

      case "irsa_charges":
        return indexValues_1(rate);

      case "insurance":
        return indexValues_1(rate);

      case "fixedcostonworkingcapital":
        return indexValues_3(
          assumption.kibor,
          powerplant.economicparameter.kibor,
          rate
        );

      case "interest_charges_foreign":
        return indexValues_3(
          assumption.libor,
          powerplant.economicparameter.libor,
          rate
        );

      case "roe":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "roedc":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "wht":
        //(ROEDC + ROE) *0.075
        const roe = indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );
        const roedc = indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

        return (roe + roedc) * 0.075;

      case "annual_security_cost":
        return indexValues_3(
          assumption.dollar_parity,
          powerplant.economicparameter.dollar_parity,
          rate
        );

      case "proceed_from_cres":
        return indexValues_1(rate);

      case "dsra_cost":
        return indexValues_1(rate);

      case "interest_charges_local": //interest_charges_local == interest_charges_kibor
        return indexValues_3(
          assumption.kibor,
          powerplant.economicparameter.kibor,
          rate
        );

      default:
        console.log("NO match");

      // return index_value
    }
  }

  //Formula for variables with 3 parameters
  indexValues_3(assumption, ref_eco, rate) {
    const value = (assumption / ref_eco) * rate;

    return value;
  }

  //Formula for variables with 5 parameters
  indexValues_5(assumption_1, assumption_2, ref_eco_1, ref_eco_2, rate) {
    const value =
      (assumption_1 / ref_eco_1) * (assumption_2 / ref_eco_2) * rate;

    return value;
  }

  //Formula for variables with 1 parameters
  indexValues_1(rate) {
    const value = rate;

    return value;
  }

  intersestRateRMB(dollar_parity, Ref_dollar) {
    const value = dollar_parity / Ref_dollar;
    return value;
  }

  FixedCostJetty(assumption, ref_eco, rate) {
    const value = (1 + (assumption / ref_eco - 1) * 0.5) * rate;
    return value;
  }
  VariableCostJetty(assumption, ref_eco, rate) {
    const value = (1 + (assumption / ref_eco - 1) * 0.6) * rate;
    return value;
  }

  InterestForeignAnnual(assumption, powerplant, rate) {
    if (rate.length != 4) {
      return 0;
    }
    var sum = 0;
    rate.forEach((rate) => {
      const interest =
        rate.interestforeignquarter_rate *
        (assumption.dollar_parity / powerplant.economicparameter.dollar_parity);
      const outstanding =
        rate.OutstandingPrincipleForeignQuarter_rate * assumption.dollar_parity;
      const installed =
        (assumption.libor - powerplant.libor) /
        (powerplant.installed_capacity *
          powerplant.derated_capacity *
          8670 *
          1000);
      sum = interest + outstanding * installed;
    });

    return sum / 4;
  }

  InterestLocalAnnual(assumption, powerplant, rate) {
    if (rate.length != 4) {
      return 0;
    }
    var sum = 0;
    rate.forEach((rate) => {
      const interest = rate.InterestLocalQuarter_rate;
      const outstanding =
        rate.OutstandingPrincipleLocalQuarter_rate * assumption.dollar_parity;

      /// CONFORM IT
      const installed =
        (assumption.libor - powerplant.libor) /
        (powerplant.installed_capacity *
          powerplant.derated_capacity *
          8670 *
          1000);
      /// GET IT CHECKED
      sum = interest + outstanding * installed;
    });
    return sum / 4;
  }
};
