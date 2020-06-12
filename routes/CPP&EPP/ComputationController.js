const express = require('express');
// const app = express();
const router = express.Router();
const Computations = require("./ComputationService")
// const Excel = require("./GenrateExcel")
// const Helper = require("./Helper")
const connection = require('../DataBaseModule/config');        //Data connection




router.post("/", async (req, res) => {

    const assumptions = req.body["assumption"]
    console.log(req.body)
    console.log("assumptions.length: ",assumptions.length)

    try{
        
        // console.log("commercialParameters: ",commercialParameters)


        const computationsModule =  new Computations(assumptions,commercialParameters)
        let powerplants =await computationsModule.getAllPowerPlantsFromDatabase(connection)
        
        powerplants = computationsModule.addRefYear(powerplants,assumptions)

    
    }
    catch(error) {
        console.log(error)
    }

    // res.send(powerplants)
})

module.exports = router