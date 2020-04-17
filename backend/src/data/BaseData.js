const db = require('../config/dbConfig');
var logger = require('../util/logger');

let getAll = async function (modelName,limit,offset) {
   
    return await db
        .getModel(modelName)
        .findAll({ limit: limit, offset: offset });
    
};

// let getModelById = function (req, res) {
//     var id = req.params.id;
//     var modelName = req.baseUrl.replace("/", "");
//     var response = await db.getModel(modelName).findByPk(id);
//     if (response === null) {
//         logger.fail(`404 /${modelName}/byId:${id}`, response);
//         return res.status(404).send(response);
//     }
//     logger.success(`200 /${modelName}/byId:${id}`, response);
//     return res.status(200).send(response);
// };

// let createModel = function (req, res) {
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
// };

// let updateModel = function (req, res) {
//     try {
//         var id = req.params.id;
//         var updatedModel = req.body;
//         var modelName = req.baseUrl.replace("/", "");
//         console.log("path:", modelName);
//         var toUpdate = await db.getModel(modelName).findByPk(id);
//         // console.log("toUpdate: ",toUpdate);
//         toUpdate.update(updatedModel);
//         logger.success(`200 /${modelName}/update:${id}`, toUpdate);
//         return res.status(200).send(toUpdate);
//     } catch (error) {
//         logger.fail(`400 /${modelName}/update:${id}`, error);
//         return res.status(400).send(false);
//     }
// };

// let removeModel = function (id) {
//     try {
//         var id = req.params.id;
//         var modelName = req.baseUrl.replace("/", "");
//         var toRemove = await db.getModel(modelName).findByPk(id);
//         toRemove.destroy();
//         logger.success(`200 /${modelName}/remove:${id}`, toRemove);
//         return res.status(202).send(true);
//     } catch (error) {
//         logger.fail(`400 /${modelName}/remove:${id}`, error);
//         return res.status(400).send(false);
//     }
// };

module.exports={
    // create: createModel,
    get: getAll,
    // getById: getModelById,
    // update: updateModel,
    // remove: removeModel
};
