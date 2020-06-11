const moment = require("moment")

// const assumptionDate = moment("2020-01-01T00:00:00.000Z")
// const cod =	 moment("2013-11-01")
// 
// const cod2=	 moment("2013-10-01")

// console.log('cod.diff(assumptionDate, years); ', (assumptionDate.diff(cod,'years')) >=0? cod.diff(cod,'years')+1:0 );
// cod.diff(assumptionDate, 'years');

const assumptions = [
  [
    "2020-01-01T00:00:00.000Z",
    {
      "dollar_parity": "45",
      "us_cpi": "123",
      "local_cpi": "135",
      "kibor": "0",
      "libor": "0",
      "sinsoure_fee": "0"
    }
  ],
  [
    "2022-02-01T00:00:00.000Z",
    {
      "dollar_parity": "35",
      "us_cpi": "131",
      "local_cpi": "113",
      "kibor": "0",
      "libor": "0",
      "sinsoure_fee": "0"
    }
  ]
]


const x = require('./AllPlants_3Assumptions.json')
let filteredCollection = Object.fromEntries(x)
// filteredCollection = Object.values(filteredCollection)
Object.entries(filteredCollection).forEach(collection => {
  console.log(`plant year: ${collection}`)
  const collectionName = collection[0]

  Object.entries(collection[1]).forEach(plants => {
    const plant_name = plants[0]
    const plant = plants[1]
    console.log("plant===================>>>>s", plant)
    console.log(`plant_name: ${plant_name}`)
    console.log(`plant: ${plant}`)


    const plantYear = plant.years

    const cod = moment(plant.cod)
    // assumptions.forEach(assumption => {
    //   const assumptionDate = moment(assumption[0])
    //   console.log('plantYear === ((assumptionDate.diff(cod, years) + 1:', plantYear === ((assumptionDate.diff(cod, 'years') + 1)))
    //   if (plantYear === ((assumptionDate.diff(cod, 'years') + 1))) {
    //     console.log(`plant name: ${plant.plant_name}`)
    //     console.log(`plant year: ${plant.years}`)
    //     console.log(`plant cod: ${plant.cod}`)
    //     console.log(`assumption date: ${assumption[0]}`)
    //     console.log(`(assumptionDate.diff(cod, 'years') + 1): ${(assumptionDate.diff(cod, 'years') + 1)}`)

    //   }
    // })
    // console.log("filteredCollection.collectionName.plant_name: ", filteredCollection[collectionName][plant_name])

    
    console.log(InterestForeignAnnual(assumptions, plant))
  })
})

// const rates = []
// filteredCollection.powerplant.commercialparameters.forEach(cp => {
//   if (cp.commercial_parameter_name === 'interest_foreign_quarter' || cp.commercial_parameter_name === 'outstanding_principle_foreign_quarter') {
//     rates.push(cp)
//   }

// })

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

function InterestForeignAnnual(assumption, powerplant) {
  // interest_foreign_quarter
  // interest_local_quarter
  // outstanding_principle_foreign_quarter
  // outstanding_principle_local_quarter

  const allCommpara = groupBy(powerplant.commercialparameters,'commercial_parameter_name')
  const {interest_foreign_quarter,outstanding_principle_foreign_quarter } = allCommpara

  console.log("interest_foreign_quarter,outstanding_principle_foreign_quarter :", interest_foreign_quarter,outstanding_principle_foreign_quarter )

   
  var sum =interest_foreign_quarter.reduce((acc, commercialParameter, index) => {
  console.log('index:', index)     
    console.log(`commercialParameter.rate: ${commercialParameter.rate}`)
    const interest =
      commercialParameter.rate *
      (assumption.dollar_parity / powerplant.dollar_parity);
      console.log("outstanding_principle_foreign_quarter[index].rate: ",outstanding_principle_foreign_quarter[index])
      console.log(`outstanding_principle_foreign_quarter[index].rate: ${outstanding_principle_foreign_quarter[index].rate}`)
    
      const outstanding =
      outstanding_principle_foreign_quarter[index].rate * assumption.dollar_parity;
    const installed =
      (assumption.libor - powerplant.libor) /
      (powerplant.installed_capacity *
        powerplant.derated_capacity *
        8670 *
        1000);
        console.log(acc += interest + outstanding * installed)
    return acc += interest + outstanding * installed;
  },acc= 0);
  console.log(sum/4)
  return sum / 4;
}