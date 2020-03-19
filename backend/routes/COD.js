// performing computations 


var input = require('./input');
var express = require('express');
var app = express();
var routerr = express.Router();
var db = require('../config');

var plant_name;
var results;
var queryOutput;
var index_value
// var indexed_Value = 0;                                      //Value to be computed

//Formula for variables with 3 parameters
function indexValues_3(assumption, ref_eco, ref_rate) {
    index_value = (assumption / ref_eco) * ref_rate;
    console.log(index_value)
    return index_value
}

//Formula for variables with 5 parameters
function indexValues_5(assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate) {

    index_value = ((assumption_1 / ref_eco_1) * (assumption_2 / ref_eco_2) * (ref_rate));
    return index_value
}

//Formula for variables with 1 parameters
function indexValues_1(ref_rate) {
    index_value = ref_rate
    return index_value
}


//Converting date
function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

function monthsDiff(date1, date2) {
    console.log('date1, date2: ', date1, date2)
    year1 = date1.split("-")
    year2 = date2.split("-")
    months = ((year2[0] - year1[0]) * 12) + (year2[1] - year1[1])
    return months
}

function COD(difference) {
    console.log("difference: ", difference)
    // var refYear=0
    if (difference == 0) {

        refYear = 0
    }
    else if (difference > 0 && difference <= 12) {
        refYear = 1
    }
    else if (difference > 12) {
        if (difference % 12 > 0) {
            refYear = Math.floor(difference / 12) + 1
        }
        else if (difference == 0) {
            refYear = Math.floor(difference / 12)
        }
    }
    return refYear
}



function executeQuery(query, plant_name, frommonth, commercial_parameter) {
    db.query(query, [plant_name, plant_name, plant_name, plant_name], function (error, results) {
        if (error) throw error;
        queryOutput = results
        console.log('Query results: ', queryOutput)
        for (var i = 0; i < results.length; i++) {
            if (results.length < 2) {
                if (Object.keys(results[0]).includes('rate')) {
                    ref_rate = results[0]['rate'];
                    console.log("ref_rate: " + ref_rate)
                }
            }
            else {
                if (Object.keys(results[i][0]).includes('rate')) {
                    ref_rate = results[i][0]['rate'];
                    console.log("ref_rate: " + ref_rate)
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
                else if (Object.keys(results[i][0]).includes('sinsoure_fee')) {
                    ref_sinosure_fee = results[i][0]['sinsoure_fee'];
                    console.log("ref_sinosure" + results[i][0]['sinsoure_fee'])

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
                    console.log("cod1 " + cod1)
                }
            }
        }
        console.log("Cod : this is count: ", count)

        cod1 = JSON.stringify(cod1)
        cod1 = cod1.replace(/"/g, "")
        cod1 = convert(cod1)
        console.log("cod1 ", cod1)
        console.log("before going to difference frommonth: ", frommonth)
        monthsfrom = monthsDiff(cod1, frommonth);
        refYear = COD(monthsfrom)
        console.log("refYear: ", refYear)

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
            console.log("input1, input2, ref_sinosure_fee, ref_dollar_rate, ref_rate: ", input1, input2, ref_sinosure_fee, ref_dollar_rate, ref_rate)
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
        console.log("Indexed Value ", indexed_Value)
        console.log('QueryOutput afterQuery :', queryOutput)
        console.log('results :', results)
        return ([queryOutput, indexed_Value])
    });
}

routerr.post('/', (req, res) => {
    console.log("this is req: ", req.body)
    // frommonth = req.body.fromDate;
    tomonth = req.body.toDate;
    plant_name = req.body.powerPlant;
    commercial_parameter = req.body.commercialParameter;

    assumptionObjectArray = req.body.assumptionArrayObjects;

    count = 0
    assumptionObjectArray.forEach(object => {
        count += 1
        console.log("Start : this is count: ", count)
        value = Object.values(object)
        console.log("value: ", value)
        frommonth = value[0]
        input1 = value[1]
        input2 = value[2]
        console.log("=======frommonth,input1,input2========== ", frommonth, input1, input2)
        // input1 = assumptionObjectArray[0]['dollar_rate'];
        // input2 = assumptionObjectArray[0]['sinosure_fee'];  //HERE


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

        var rate_local_cpi = ['VOM_Local', 'WaterCharges', 'LimeStoneCharges', 'AshDisposalCost', 'FOMLocal', 'VariableRate']
        var rate_dollar = ['NonEscalableComponentForeign', 'FOMForeign', 'RepaymentRMB', , 'FixedCostJetty', 'VariableCostJetty', 'ROE', 'ROEDC', 'AnnualSecurityCost']



        if (commercial_parameter == 'VOM_Local') {
            console.log("rate_local_cpi")
            query += reference_rate + ";" + reference_local_cpi  //1
        }
        else if (commercial_parameter == 'VOM_Foreign') {
            query += reference_rate + ";" + reference_us_cpi + ";" + reference_dollar_rate //rud
        }
        else if (commercial_parameter == 'WaterCharges') {
            query += reference_rate + ";" + reference_local_cpi   //2
        }
        else if (commercial_parameter == 'LimeStoneCharges') {
            query += reference_rate + ";" + reference_local_cpi   //3
        }
        else if (commercial_parameter == 'AshDisposalCost') {
            query += reference_rate + ";" + reference_local_cpi     //4
        }
        else if (commercial_parameter == 'EscalableComponent') {
            query += reference_rate + ";" + reference_us_cpi + ";" + reference_dollar_rate
        }
        else if (commercial_parameter == 'NonEscalableComponentForeign') {

            query += reference_rate + ";" + reference_dollar_rate  //rd1
        }
        else if (commercial_parameter == 'NonEscalableComponentLocal') {
            query += reference_rate//r7
        }
        else if (commercial_parameter == 'FOMLocal') {
            query += reference_rate + ";" + reference_local_cpi     //5
        }
        else if (commercial_parameter == 'FOMForeign') {
            query += reference_rate + ";" + reference_dollar_rate   //rd2
        }
        else if (commercial_parameter == 'Sinosure') {
            query += reference_rate + ";" + reference_dollar_rate + ";" + reference_sinosure_fee
        }
        else if (commercial_parameter == 'FixedRate') {
            query += reference_rate//r6
        }
        else if (commercial_parameter == 'VariableRate') {
            query += reference_rate + ";" + reference_local_cpi   //6
        }
        else if (commercial_parameter == 'RepaymentRMB') {
            query += reference_rate + ";" + reference_dollar_rate   //rd3
        }
        else if (commercial_parameter == 'InterestRateRMB') {
            query += reference_dollar_rate
        }
        else if (commercial_parameter == 'FixedCostJetty') {
            query += reference_rate + ";" + reference_dollar_rate;   //rd4
        }
        else if (commercial_parameter == 'VariableCostJetty') {
            query += reference_rate + ";" + reference_dollar_rate     //rd5
        }
        else if (commercial_parameter == 'FixeFCC') {
            query += reference_rate//r6
        }
        else if (commercial_parameter == 'IRSACharges') {
            query += reference_rate//r5
        }
        else if (commercial_parameter == 'Insurance') {
            query += reference_rate//r4
        }

        else if (commercial_parameter == 'FixedCostOfWorkingCapital') {
            query += reference_rate + ";" + reference_kibor
        }
        else if (commercial_parameter == 'InterestForeignAnnual') {
            query += reference_ratequery + ";" + reference_kibor
        }
        else if (commercial_parameter == 'ROE') {
            query += reference_rate + ";" + reference_dollar_rate   //rd7
        }
        else if (commercial_parameter == 'ROEDC') {
            query += reference_rate + ";" + reference_dollar_rate   //rd8
        }
        else if (commercial_parameter == 'WHT') {
            query += reference_rate//r3
        }
        else if (commercial_parameter == 'AnnualSecurityCost') {
            console.log("=============AnnualSecurityCost==================")
            query += reference_rate + ";" + reference_dollar_rate   //rd9
        }
        else if (commercial_parameter == 'ProceedFromCRES') {
            query += reference_rate//r2
        } else if (commercial_parameter == 'DSRACost') {
            query += reference_rate//r1
        }

        query += ";" + cod
        console.log("==========================Mid : this is count=========================: ", count)

        // executeQuery(query, plant_name, frommonth, commercial_parameter)
        console.log("===================end : this is count===============: ", count)
        console.log("queryOutput in post:: ", executeQuery(query, plant_name, frommonth, commercial_parameter))
        // res.send(qtp)
    })
})

var out = index_value
routerr.get('/sendResults', (req, res) => {
    console.log("**********inside send: ********************")

    console.log("**********indexed value: ********************", index_value)
    console.log("**********results value: ********************", results)
    console.log("**********query value: ********************", queryOutput)


    res.send({
        queryOutput,
        index_value: index_value
    })
});

module.exports = routerr