const filteredCollection = [
    {
        "plant_name": "Alman",
        "cod": "2020-07-01",
        "commercial_parameter_name": "annual_security_cost",
        "years": 1,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "annual_security_cost",
        "years": 6,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "annual_security_cost",
        "years": 8,
        "rate": "0.0000"
    },
    {
        "plant_name": "Alman",
        "cod": "2020-07-01",
        "commercial_parameter_name": "ash_disposal_charges",
        "years": 1,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "ash_disposal_charges",
        "years": 6,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "ash_disposal_charges",
        "years": 8,
        "rate": "0.0000"
    },
    {
        "plant_name": "Alman",
        "cod": "2020-07-01",
        "commercial_parameter_name": "dsra_cost",
        "years": 1,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "dsra_cost",
        "years": 6,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "dsra_cost",
        "years": 8,
        "rate": "0.0000"
    },
    {
        "plant_name": "Alman",
        "cod": "2020-07-01",
        "commercial_parameter_name": "escalable_component",
        "years": 1,
        "rate": "0.0000"
    },
    {
        "plant_name": "3GorgesWFrm",
        "cod": "2013-11-01",
        "commercial_parameter_name": "escalable_component",
        "years": 6,
        "rate": "0.0000"
    }
]
const restructureOutput = (filteredCollection) => {
    var restructuredOutput = []
    var nameArray = false
    filteredCollection.forEach(collection => {
        var internalArray = false
        var externalAray = false
        var updated = false


        console.log("Collection Selected :", collection.plant_name, collection.years)

        restructuredOutput.forEach(arr => {

            console.log("INSIDE restructuredOutput ---------------------------> arr selected: :", arr.length)
            console.log('nameArray in :       ', nameArray)
            console.log('externalArray:       ', externalAray)
            console.log('internArray:       ', internalArray)

            arr.forEach(plant => {
                console.log("INSIDE arr ---------------------------> plant selected: :", plant.plant_name, plant.years)
                console.log('nameArray in :       ', nameArray)
                console.log('externalArray:       ', externalAray)
                console.log('internArray:       ', internalArray)
                console.log('plant.plant_name === collection.plant_name :', plant.plant_name === collection.plant_name)
                console.log('plant.years === collection.years:', plant.years === collection.years)
                if (plant.plant_name === collection.plant_name) {
                    console.log("plantName  exist in : ", collection.plant_name, collection.years)

                    nameArray = true

                    if (plant.years === collection.years) {
                        console.log("plantName and year exist in : ", collection.plant_name, collection.years)

                        plant.commercialparameters.push({ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate })
                        updated = true
                    } else {
                        console.log("plantName exist in arr but not year: ", collection.plant_name, collection.years)

                        internalArray = true
                    }
                } else if (!updated && !internalArray) {
                    console.log("plant doesnot exist in arr: ", collection.plant_name, collection.years)
                    nameArray = false
                }
                console.log("END arr ---------------------------> plant selected: :", plant.plant_name, plant.years)
                console.log('nameArray in :       ', nameArray)
                console.log('externalArray:       ', externalAray)
                console.log('internArray:       ', internalArray)

            })
            if (internalArray && !updated) {

                const powerplant = { ...collection }

                delete powerplant.commercial_parameter_name
                delete powerplant.paramCombineID
                delete powerplant.rate

                powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]
                console.log("PLANT ADDED IN INTERNAL ARRAY:", powerplant.plant_name, powerplant.years)

                arr.push(powerplant)


            }
            console.log("END restr ---------------------------> plant selected: :", arr.length)
            console.log('nameArray in :       ', nameArray)
            console.log('externalArray:       ', externalAray)
            console.log('internArray:       ', internalArray)

        })
        if (!nameArray) {
            const powerplant = { ...collection }

            delete powerplant.commercial_parameter_name
            delete powerplant.paramCombineID
            delete powerplant.rate

            powerplant.commercialparameters = [{ "commercial_parameter_name": collection.commercial_parameter_name, 'rate': collection.rate }]

            restructuredOutput.push([powerplant])
            console.log("PLANT ADDED IN EXTERNAL ARRAY:", powerplant.plant_name, powerplant.years)
            nameArray = true
            externalAray = true


        }
        console.log("END filtered ---------------------------> plant selected: :")
        console.log('nameArray in :       ', nameArray)
        console.log('externalArray:       ', externalAray)
        console.log('internArray:       ', internalArray)

    })
    console.log("restructuredOutput ", restructuredOutput)
    return restructuredOutput
}
restructureOutput(filteredCollection)
