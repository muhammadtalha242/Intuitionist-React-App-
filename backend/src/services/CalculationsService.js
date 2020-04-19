const FormulasService = require('./FormulasService')
module.exports = class CalculationService {
    constructor() {
        this.formulasService = new FormulasService()
    }

    getPlantsRefValue(assumptions, powerPlant, queryOutput) {
        var newOutputArray = []
        assumptions.forEach(assumption => {
            const allAssmptions = assumption[1]
            const assumptionDate = new Date(assumption[0])
            const plantCOD = new Date(powerPlant.economicparameter.cod)
            const refYear = this.formulasService.getRefYear(plantCOD, assumptionDate)
            queryOutput.forEach((pp) =>{
                const plant = pp.dataValues
                if(plant.year === refYear){
                    const newPlant = {...plant}
                    newPlant['assupmtions'] ={...allAssmptions}
                    console.log("newPLant", newPlant)
                    newOutputArray.push(newPlant)
                }
            })

        });

        
        return newOutputArray
    }
}