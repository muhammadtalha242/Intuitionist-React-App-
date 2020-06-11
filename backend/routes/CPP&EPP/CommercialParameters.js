const connection = require('../DataBaseModule/config');        //Data connection




const query = "select DISTINCT REPLACE(COLUMN_NAME,'_id','') as cp from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='commercialparameters';"

async function getCommercialParameters() {
    // console.log("this function")
    const results = []
    const commercialParameters = await connection.query(query, { type: connection.QueryTypes.SELECT })

    commercialParameters.forEach(item => {
        const commercialParameter = item.cp
        const excludedcommercialParameters = ['FCC', 'commercial', 'FixeFCC', 'power_plant_name', 'InterestForeignQuarter', 'OutstandingPrincipleForeignQuarter', 'OutstandingPrincipleLocalQuarter', 'InterestLocalQuarter']
        if (!excludedcommercialParameters.includes(commercialParameter)) {

            results.push(commercialParameter)
        }

    })

    return results

}
module.exports.getCommercialParameters = getCommercialParameters






// exports.commercialParameters = {
//     VOM_Local: ['local_cpi'],
//     VOM_Foreign: ['dollar_rate', 'us_cpi'],
//     // WaterCharges: ['local_cpi'],
//     // LimeStoneCharges: ['local_cpi'],
//     // AshDisposalCost: ['local_cpi'],
//     //EscalableComponent: ['dollar_rate', 'us_cpi'],
//     //FOMLocal: ['local_cpi'],
//     // VariableRate: ['local_cpi'],
//     //NonEscalableComponentForeign: ['dollar_rate'],
//     //NonEscalableComponentLocal: [],
//     //FOMForeign: ['dollar_rate'],
//     //RepaymentRMB: ['dollar_rate'],
//     //FixedCostJetty: ['dollar_rate'],
//     //VariableCostJetty: ['dollar_rate'],
//     //IRSACharges: [],
//     //ROE: ['dollar_rate'],
//     //ROEDC: ['dollar_rate'],
//     //AnnualSecurityCost: ['dollar_rate'],
//     // Sinosure: ['dollar_rate', 'sinosure_fee'],
//     //DSRACost: [],
//     //ProceedFromCRES: [],
//     //Insurance: [],
//     //FixedCostOfWorkingCapital: ['kibor'],
//     //WHT: [],
//     //FixedFCC: [],
//     //FixedRate: [],
//     //InterestChargesForeign: ['libor'],
//     //interestChargesKibor:[],
//     // InterestRateRMB: ['dollar_rate'],


//     // InterestForeignAnnual:[],
//     // interestlocalannual:[]
// }
// VOM_Local',
// 'VOM_Foreign',
// 'WaterCharges',
// 'LimeStoneCharges',
// 'AshDisposalCost',
// 'EscalableComponent',
// 'NonEscalableComponentForeign',
// 'NonEscalableComponentLocal',
// 'FOMLocal',
// 'FOMForeign',
// 'Insurance',
// 'FixedCostOfWorkingCapital',
// 'ROE',
// 'ROEDC',
// 'ProceedFromCRES',
// 'WHT',
// 'DSRACost',
// 'FixedFCC',
// 'AnnualSecurityCost',
// 'Sinosure',
// 'InterestRateRMB',
// 'RepaymentRMB',
// 'IRSACharges',
// 'VariableRate',
// 'InterestForeignAnnual',
// 'InterestLocalAnnual',
// 'FixedCostJetty',
// 'VariableCostJetty',
// 'FixedRate',
// 'InterestChargesForeign'