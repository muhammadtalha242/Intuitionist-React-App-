const filteredCollection = require('./plants copy.json')
const restructureOutput = (filteredCollection) => {
    var restructuredOutput = []
    var nameArray = false
    filteredCollection.forEach(collection => {
        var internalArray = false
        var updated = false

        console.log("STARTING COLLECTION====================================================== : ", collection.plant_name, collection.years)

        restructuredOutput.forEach(arr => {


            arr.forEach(plant => {
                if (plant.plant_name === collection.plant_name) {
                    console.log("plantName  exist in : ", collection.plant_name, collection.years)

                    nameArray = true

                    if (plant.years === collection.years) {
                        console.log("plantName and year exist in : ", plant.plant_name, plant.years)

                        plant.commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate })
                        updated = true
                    } else {
                        console.log("plantName exist in arr but not year: ", plant.plant_name, plant.years)

                        internalArray = true
                    }
                } else if (!updated && !internalArray) {
                    console.log("plant doesnot exist in arr: ", plant.plant_name, plant.years)
                    nameArray = false
                }

            })
            if (internalArray && !updated) {

                const powerplant = { ...collection }

                delete powerplant.commercial_parameter_name
                delete powerplant.paramCombineID
                delete powerplant.rate

                powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]
                console.log("PLANT ADDED IN INTERNAL ARRAY:", powerplant.plant_name, powerplant.years)
                internalArray = false
                arr.push(powerplant)


            }

        })
        if (!nameArray) {
            const powerplant = { ...collection }

            delete powerplant.commercial_parameter_name
            delete powerplant.paramCombineID
            delete powerplant.rate

            powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]
            console.log("PLANT ADDED IN EXTERNAL ARRAY:", powerplant.plant_name, powerplant.years)

            restructuredOutput.push([powerplant])
            nameArray = true
           

        }

    })
    console.log("restructuredOutput ", restructuredOutput)
    return restructuredOutput
}
const x = restructureOutput(filteredCollection)
console.log(x[3][0].plant_name)
console.log(x[3][0].years)
console.log(x[3][0].commercialparameters)