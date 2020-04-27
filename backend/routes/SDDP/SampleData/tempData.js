const moment = require("moment")

// const assumptionDate = moment("2020-01-01T00:00:00.000Z")
// const cod =	 moment("2013-11-01")
// 
// const cod2=	 moment("2013-10-01")

// console.log('cod.diff(assumptionDate, years); ', (assumptionDate.diff(cod,'years')) >=0? cod.diff(cod,'years')+1:0 );
// cod.diff(assumptionDate, 'years');

const assumptions = [
  [
    "2020-01-01T00:00:00.000Z",
    {
      "dollar_parity": "45",
      "us_cpi": "123",
      "local_cpi": "135",
      "kibor": "0",
      "libor": "0",
      "sinsoure_fee": "0"
    }
  ],
  [
    "2022-02-01T00:00:00.000Z",
    {
      "dollar_parity": "35",
      "us_cpi": "131",
      "local_cpi": "113",
      "kibor": "0",
      "libor": "0",
      "sinsoure_fee": "0"
    }
  ]
]


const x = [
  [
    "Alliance",
    {
      "Alliance+2": {
        "plant_name": "Alliance",
        "power_plant_code": 7032,
        "fca_code": null,
        "sddp_code": "263.0000",
        "company": null,
        "address": "Pakistan ABC",
        "longitude": "69.466",
        "latitude": "35.48",
        "project_nature": "Private",
        "policy_reference": null,
        "agreement_type": "PPA",
        "contract_type": "Take and Pay",
        "units": "1.0000",
        "technical_parameter_id": 229,
        "disco_id": 2,
        "economic_parameters_id": 229,
        "dollar_parity": "105.0000",
        "us_cpi": "245.5190",
        "local_cpi": "216.6100",
        "cod": "2020-07-01",
        "term": 0,
        "end_year": 2051,
        "kibor": "0.0600",
        "libor": "0.0000",
        "sinsoure_fee": "0.0000",
        "rmb_rate": "0.0200",
        "technology": "CCGT",
        "fuel_category": "Thermal",
        "fuel_code": 7,
        "installed_capacity": "30.0000",
        "derated_capacity": "30.0000",
        "msl": "0.0000",
        "scheduled_outages": "720.0000",
        "forced_outages": "550.0000",
        "auxilary_consumption": "20.0000",
        "rate_emission_CO2": "1.9000",
        "rate_emission_NOx": "1.9000",
        "rate_emission_SOx": "1.7000",
        "reserve_primary": "0.0000",
        "reserve_secondary": "1.0000",
        "reserve_tertiary": "1.0000",
        "min_time_up": "3.0000",
        "min_time_down": "0.5000",
        "fuel_type": "Baggase",
        "heat_reat_MSL": "0.5000",
        "heat_rate_50": "0.6000",
        "heat_rate_75": "0.7000",
        "heat_rate_90": "0.8000",
        "heat_rate_FL": "0.9000",
        "ramp_up_rate": "0.0000",
        "ramp_down_rate": null,
        "repair_time_mean": "4.0000",
        "repair_time_min": "1.0000",
        "repair_time_max": "6.0000",
        "ref_fuel_cost": "3000.0000",
        "startup_cost": "1200.0000",
        "availability_for_cp": "0.0000",
        "fuel_calorific_value": null,
        "synchronization_time": "2.0000",
        "years": 2,
        "commercialparameters": [
          {
            "commercial_parameter_name": "annual_security_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "ash_disposal_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "dsra_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "escalable_component",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fcc",
            "rate": "4.7900"
          },
          {
            "commercial_parameter_name": "fixedcostonworkingcapital",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_fcc",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_local",
            "rate": "0.3739"
          },
          {
            "commercial_parameter_name": "insurance",
            "rate": "0.1039"
          },
          {
            "commercial_parameter_name": "interest_charges_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_charges_local",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_annual",
            "rate": "0.2350"
          },
          {
            "commercial_parameter_name": "interest_local_annual",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "interest_rate_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "irsa_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "limestone_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_local",
            "rate": "1.5193"
          },
          {
            "commercial_parameter_name": "proceed_from_cres",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "repayment_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "roe",
            "rate": "0.7121"
          },
          {
            "commercial_parameter_name": "roedc",
            "rate": "0.0901"
          },
          {
            "commercial_parameter_name": "sinosure",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "vom_foreign",
            "rate": "0.1495"
          },
          {
            "commercial_parameter_name": "vom_local",
            "rate": "0.0997"
          },
          {
            "commercial_parameter_name": "water_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "wht",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.0197"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.0197"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.0197"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.0197"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2322157463.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2273034826.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2223175350.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2172567981.0000"
          }
        ]
      },
      "Alliance+1": {
        "plant_name": "Alliance",
        "power_plant_code": 7032,
        "fca_code": null,
        "sddp_code": "263.0000",
        "company": null,
        "address": "Pakistan ABC",
        "longitude": "69.466",
        "latitude": "35.48",
        "project_nature": "Private",
        "policy_reference": null,
        "agreement_type": "PPA",
        "contract_type": "Take and Pay",
        "units": "1.0000",
        "technical_parameter_id": 229,
        "disco_id": 2,
        "economic_parameters_id": 229,
        "dollar_parity": "105.0000",
        "us_cpi": "245.5190",
        "local_cpi": "216.6100",
        "cod": "2020-07-01",
        "term": 0,
        "end_year": 2051,
        "kibor": "0.0600",
        "libor": "0.0000",
        "sinsoure_fee": "0.0000",
        "rmb_rate": "0.0200",
        "technology": "CCGT",
        "fuel_category": "Thermal",
        "fuel_code": 7,
        "installed_capacity": "30.0000",
        "derated_capacity": "30.0000",
        "msl": "0.0000",
        "scheduled_outages": "720.0000",
        "forced_outages": "550.0000",
        "auxilary_consumption": "20.0000",
        "rate_emission_CO2": "1.9000",
        "rate_emission_NOx": "1.9000",
        "rate_emission_SOx": "1.7000",
        "reserve_primary": "0.0000",
        "reserve_secondary": "1.0000",
        "reserve_tertiary": "1.0000",
        "min_time_up": "3.0000",
        "min_time_down": "0.5000",
        "fuel_type": "Baggase",
        "heat_reat_MSL": "0.5000",
        "heat_rate_50": "0.6000",
        "heat_rate_75": "0.7000",
        "heat_rate_90": "0.8000",
        "heat_rate_FL": "0.9000",
        "ramp_up_rate": "0.0000",
        "ramp_down_rate": null,
        "repair_time_mean": "4.0000",
        "repair_time_min": "1.0000",
        "repair_time_max": "6.0000",
        "ref_fuel_cost": "3000.0000",
        "startup_cost": "1200.0000",
        "availability_for_cp": "0.0000",
        "fuel_calorific_value": null,
        "synchronization_time": "2.0000",
        "years": 1,
        "commercialparameters": [
          {
            "commercial_parameter_name": "ash_disposal_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "dsra_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "escalable_component",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fcc",
            "rate": "4.7900"
          },
          {
            "commercial_parameter_name": "fixedcostonworkingcapital",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_fcc",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_local",
            "rate": "0.3739"
          },
          {
            "commercial_parameter_name": "insurance",
            "rate": "0.1039"
          },
          {
            "commercial_parameter_name": "interest_charges_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_charges_local",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_annual",
            "rate": "0.2350"
          },
          {
            "commercial_parameter_name": "interest_local_annual",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "interest_rate_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "irsa_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "limestone_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_local",
            "rate": "1.4315"
          },
          {
            "commercial_parameter_name": "proceed_from_cres",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "repayment_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "roe",
            "rate": "0.7121"
          },
          {
            "commercial_parameter_name": "roedc",
            "rate": "0.0901"
          },
          {
            "commercial_parameter_name": "sinosure",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "vom_foreign",
            "rate": "0.1495"
          },
          {
            "commercial_parameter_name": "vom_local",
            "rate": "0.0997"
          },
          {
            "commercial_parameter_name": "water_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "wht",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.1076"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2511495000.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2465212426.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2418235614.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "2370554149.0000"
          }
        ]
      }
    }
  ],
  [
    "ALMOIZ",
    {
      "ALMOIZ+5": {
        "plant_name": "ALMOIZ",
        "power_plant_code": 7018,
        "fca_code": "0",
        "sddp_code": "248.0000",
        "company": "Almoiz Industries Limited",
        "address": "2-D-1, Gulberg III, Lahore",
        "longitude": "69.466",
        "latitude": "35.48",
        "project_nature": "Private",
        "policy_reference": "Co Gen 2008",
        "agreement_type": "PPA",
        "contract_type": "Take and Pay",
        "units": "1.0000",
        "technical_parameter_id": 214,
        "disco_id": 2,
        "economic_parameters_id": 214,
        "dollar_parity": "101.6000",
        "us_cpi": "236.1190",
        "local_cpi": "198.1600",
        "cod": "2018-01-01",
        "term": 30,
        "end_year": 2048,
        "kibor": "0.0950",
        "libor": "0.0000",
        "sinsoure_fee": "0.0000",
        "rmb_rate": "0.0200",
        "technology": "CCGT",
        "fuel_category": "Thermal",
        "fuel_code": 7,
        "installed_capacity": "26.0000",
        "derated_capacity": "20.6500",
        "msl": "0.0000",
        "scheduled_outages": "720.0000",
        "forced_outages": "550.0000",
        "auxilary_consumption": "20.0000",
        "rate_emission_CO2": "1.9000",
        "rate_emission_NOx": "1.9000",
        "rate_emission_SOx": "1.7000",
        "reserve_primary": "0.0000",
        "reserve_secondary": "1.0000",
        "reserve_tertiary": "1.0000",
        "min_time_up": "3.0000",
        "min_time_down": "0.5000",
        "fuel_type": "Baggase",
        "heat_reat_MSL": "0.5000",
        "heat_rate_50": "0.6000",
        "heat_rate_75": "0.7000",
        "heat_rate_90": "0.8000",
        "heat_rate_FL": "0.9000",
        "ramp_up_rate": "0.3000",
        "ramp_down_rate": null,
        "repair_time_mean": "4.0000",
        "repair_time_min": "1.0000",
        "repair_time_max": "6.0000",
        "ref_fuel_cost": "2966.3300",
        "startup_cost": "1200.0000",
        "availability_for_cp": "0.4500",
        "fuel_calorific_value": null,
        "synchronization_time": "2.0000",
        "years": 5,
        "commercialparameters": [
          {
            "commercial_parameter_name": "annual_security_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "ash_disposal_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "dsra_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "escalable_component",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fcc",
            "rate": "5.9822"
          },
          {
            "commercial_parameter_name": "fixedcostonworkingcapital",
            "rate": "0.1733"
          },
          {
            "commercial_parameter_name": "fixed_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_fcc",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_local",
            "rate": "0.3194"
          },
          {
            "commercial_parameter_name": "insurance",
            "rate": "0.2204"
          },
          {
            "commercial_parameter_name": "interest_charges_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_charges_local",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_annual",
            "rate": "0.2350"
          },
          {
            "commercial_parameter_name": "interest_local_annual",
            "rate": "2.5483"
          },
          {
            "commercial_parameter_name": "interest_rate_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "irsa_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "limestone_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_local",
            "rate": "1.9512"
          },
          {
            "commercial_parameter_name": "proceed_from_cres",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "repayment_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "roe",
            "rate": "0.9380"
          },
          {
            "commercial_parameter_name": "roedc",
            "rate": "0.0965"
          },
          {
            "commercial_parameter_name": "sinosure",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "vom_foreign",
            "rate": "0.3393"
          },
          {
            "commercial_parameter_name": "vom_local",
            "rate": "0.1197"
          },
          {
            "commercial_parameter_name": "water_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "wht",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.9458"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.9458"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.9458"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "1.9458"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1526701800.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1483045200.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1438023600.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1391595400.0000"
          }
        ]
      },
      "ALMOIZ+3": {
        "plant_name": "ALMOIZ",
        "power_plant_code": 7018,
        "fca_code": "0",
        "sddp_code": "248.0000",
        "company": "Almoiz Industries Limited",
        "address": "2-D-1, Gulberg III, Lahore",
        "longitude": "69.466",
        "latitude": "35.48",
        "project_nature": "Private",
        "policy_reference": "Co Gen 2008",
        "agreement_type": "PPA",
        "contract_type": "Take and Pay",
        "units": "1.0000",
        "technical_parameter_id": 214,
        "disco_id": 2,
        "economic_parameters_id": 214,
        "dollar_parity": "101.6000",
        "us_cpi": "236.1190",
        "local_cpi": "198.1600",
        "cod": "2018-01-01",
        "term": 30,
        "end_year": 2048,
        "kibor": "0.0950",
        "libor": "0.0000",
        "sinsoure_fee": "0.0000",
        "rmb_rate": "0.0200",
        "technology": "CCGT",
        "fuel_category": "Thermal",
        "fuel_code": 7,
        "installed_capacity": "26.0000",
        "derated_capacity": "20.6500",
        "msl": "0.0000",
        "scheduled_outages": "720.0000",
        "forced_outages": "550.0000",
        "auxilary_consumption": "20.0000",
        "rate_emission_CO2": "1.9000",
        "rate_emission_NOx": "1.9000",
        "rate_emission_SOx": "1.7000",
        "reserve_primary": "0.0000",
        "reserve_secondary": "1.0000",
        "reserve_tertiary": "1.0000",
        "min_time_up": "3.0000",
        "min_time_down": "0.5000",
        "fuel_type": "Baggase",
        "heat_reat_MSL": "0.5000",
        "heat_rate_50": "0.6000",
        "heat_rate_75": "0.7000",
        "heat_rate_90": "0.8000",
        "heat_rate_FL": "0.9000",
        "ramp_up_rate": "0.3000",
        "ramp_down_rate": null,
        "repair_time_mean": "4.0000",
        "repair_time_min": "1.0000",
        "repair_time_max": "6.0000",
        "ref_fuel_cost": "2966.3300",
        "startup_cost": "1200.0000",
        "availability_for_cp": "0.4500",
        "fuel_calorific_value": null,
        "synchronization_time": "2.0000",
        "years": 3,
        "commercialparameters": [
          {
            "commercial_parameter_name": "ash_disposal_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "dsra_cost",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "escalable_component",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fcc",
            "rate": "5.9822"
          },
          {
            "commercial_parameter_name": "fixedcostonworkingcapital",
            "rate": "0.1733"
          },
          {
            "commercial_parameter_name": "fixed_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_fcc",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fixed_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "fom_local",
            "rate": "0.3194"
          },
          {
            "commercial_parameter_name": "insurance",
            "rate": "0.2204"
          },
          {
            "commercial_parameter_name": "interest_charges_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_charges_local",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_annual",
            "rate": "0.2350"
          },
          {
            "commercial_parameter_name": "interest_local_annual",
            "rate": "2.7045"
          },
          {
            "commercial_parameter_name": "interest_rate_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "irsa_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "limestone_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_foreign",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "nonescalable_component_local",
            "rate": "1.5254"
          },
          {
            "commercial_parameter_name": "proceed_from_cres",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "repayment_rmb",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "roe",
            "rate": "0.9380"
          },
          {
            "commercial_parameter_name": "roedc",
            "rate": "0.0965"
          },
          {
            "commercial_parameter_name": "sinosure",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_cost_jetty",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "variable_rate",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "vom_foreign",
            "rate": "0.3393"
          },
          {
            "commercial_parameter_name": "vom_local",
            "rate": "0.1197"
          },
          {
            "commercial_parameter_name": "water_charges",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "wht",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "2.3716"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "2.3716"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "2.3716"
          },
          {
            "commercial_parameter_name": "interest_local_quarter",
            "rate": "2.3716"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_foreign_quarter",
            "rate": "0.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1831546600.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1797416400.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1762220200.0000"
          },
          {
            "commercial_parameter_name": "outstanding_principle_local_quarter",
            "rate": "1725924200.0000"
          }
        ]
      }
    }
  ]
]
let filteredCollection = Object.fromEntries(x)
// filteredCollection = Object.values(filteredCollection)
Object.entries(filteredCollection).forEach(collection => {
  console.log(`plant year: ${collection}`)
  const collectionName = collection[0]

  Object.entries(collection[1]).forEach(plants => {
    const plant_name = plants[0]
    const plant = plants[1]
    console.log("plant===================>>>>s", plant)
    console.log(`plant_name: ${plant_name}`)
    console.log(`plant: ${plant}`)


    const plantYear = plant.years

    const cod = moment(plant.cod)
    // assumptions.forEach(assumption => {
    //   const assumptionDate = moment(assumption[0])
    //   console.log('plantYear === ((assumptionDate.diff(cod, years) + 1:', plantYear === ((assumptionDate.diff(cod, 'years') + 1)))
    //   if (plantYear === ((assumptionDate.diff(cod, 'years') + 1))) {
    //     console.log(`plant name: ${plant.plant_name}`)
    //     console.log(`plant year: ${plant.years}`)
    //     console.log(`plant cod: ${plant.cod}`)
    //     console.log(`assumption date: ${assumption[0]}`)
    //     console.log(`(assumptionDate.diff(cod, 'years') + 1): ${(assumptionDate.diff(cod, 'years') + 1)}`)

    //   }
    // })
    // console.log("filteredCollection.collectionName.plant_name: ", filteredCollection[collectionName][plant_name])

    
    console.log(InterestForeignAnnual(assumptions, plant))
  })
})

// const rates = []
// filteredCollection.powerplant.commercialparameters.forEach(cp => {
//   if (cp.commercial_parameter_name === 'interest_foreign_quarter' || cp.commercial_parameter_name === 'outstanding_principle_foreign_quarter') {
//     rates.push(cp)
//   }

// })

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

function InterestForeignAnnual(assumption, powerplant) {
  // interest_foreign_quarter
  // interest_local_quarter
  // outstanding_principle_foreign_quarter
  // outstanding_principle_local_quarter

  const allCommpara = groupBy(powerplant.commercialparameters,'commercial_parameter_name')
  const {interest_foreign_quarter,outstanding_principle_foreign_quarter } = allCommpara

  console.log("interest_foreign_quarter,outstanding_principle_foreign_quarter :", interest_foreign_quarter,outstanding_principle_foreign_quarter )

   
  var sum =interest_foreign_quarter.reduce((acc, commercialParameter, index) => {
  console.log('index:', index)     
    console.log(`commercialParameter.rate: ${commercialParameter.rate}`)
    const interest =
      commercialParameter.rate *
      (assumption.dollar_parity / powerplant.dollar_parity);
      console.log("outstanding_principle_foreign_quarter[index].rate: ",outstanding_principle_foreign_quarter[index])
      console.log(`outstanding_principle_foreign_quarter[index].rate: ${outstanding_principle_foreign_quarter[index].rate}`)
    
      const outstanding =
      outstanding_principle_foreign_quarter[index].rate * assumption.dollar_parity;
    const installed =
      (assumption.libor - powerplant.libor) /
      (powerplant.installed_capacity *
        powerplant.derated_capacity *
        8670 *
        1000);
        console.log(acc += interest + outstanding * installed)
    return acc += interest + outstanding * installed;
  },acc= 0);
  console.log(sum/4)
  return sum / 4;
}