const express = require('express');
const db = require('../config/dbConfig');
const queries = require('../models/queries');


var powerplantController = express.Router();

powerplantController.get("/", all);
powerplantController.get("/:id", byId);
powerplantController.post("/", add);
powerplantController.patch("/:id", update);
powerplantController.delete("/:id", remove);


async function all(req, res) {
  var modelName = req.baseUrl.replace("/","");
  var powerplants = await db.getModel(modelName).findAll();
  return res.send(powerplants);
}

async function byId(req, res) {
  var id = req.params.id;
  var powerplants = await db.powerplant.findByPk(id);
  return res.send(powerplants);
}

async function add(req, res) {
  var newModel = req.body;
  await db.powerplant.create(newModel);
  return res.status(201).send(true);
}

async function update(req, res) {
  var id = req.params.id;
  var updatedModel = req.body;
  var powerplants = await db.powerplant.findByPk(id);
  powerplants.update(updatedModel);
  return res.send(powerplants);
}

async function remove(req, res) {
  var id = req.params.id;
  var powerplants = await db.powerplant.findByPk(id);
  powerplants.destroy();
  return res.status(202).send(true);
}



module.exports = powerplantController;