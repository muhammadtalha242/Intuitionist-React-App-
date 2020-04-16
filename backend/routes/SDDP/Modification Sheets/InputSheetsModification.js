

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
                        plant['change_date'] = plant.cod
                        if (!sepratedPowerPlants.includes(plant)) {
                            sepratedPowerPlants.push(plant)

                        }
                    }

                    if (end_difference <= 0) {

                        plant['change'] = 'ret'
                        plant['change_date'] = `${plant.end_year}-01-01`
                        if (!sepratedPowerPlants.includes(plant)) {
                            sepratedPowerPlants.push(plant)

                        }
                    }

                })



            }

        })


        return sepratedPowerPlants
    }


    getCvariables(powerplant) {
        const cvarArray = ["VOM_Local", "VOM_Foreign", "WaterCharges", "LimeStoneCharges", "AshDisposalCost", "VariableRate", "VariableCostJetty"]

        var sum = 0
        cvarArray.forEach(cvar => {
            const dateArray = Object.keys(this.output[cvar]).reverse()

            dateArray.forEach(date => {

                const plantsArray = this.output[cvar][date][1]

                plantsArray.forEach(plant => {


                    if (plant.name === powerplant.plant_name) {
                        var index = plant.index
                        if (typeof(plant.index) === 'object' && (plant.index !== null)) {
                            index = index[0]["rate"]
                        }
                        sum = sum + index

                    }
                })
            })

        })
        return sum
    }

}
module.exports = InputModificationSheet