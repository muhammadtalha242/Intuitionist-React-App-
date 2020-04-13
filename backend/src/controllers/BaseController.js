const express = require('express');
const db = require('../config/dbConfig');
var baseController = express.Router();

baseController.get("/", all);
baseController.get("/:id", byId);
baseController.post("/", add);
baseController.patch("/:id", update);
baseController.delete("/:id", remove);



async function all(req, res) {
    var modelName = req.baseUrl.replace("/", "");
    console.log("path:", modelName);
    console.log("db:", db.prototype);
    var powerplants = await db.getModel(modelName).findAll();
    return res.status(200).send(powerplants);
}

async function byId(req, res) {
    var id = req.params.id;
    var modelName = req.baseUrl.replace("/", "");    
    var response = await db.getModel(modelName).findByPk(id);
    return res.status(200).send(response);
}

async function add(req, res) {
    var newModel = req.body;
    var modelName = req.baseUrl.replace("/", "");
    await db.getModel(modelName).create(newModel);
    return res.status(201).send(true);
}

async function update(req, res) {
    var id = req.params.id;
    var updatedModel = req.body;
    var modelName = req.baseUrl.replace("/", "");
    console.log("path:", modelName);
    var toUpdate = await db.getModel(modelName).findByPk(id);
    console.log("toUpdate: ",toUpdate);
    toUpdate.update(updatedModel);
    return res.status(200).send(toUpdate);
}

async function remove(req, res) {
    var id = req.params.id;
    var modelName = req.baseUrl.replace("/", "");
    var toRemove = await db.getModel(modelName).findByPk(id);
    toRemove.destroy();
    return res.status(202).send(true);
}

module.exports = baseController;