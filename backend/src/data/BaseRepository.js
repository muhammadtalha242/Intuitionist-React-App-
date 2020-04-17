const db = require('../config/dbConfig');
var logger = require('../util/logger');

module.exports = class BaseRepository {

    constructor() {
        this.maxItems = 2;
        this.db = db;
    }

    async get(modelName, page) {
        console.log("BaseRepo.Get");
        var limit = this.maxItems;
        var offset = (page - 1) * this.maxItems;
        var modelCollection = await db
            .getModel(modelName)
            .findAll({ limit: limit, offset: offset });
        return modelCollection;
    }

    // async getById(id) {
    //     var model = await db.getModel(this.model).findByPk(id);
    //     return model;
    // };

    // async add(newModel) {
    //     try {
    //         await db.getModel(this.model).create(newModel);
    //         return true;
    //     }
    //     catch (error) {
    //         logger.fail(`BaseRepository.add Failed`, error);
    //         return false;
    //     }
    // };

    // async update(id, updatedModel) {
    //     try {
    //         var toUpdate = await db.getModel(this.model).findByPk(id);
    //         toUpdate.update(updatedModel);
    //         return true;
    //     } catch (error) {
    //         logger.fail(`BaseRepository.update Failed`, error);
    //         return false;
    //     }
    // };

    // async remove(id) {
    //     try {
    //         var toRemove = await db.getModel(this.model).findByPk(id);
    //         toRemove.destroy();
    //         return true;
    //     } catch (error) {
    //         logger.fail(`BaseRepository.remove Failed`, error);
    //         return false;
    //     }
    // };
}

// var maxItems = 100;
// let get = async function (modelName, page) {

//     var limit = maxItems;
//     var offset = (page - 1) * maxItems;
//     var modelCollection = await db
//         .getModel(modelName)
//         .findAll({ limit: limit, offset: offset });
//     return modelCollection;
// };

// let getById = async function (modelName, id) {
//     var model = await db.getModel(modelName).findByPk(id);
//     return model;
// };

// let add = async function (modelName, newModel) {
//     try {
//         await db.getModel(modelName).create(newModel);
//         return true;
//     }
//     catch (error) {
//         logger.fail(`BaseRepository.add Failed`, error);
//         return false;
//     }
// };

// let update = async function (modelName, id, updatedModel) {
//     try {
//         var toUpdate = await db.getModel(modelName).findByPk(id);
//         toUpdate.update(updatedModel);
//         return true;
//     } catch (error) {
//         logger.fail(`BaseRepository.update Failed`, error);
//         return false;
//     }
// };

// let remove = async function (modelName, id) {
//     try {
//         var toRemove = await db.getModel(modelName).findByPk(id);
//         toRemove.destroy();
//         return true;
//     } catch (error) {
//         logger.fail(`BaseRepository.remove Failed`, error);
//         return false;
//     }
// };

// module.exports = {
//     add: add,
//     get: get,
//     getById: getById,
//     update: update,
//     remove: remove
// };
