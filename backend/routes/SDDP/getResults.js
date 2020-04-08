const Sequelize = require("sequelize");
const connection = require('../DataBaseModule/config');        //Data connection
const StoreResults = require("../../models/simulation")(connection,Sequelize)

const express = require('express');
const router = express.Router();


router.get("/", (req,res)=>{
    const simulation_id=req.query.id
    console.log(simulation_id)
    StoreResults.findByPk(simulation_id).then(results=>{
        console.log(results.dataValues.results)
    })

})

module.exports = router