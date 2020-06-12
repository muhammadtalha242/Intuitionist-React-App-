const db = require('../config/dbConfig');
var logger = require('../util/logger');

module.exports = class BaseRepository {

    constructor() {
        this.maxItems = 100;
        this.db = db;
    }

    async get(modelName, page) {
        console.log("BaseRepo.Get");
        var limit = this.maxItems;
        var offset = (page - 1) * this.maxItems;
        var modelCollection = await db
            .getModel(modelName)
            .findAll();
        return modelCollection;
    }

    async getById(modelName, id) {
        var model = await db.getModel(modelName).findByPk(id);
        return model;
    };

    async create(modelName,newModel) {
        try {
            await db.getModel(modelName).create(newModel);
            return true;
        }
        catch (error) {
            logger.fail(`BaseRepository.add Failed`, error);
            return false;
        }
    };

    async update(modelName, id, updatedModel) {
        try {
            var toUpdate = await db.getModel(modelName).findByPk(id);
            toUpdate.update(updatedModel);
            return true;
        } catch (error) {
            logger.fail(`BaseRepository.update Failed`, error);
            return false;
        }
    };

    async remove(modelName,id) {
        try {
            var toRemove = await db.getModel(modelName).findByPk(id);
            toRemove.destroy();
            return true;
        } catch (error) {
            logger.fail(`BaseRepository.remove Failed`, error);
            return false;
        }
    };
}
