restructureOutput(filteredCollection) {
    var restructuredOutput = [];
    filteredCollection.forEach(collection => {
        const plant_name = collection.plant_name
        const years = collection.years
        const plantYear = `${plant_name}+${years}`
        // console.log('plantYear: ', plantYear)
        if (plant_name in restructuredOutput) {
            
            if (plantYear in restructuredOutput[plant_name]) {
                // console.log('Third Step',restructuredOutput[plant_name])
                restructuredOutput[plant_name][plantYear].push({ "commercial_parameter_name": collection.commercial_parameter_name, "rate": collection.rate })
            }
            else {
                const p = {...collection}

                p.commercialparameters = [
                    {
                        commercial_parameter_name: collection.commercial_parameter_name,
                        rate: collection.rate,
                    },
                ];
                restructuredOutput[plant_name][plantYear] = p.commercialparameters
                // console.log('second STEP,restructuredOutput[plant_name][plantYear]:   ' , restructuredOutput)
            }
        }
        else {
            // restructuredOutput[plant_name] = {}
            // console.log('FIRST STEP pre =>   ' , restructuredOutput)
            const powerplant = { ...collection };
            delete powerplant.commercial_parameter_name;
            delete powerplant.paramCombineID;
            delete powerplant.rate;

            restructuredOutput[plant_name] = powerplant
            // console.log('FIRST STEP pre => ' , restructuredOutput)
            // console.log('FIRST STEP post => ' , restructuredOutput)

        }

    })

    return restructuredOutput
}