

class InputModificationSheet {
    constructor(output){
        this.output = output
    }


    getData() {
        console.log("Giving data away", )

        
    }
    extractPlants(powerplants, type) {
        const dateArray = Object.keys(Object.values(this.output)[0])

        const sepratedPowerPlants = []
        powerplants.forEach(plant => {

            if (plant.fuel_category === type) {
                console.log("plant in thermel")
                

                dateArray.forEach(date=>{
                    const currentDate = new Date(date)
                    const plant_cod = new Date(plant.cod)
                    const cod_difference =((currentDate.getFullYear() - plant_cod.getFullYear()) * 12) + (currentDate.getMonth() - plant_cod.getMonth());
                    const end_difference =  plant.end_year - currentDate.getFullYear() ;
                    if(cod_difference >0 && end_difference > 0 ) {
                        console.log('Plant not included ', plant.plant_name)
                        console.log('cod_difference: ',cod_difference,currentDate, plant_cod)
                        console.log('end_difference: ',end_difference)
                    }
                    else {
                        console.log('Plant included ',plant.plant_name)
                        console.log('cod_difference: ',cod_difference,currentDate, plant_cod)
                        console.log('end_difference: ',end_difference)
                        sepratedPowerPlants.push(plant)
                    }                   

                })
    


            }

        })
        

        return sepratedPowerPlants
    }

    getTipo(powerplant) {
        const plantsArray = Object.values(outputs[0]["VOM_Local"])[1][1]
        var tipo = null
        plantsArray.forEach(plant => {
            if (plant.name === powerplant.plant_name) {
                tipo = ((plant.year > 0) ? 0 : 1)
            }
        })
        return tipo
    }
    getCvariables  (powerplant)  {
        const cvarArray = ["VOM_Local", "VOM_Foreign", "WaterCharges", "LimeStoneCharges", "AshDisposalCost", "VariableRate", "VariableCostJetty"]
    
        var sum = 0
        cvarArray.forEach(cvar => {
    
            const commercialParameterArray = Object.values(this.output[cvar])
            
            plantsArray.forEach(plant => {
    
    
                if (plant.name === powerplant.plant_name) {
                    var index = plant.index
                    if (typeof (plant.index) === 'object' && (plant.index !== null)) {
                        index = index[0]["rate"]
                    }
                    sum = sum + index
    
                }
            })
    
        })
        return sum
    }
    
}
module.exports = InputModificationSheet