const express = require('express');
const db = require('../config/dbConfig');
var logger = require('../util/logger');
const PowerPlantService  = require('../services/PowerPlantService');
const BaseController = require('./BaseController');
module.exports = class PowerPlantController extends BaseController {

    constructor(){
        super();
    }

    // middleware(req, res, next) {
    //     console.log("In middle ware")
        
    //     req["ppService"] = Object.assign(ppService)
    //     req.modelName = 
    //     // console.log(res.local)
    //     next()
    // }
    async allWithIncludes(req, res) {
        console.log("PPCONTROLLER");
        let ppService = new PowerPlantService();
        var page = 1;
        logger.info("query.page", req.query.page);
        if (req.query.page) {
            page = parseInt(req.query.page);

        }
        var modelName = req.baseUrl.replace("/", "");
        var collection = await ppService.getWithIncludes(modelName, page)
        if (collection.length < 1) {
            logger.fail(`404 /${modelName}`, collection.length);
        } else {

            logger.success(
                `200 /${modelName}/all`,
                `[${collection.length}] Item(s)`
            );
        }
        return res.status(200).send(collection);
    }

    async getRefValues(req, res){
        console.log("in COntroller: calling getRefValues")
        let modelName = req.modelName
        let collection = await req.ppService.getRefValues()
        console.log("in COntroller: called getRefValues")
        if (collection.length < 1) {
            logger.fail(`404 /${modelName}`, collection.length);
        } else {

            logger.success(
                `200 /${modelName}/all`,
                `[${collection.length}] Item(s)`
            );
        }
        return res.status(200).send(collection);
    }
    getRoutes() {
        console.log("PPROUTES");
        let router = express.Router();
        router.get("/", this.all);
        router.get("/childs/all", this.allWithIncludes);
        router.get("/childs/getRefValues", this.getRefValues);

        // router.get("/:id", byId);
        // router.post("/", add);
        // router.patch("/:id", update);
        // router.delete("/:id", remove);
        return router;
    }


}