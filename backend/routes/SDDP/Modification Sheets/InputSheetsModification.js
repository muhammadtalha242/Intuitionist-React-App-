

class InputModificationSheet {
    constructor(output) {
        this.output = output
    }


    getData() {
        console.log("Giving data away")
    }

    extractPlants(powerplants, fuel_category) {
        const dateArray = Object.keys(Object.values(this.output)[0]).reverse()

        const sepratedPowerPlants = []
        powerplants.forEach(plant => {

            if (plant.fuel_category === fuel_category) {

                var isCommissioned = true
                var isRetired = false
                dateArray.forEach(date => {
                    const currentDate = new Date(date)
                    const plant_cod = new Date(plant.cod)
                    const cod_difference = ((currentDate.getFullYear() - plant_cod.getFullYear()) * 12) + (currentDate.getMonth() - plant_cod.getMonth());
                    const end_difference = plant.end_year - currentDate.getFullYear();

                    if (cod_difference < 0) {
                        isCommissioned = false

                    }
                    else if (cod_difference >= 0 && !isCommissioned) {
                        isCommissioned = true
                        plant['change'] = 'com'
                        plant['change_date'] = date
                        if (!sepratedPowerPlants.includes(plant)) {
                            sepratedPowerPlants.push(plant)

                        }
                    }

                    if (end_difference <= 0) {

                        console.log(`Plant retired  ${plant.plant_name}, date:  ${date}`)
                        plant['change'] = 'ret'
                        plant['change_date'] = date
                        if (!sepratedPowerPlants.includes(plant)) {
                            sepratedPowerPlants.push(plant)

                        }
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
    getCvariables(powerplant) {
        const cvarArray = ["VOM_Local", "VOM_Foreign", "WaterCharges", "LimeStoneCharges", "AshDisposalCost", "VariableRate", "VariableCostJetty"]

        var sum = 0
        cvarArray.forEach(cvar => {

            const plantsArray = Object.values(this.output[cvar])[1][1]

            plantsArray.forEach(plant => {


                if (plant.name === powerplant.plant_name) {
                    var index = plant.index
                    if (fuel_categoryof(plant.index) === 'object' && (plant.index !== null)) {
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