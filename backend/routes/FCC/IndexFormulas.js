
exports.getIndexValue = (fuelType, assumption, powerplant, rate) => {
    // const expectedAssumptions= fuelTypes[fuelType]
    // genralFuelFormula =(assumption, ref_eco, ref_rate)
    // indexValues_5=(assumption_1, assumption_2, ref_eco_1, ref_eco_2, ref_rate)
    // indexValues_1=(ref_rate)
    rate = rate[0]["rate"]

    if (fuelType == 'RFO') {

        return genralFuelFormula(assumption.rof, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == "RLNG") {
        return genralFuelFormula(assumption.rlng, powerplant.ref_fuel_cost, rate)
    }
    
    else if (fuelType == "Gas") {
        return genralFuelFormula(assumption.gas, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'HSD') {
        return genralFuelFormula(assumption.hsd, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Baggase') {
        return genralFuelFormula(assumption.baggase, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Nuclear') {
        return genralFuelFormula(assumption.nuclear, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Liberty_1') {
        return genralFuelFormula(assumption.liberty_1, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Uch_1') {
        return genralFuelFormula(assumption.uch_1, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'RLNG(New)') {
        return genralFuelFormula(assumption.rlng_new, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Import (IRAN)') {
        return genralFuelFormula(assumption.imported_iran, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Mix(Cap)') {
        return genralFuelFormula(assumption.mix_cap, powerplant.ref_fuel_cost, rate)
    }
    else if (fuelType == 'Thar Coal') {
        return tharCoal(assumption.thar_coal,assumption.local_coal, powerplant.heat_rate_FL,powerplant.ref_fuel_cost, rate)
    }
    
    else {
        console.log("fuel_type: ", fuelType)
        return 0
    }

    // return index_value

}

exports.getIndexValueByPlant=(fuelType, assumption, powerplant)=>{
    if(powerplant == 'PORT_QASIM' ||   powerplant == 'HUBCO_CPIH_1'){
        return indexValueByPlant(new_tharCoalPrice, localCoalCalValue,   heatAtfullRate, fuel_cost)
    }
    else if(powerplant == 'HUANENG_ENRG'){
        return indexValueByPlant_huanege(new_tharCoalPrice, localCoalCalValue,   heatAtfullRate, fuel_cost)
    }
}

indexValueByPlant=(new_tharCoalPrice, localCoalCalValue,   heatAtfullRate, fuel_cost)=>{
        return 0
}
indexValueByPlant_huanege=(new_tharCoalPrice, localCoalCalValue,   heatAtfullRate, fuel_cost)=>{
    return 0
}




//Formula for variables with 3 parameters
genralFuelFormula = (assumption, fuel_cost, ref_rate) => {
    const value = (assumption / fuel_cost) * ref_rate;

    return value
}

//Formula for variables with 5 parameters
tharCoal = (new_tharCoalPrice, localCoalCalValue,   heatAtfullRate, fuel_cost, ref_rate) => {

    const value = ((new_tharCoalPrice * heatAtfullRate) * (localCoalCalValue / fuel_cost) * (ref_rate));
    
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