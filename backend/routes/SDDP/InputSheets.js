const Excel = require('./Excel')
const outputs = require('./SampleData/output+powerplants.json')

class InputSheets {
   

    getData() {
        console.log("Giving data away")
        return outputs
    }
    extractPlants(powerplants, type) {
       
        const sepratedPowerPlants = []
        powerplants.forEach(plant => {
            if (plant.fuel_category === type) {
                sepratedPowerPlants.push(plant)
            }
        })
        return sepratedPowerPlants
    }

    getTipo(powerplant) {
        const nameOfCommparams = Object.keys(outputs[0])
        const plantsArray = Object.values(outputs[0][nameOfCommparams[0]])[1][1]
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
    
            const plantsArray = Object.values(outputs[0][cvar])[1][1]
    
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
module.exports = InputSheets