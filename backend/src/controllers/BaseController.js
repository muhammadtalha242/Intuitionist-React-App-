const express = require('express');
const db = require('../config/dbConfig');
var baseController = express.Router();
var logger = require('../util/logger');
const BaseService = require('../services/BaseService');

module.exports = class BaseController {

    constructor() {
    }
    middleware(req, res, next) {
        console.log("In middle ware")
        let baseService = new BaseService();
        req["baseService"] = Object.assign(baseService)
        req.modelName = req.baseUrl.replace("/", "");

        // console.log(res.local)
        next()
    }
    async all(req, res) {
        console.log("In the BASECONTROLLER");

        let modelName = req.modelName
        var page = 1;
        logger.info("query.page", req.query.page);
        if (req.query.page) {
            page = parseInt(req.query.page);

        }
        var collection = await req.baseService.get(modelName, page)
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


    async  byId(req, res) {


        var id = req.params.id;
        var modelName = req.modelName
        var response = await req.baseService.getById(modelName, id)
        if (response === null) {
            logger.fail(`404 /${modelName}/byId:${id}`, response);
            return res.status(404).send(response);
        }
        logger.success(`200 /${modelName}/byId:${id}`, response);
        return res.status(200).send(response);
    }
    async  add(req, res) {
        try {
            var newModel = req.body;
            var modelName = req.modelName

            await req.baseService.create(modelName, newModel);
            logger.success(`200 /${modelName}/add`, newModel);
            return res.status(201).send(true);
        }
        catch (error) {
            logger.fail(`400 /${modelName}/add`, error);
            return res.status(400).send(fail);
        }
    }
    async  update(req, res) {
    try {
        var id = req.params.id;
        var updatedModel = req.body;
        var modelName = req.modelName;
        console.log("path:", modelName);

        await req.baseService.update(modelName,id,updatedModel);
       
        logger.success(`200 /${modelName}/update:${id}`, updatedModel);
        return res.status(200).send(updatedModel);
    } catch (error) {
        logger.fail(`400 /${modelName}/update:${id}`, error);
        return res.status(400).send(false);
    }
}

async  remove(req, res) {
    try {
        var id = req.params.id;
        var modelName = req.modelName;
        var toRemove = await req.baseService.remove(modelName, id)
        logger.success(`200 /${modelName}/remove:${id}`, toRemove);
        return res.status(202).send(true);
    } catch (error) {
        logger.fail(`400 /${modelName}/remove:${id}`, error);
        return res.status(400).send(false);
    }
}


getRoutes() {
    let router = express.Router();
    router.get("/", this.middleware, this.all);
    router.get("/:id", this.middleware, this.byId);
    router.post("/", this.middleware, this.add);
    router.patch("/:id", this.middleware, this.update);
    router.delete("/:id", this.middleware, this.remove);
    return router;
}


}


// const maxItems = 100;

// baseController.get("/", all);
// baseController.get("/:id", byId);
// baseController.post("/", add);
// baseController.patch("/:id", update);
// baseController.delete("/:id", remove);


// async function all(req, res) {
//     var page = 1;
//     logger.info("query.page", req.query.page);
//     if (req.query.page) {
//         page = parseInt(req.query.page);

//     }
//     var modelName = req.baseUrl.replace("/", "");
//     var collection = await BaseService.get(modelName, page)
//     if (collection.length < 1) {
//         logger.fail(`404 /${modelName}`, collection.length);
//     } else {

//         logger.success(
//             `200 /${modelName}/all`,
//             `[${collection.length}] Item(s)`
//         );
//     }
//     return res.status(200).send(collection);
// }
// /*
// async function all(req, res) {
//     var page=1;
//     logger.info("query.page",req.query.page);
//     if (req.query.page) {
//       page = parseInt(req.query.page);

//     }
//     var limit = maxItems;
//     var offset = (page - 1) * maxItems;
//     var modelName = req.baseUrl.replace("/", "");
//     var collection = await BaseService.get(modelName,limit,offset)
//     if (collection.length<1) {
//         logger.fail(`404 /${modelName}`,collection.length);
//     }else{

//         logger.success(
//           `200 /${modelName}/all`,
//           `[${collection.length}] Item(s)`
//         );
//     }
//     return res.status(200).send(collection);
// }
// */
// 
// async function add(req, res) {
//     try {
//         var newModel = req.body;
//         var modelName = req.baseUrl.replace("/", "");
//         await db.getModel(modelName).create(newModel);
//         logger.success(`200 /${modelName}/add`, newModel);
//         return res.status(201).send(true);
//     }
//     catch (error) {
//         logger.fail(`400 /${modelName}/add`, error.errors[0].message);
//         return res.status(400).send(fail);
//     }
// }


// module.exports = baseController;
