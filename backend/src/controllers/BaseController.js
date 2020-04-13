const express = require('express');
const db = require('../config/dbConfig');
var baseController = express.Router();
var logger = require('../util/logger');
const maxItems = 100;
baseController.get("/", all);
baseController.get("/:id", byId);
baseController.post("/", add);
baseController.patch("/:id", update);
baseController.delete("/:id", remove);

async function all(req, res) {
    var page=1;
    logger.info("query.page",req.query.page);
    if (req.query.page) {
      page = parseInt(req.query.page);
      console.log("query.page>0", req.query.page);
    }
    var limit = maxItems;
    var offset = (page - 1) * maxItems;
    var modelName = req.baseUrl.replace("/", "");
    var collection = await db
      .getModel(modelName)
      .findAll({ limit: limit, offset: offset });
    if (collection.length<1) {
        logger.fail(`404 /${modelName}`,collection.length);
    }else{

        logger.success(
          `200 /${modelName}/all`,
          `[${collection.length}] Item(s)`
        );
    }
    return res.status(200).send(collection);
}

async function byId(req, res) {
    var id = req.params.id;
    var modelName = req.baseUrl.replace("/", "");    
    var response = await db.getModel(modelName).findByPk(id);
    if(response===null){
        logger.fail(`404 /${modelName}/byId:${id}`,response);
        return res.status(404).send(response);
    }
    logger.success(`200 /${modelName}/byId:${id}`, response);
    return res.status(200).send(response);
}

async function add(req, res) {
    try{
        var newModel = req.body;
        var modelName = req.baseUrl.replace("/", "");
        await db.getModel(modelName).create(newModel);
        logger.success(`200 /${modelName}/add`, newModel);
        return res.status(201).send(true);
    }
    catch(error){
        logger.fail(`400 /${modelName}/add`, error.errors[0].message);
        return res.status(400).send(fail);
    }
}

async function update(req, res) {
    try
    {
        var id = req.params.id;
        var updatedModel = req.body;
        var modelName = req.baseUrl.replace("/", "");
        console.log("path:", modelName);
        var toUpdate = await db.getModel(modelName).findByPk(id);
        console.log("toUpdate: ",toUpdate);
        toUpdate.update(updatedModel);
        logger.success(`200 /${modelName}/update:${id}`, toUpdate);
        return res.status(200).send(toUpdate); 
    } catch (error) {
        logger.fail(`400 /${modelName}/update:${id}`, error);
        return res.status(400).send(false);
    }
}

async function remove(req, res) {
    try {
      var id = req.params.id;
      var modelName = req.baseUrl.replace("/", "");
      var toRemove = await db.getModel(modelName).findByPk(id);
      toRemove.destroy();
      logger.success(`200 /${modelName}/remove:${id}`, toRemove);
      return res.status(202).send(true);
    } catch (error) {
      logger.fail(`400 /${modelName}/remove:${id}`, error);
      return res.status(400).send(false);
    }
}

module.exports = baseController;