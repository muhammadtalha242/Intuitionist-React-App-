const BaseRepository = require('../data/BaseRepository')
const PowerPlantRepository = require('../data/PowerPlantRepository')

module.exports = class BaseService {
    constructor() {
        this.baseRepo = new BaseRepository();
    }
    async get(modelName, page) {
        console.log("BASESERVICE");
        return this.baseRepo.get(modelName, page);
    }


    async getById(modelName, id) {
        const response = this.baseRepo.getById(modelName, id);
        return response;
    };

    async create(modelName, newModel) {
        const response = this.baseRepo.create(modelName, newModel);
        return response;
    };
    async update (modelName, id , updatedModel) {
          const response = this.baseRepo.update(modelName, id , updatedModel);
          return response;
        };
        
    async remove (modelName, id) {
          const response = this.baseRepo.remove(modelName, id);
          return response;
        };
        

}


// let pp = new PowerPlantRepository();
// console.log(pp.get(1));


// let get = async function (modelName, page) {
//   let baseRepo = new BaseRepository(modelName);
//   const response = await baseRepo.get(page);
//   return response;
// };

// let getById = function(req, res) {
//   const response = BaseRepository.getById(req, res);
//   return response;
// };


// 
// module.exports = {
//   //   create: create,
//   get: get,
//   //   getById: getById,
//   //   update: update,
//   //   remove: remove
// };
