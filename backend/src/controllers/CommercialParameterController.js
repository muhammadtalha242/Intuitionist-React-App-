const express = require('express');
const db = require('../config/dbConfig');
var logger = require('../util/logger');
const CommercialParameterService  = require('../services/CommercialParameterService');
const BaseController = require('./BaseController');
module.exports = class CommercialParameterController extends BaseController {

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
    

    async getRefValues(req, res){
        console.log("in COntroller: calling getRefValues")
        let commpara = new CommercialParameterService()
        let modelName = req.baseUrl.replace("/", "");
        let collection = await commpara.getRefValues()
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
        
        router.get("/getRefValues", this.getRefValues);

        // router.get("/:id", byId);
        // router.post("/", add);
        // router.patch("/:id", update);
        // router.delete("/:id", remove);
        return router;
    }


}
