var input = require('./routes/input');
var express = require('express');
var app = express();
var routerr = express.Router();
var config = require('./config');
var connection = config.connection;
var plant_name
var indexed_Value = 0;

function indexValues_3(assumption, ref_eco, ref_rate) {
    var indexed_Value = (assumption / ref_eco) * ref_rate;
    return indexed_Value
}
function indexValues_5(assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate) {

    var results = ((assumption_1 / ref_eco_1) * (assumption_2 / ref_eco_2) * (ref_rate));
    return results
}
function indexValues_1(ref_rate) {
    var results = ref_rate
    return results
}

routerr.post('/', (req, res) => {
    frommonth = req.body.frommonth;
    tomonth = req.body.tomonth;
    plant_name = req.body.powerPlant;
    commercial_parameter = req.body.commercialParameter;
    input1 = req.body.inputvalue1;
    input2 = req.body.inputvalue2;


    commercial_parameter = commercial_parameter.replace(/'/, "");

    cod = "SELECT cod FROM economicparameters where economic_parameters_id = (select economic_parameters_id from powerplant where plant_name=?)"

    reference_rate = "SELECT rate from tablename where year = 25 and (id %  261)= (select technical_parameter_id from powerplant where plant_name =?)".replace(/tablename/, commercial_parameter);
    reference_local_cpi = "SELECT local_cpi from economicparameters where economic_parameters_id= (select economic_parameters_id from powerplant where plant_name=?)"
    reference_dollar_rate = "SELECT dollar_parity FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"
    reference_us_cpi = "SELECT us_cpi FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"
    reference_kibor = "SELECT kibor FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"
    reference_libor = "SELECT libor FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"
    reference_sinosure_fee = "SELECT sinsoure_fee FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"
    reference_rmb_rate = "SELECT rmb_rate FROM economicparameters where economic_parameters_id =(Select economic_parameters_id from powerplant where plant_name =?)"

    query = ""

    if (commercial_parameter == 'VOM_Local') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'VOM_Foreign') {
        query += reference_rate + ";" + reference_us_cpi + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'WaterCharges') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'LimeStoneCharges') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'AshDisposalCost') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'EscalableComponent') {
        query += reference_rate + ";" + reference_us_cpi + ";" + reference_dollar_rate
        console.log(query)
    }
    else if (commercial_parameter == 'NonEscalableComponentForeign') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'NonEscalableComponentLocal') {
        query += reference_rate
    }
    else if (commercial_parameter == 'FOMLocal') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'FOMForeign') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'Sinosure') {
        query += reference_rate + ";" + reference_dollar_rate + ";" + reference_sinosure_fee
    }
    else if (commercial_parameter == 'FixedRate') {
        query += reference_rate
    }
    else if (commercial_parameter == 'VariableRate') {
        query += reference_rate + ";" + reference_local_cpi
    }
    else if (commercial_parameter == 'RepaymentRMB') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'InterestRateRMB') {
        query += reference_dollar_rate
    }
    else if (commercial_parameter == 'FixedCostJetty') {
        query += reference_rate + ";" + reference_dollar_rate;
    }
    else if (commercial_parameter == 'VariableCostJetty') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'FixeFCC') {
        query += reference_rate
    }
    else if (commercial_parameter == 'IRSACharges') {
        query += reference_rate
    }
    else if (commercial_parameter == 'Insurance') {
        query += reference_rate
    }

    else if (commercial_parameter == 'FixedCostOfWorkingCapital') {
        query += reference_rate + ";" + reference_kibor
    }
    else if (commercial_parameter == 'InterestForeignAnnual') {
        query += reference_ratequery + ";" + reference_kibor
    }
    else if (commercial_parameter == 'ROE') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'ROEDC') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'WHT') {
        query += reference_rate
    }
    else if (commercial_parameter == 'AnnualSecurityCost') {
        query += reference_rate + ";" + reference_dollar_rate
    }
    else if (commercial_parameter == 'ProceedFromCRES') {
        query += reference_rate
    } else if (commercial_parameter == 'DSRACost') {
        query += reference_rate
    }

    query += ";" + cod

    connection.query(query, [plant_name, plant_name, plant_name, plant_name], function (error, results) {
        if (error) throw error;
        console.log(results)

        for (var i = 0; i < results.length; i++) {
            if (results.length < 2) {
                if (Object.keys(results[0]).includes('rate')) {
                    ref_rate = results[0]['rate'];
                    console.log("ref_rate" + ref_rate)
                }
            }
            else {
                if (Object.keys(results[i][0]).includes('rate')) {
                    ref_rate = results[i][0]['rate'];
                    console.log("ref_rate" + ref_rate)
                }
                else if (Object.keys(results[i][0]).includes('dollar_parity')) {
                    ref_dollar_rate = results[i][0]['dollar_parity'];
                    console.log("dollar_parity" + ref_dollar_rate)
                }
                else if (Object.keys(results[i][0]).includes('us_cpi')) {
                    ref_us_cpi = results[i][0]['us_cpi'];
                    console.log("ref_us_cpi" + ref_us_cpi)
                }
                else if (Object.keys(results[i][0]).includes('kibor')) {
                    ref_kibor = results[i][0]['kibor'];
                    console.log("ref_kibor" + ref_kibor)
                }
                else if (Object.keys(results[i][0]).includes('libor')) {
                    ref_libor = results[i][0]['libor'];
                    console.log("ref_libor" + ref_libor)
                }
                else if (Object.keys(results[i][0]).includes('sinosure_fee')) {
                    ref_sinosure_fee = results[i][0]['sinsoure_fee'];
                    console.log("ref_sinosure" + ref_sinosure_fee)
                }
                else if (Object.keys(results[i][0]).includes('rmb_rate')) {
                    ref_rmb_rate = results[i][0]['rmb_rate'];
                    console.log("ref_rmb_rate" + ref_rmb_rate)
                }
                else if (Object.keys(results[i][0]).includes('local_cpi')) {
                    ref_local_cpi = results[i][0]['local_cpi'];
                    console.log("local cpi" + ref_local_cpi)
                }
                else if (Object.keys(results[i][0]).includes('cod')) {
                    cod1 = results[i][0]['cod'];
                    console.log("" + cod1)
                }
            }
        }
        cod1 = JSON.stringify(cod1)
        cod1 = cod1.replace(/"/g, "")
        cod1 = convert(cod1)
        console.log(cod1)
        monthsfrom = monthsDiff(cod1, frommonth);
        refYear = COD(monthsfrom)
        console.log(refYear)

        if (commercial_parameter == 'VOM_Local') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'VOM_Foreign') {
            indexed_Value = indexValues_5(input1, input2, ref_dollar_rate, ref_us_cpi, ref_rate)
        }
        else if (commercial_parameter == 'WaterCharges') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'LimeStoneCharges') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'AshDisposalCost') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'EscalableComponent') {
            indexed_Value = indexValues_5(input1, input2, ref_dollar_rate, ref_us_cpi, ref_rate)
        }
        else if (commercial_parameter == 'NonEscalableComponentForeign') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'NonEscalableComponentLocal') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'FOMLocal') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'FOMForeign') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'Sinosure') {
            indexed_Value = indexValues_5(input1, input2, ref_sinosure_fee, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'FixedRate') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'VariableRate') {
            indexed_Value = indexValues_3(input1, ref_local_cpi, ref_rate)
        }
        else if (commercial_parameter == 'RepaymentRMB') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'InterestRateRMB') {
            indexed_Value = indexValues_1(ref_dollar_rate)
        }
        else if (commercial_parameter == 'FixedCostJetty') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'VariableCostJetty') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'FixeFCC') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'IRSACharges') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'Insurance') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'FixedCostOfWorkingCapital') {
            indexed_Value = indexValues_3(input1, ref_kibor, ref_rate)
        }
        else if (commercial_parameter == 'InterestForeignAnnual') {
            indexed_Value = indexValues_3(input1, ref_libor, ref_rate)
        }
        else if (commercial_parameter == 'ROE') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'ROEDC') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        //  else if(commercial_parameter== 'WHT'){
        //     indexed_Value=indexValues_2(input1,ref_local_cpi,ref_rate)
        //  }
        else if (commercial_parameter == 'AnnualSecurityCost') {
            indexed_Value = indexValues_3(input1, ref_dollar_rate, ref_rate)
        }
        else if (commercial_parameter == 'ProceedFromCRES') {
            indexed_Value = indexValues_1(ref_rate)
        }
        else if (commercial_parameter == 'DSRACost') {
            indexed_Value = indexValues_1(ref_rate)
        }
        console.log("Indexed Value" + indexed_Value)
    });
})

module.exports = routerr