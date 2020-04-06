const commercialParameters = require("./CommercialParameters").commercialParameters


exports.getIndexValue = (commercialParameter, assumption, powerplant, rate) => {
    // const expectedAssumptions= commercialParameters[commercialParameter]
    // indexValues_3 =(assumption, ref_eco, ref_rate)
    // indexValues_5=(assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate)
    // indexValues_1=(ref_rate)

    if (commercialParameter == 'InterestForeignAnnual') {

        return InterestForeignAnnual(assumption, powerplant, rate)
    }
    else if (commercialParameter == 'InterestLocalAnnual') {
        return InterestLocalAnnual(assumption, powerplant, rate)
    }
    console.log("ref_rate = rate[0][]")
    const ref_rate = rate[0]["rate"]
    
    if (commercialParameter == 'VOM_Local') {
        return indexValues_3(assumption.dollar_parity, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'VOM_Foreign') {
        return indexValues_5(assumption.dollar_parity, powerplant.us_cpi, powerplant.dollar_parity, powerplant.us_cpi, ref_rate)
    }
    else if (commercialParameter == 'WaterCharges') {
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'LimeStoneCharges') {
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'AshDisposalCost') {
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'EscalableComponent') {
        return indexValues_5(assumption.dollar_parity, assumption.us_cpi, powerplant.dollar_parity, powerplant.us_cpi, ref_rate)
    }
    else if (commercialParameter == 'NonEscalableComponentForeign') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'NonEscalableComponentLocal') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'FOMLocal') {
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'FOMForeign') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'Sinosure') {

        return indexValues_5(assumption.sinsoure_fee, assumption.dollar_parity, powerplant.sinosure_fee, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'FixedRate') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'VariableRate') {
        return indexValues_3(assumption.local_cpi, powerplant.local_cpi, ref_rate)
    }
    else if (commercialParameter == 'RepaymentRMB') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }

    //CHECK
    else if (commercialParameter == 'InterestRateRMB') {
        return intersestRateRMB(assumption.dollar_parity, powerplant.dollar_parity)
    }
    else if (commercialParameter == 'FixedCostJetty') {
        return FixedCostJetty(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'VariableCostJetty') {
        return VariableCostJetty(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'FixedFCC') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'IRSACharges') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'Insurance') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'FixedCostOfWorkingCapital') {
        return indexValues_3(assumption.kibor, powerplant.kibor, ref_rate)
    }
    else if (commercialParameter == 'InterestChargesForeign') {
        return indexValues_3(assumption.libor, powerplant.libor, ref_rate)
    }
    else if (commercialParameter == 'ROE') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'ROEDC') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'WHT') {
        //(ROEDC + ROE) *0.075    
        const roe=indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
        const roedc=indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)   
        
        return ( roe+roedc ) * 0.075
    }
    else if (commercialParameter == 'AnnualSecurityCost') {
        return indexValues_3(assumption.dollar_parity, powerplant.dollar_parity, ref_rate)
    }
    else if (commercialParameter == 'ProceedFromCRES') {
        return indexValues_1(ref_rate)
    }
    else if (commercialParameter == 'DSRACost') {
        return indexValues_1(ref_rate)
    }
    else {
        console.log("NO match")
    }

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
    const value =(dollar_parity / Ref_dollar)
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

InterestForeignAnnual =(assumption, powerplant, ref_rate)=>{
    
    if(ref_rate.length != 4){
        return 0
    }
    var sum = 0
    ref_rate.forEach(rate=>{
       const interest= rate.interestforeignquarter_rate * (assumption.dollar_parity/powerplant.dollar_parity)
       const outstanding = rate.OutstandingPrincipleForeignQuarter_rate * assumption.dollar_parity
       const installed  =  (assumption.libor - powerplant.libor)/(powerplant.installed_capacity * powerplant.derated_capacity *8670*1000)
        sum = interest + (outstanding * installed)
    })

    return sum/4
}

InterestLocalAnnual=(assumption, powerplant, ref_rate)=>{
    if(ref_rate.length != 4){
        return 0
    }
    var sum = 0
    ref_rate.forEach(rate=>{
       const interest= rate.InterestLocalQuarter_rate
       const outstanding = rate.OutstandingPrincipleLocalQuarter_rate * assumption.dollar_parity
       
       /// CONFORM IT 
       const installed  =  (assumption.libor - powerplant.libor)/(powerplant.installed_capacity * powerplant.derated_capacity *8670*1000)
        /// GET IT CHECKED
       sum = interest + (outstanding * installed)

    })
    return sum/4
}