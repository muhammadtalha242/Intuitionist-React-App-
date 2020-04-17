const baseData = require('../data/BaseData') 


let get = async function  (modelName,limit,offset) {
  const response = await baseData.get(modelName,limit,offset);
  return response;
};

// let getById = function(req, res) {
//   const response = baseData.getById(req, res);
//   return response;
// };

// let create = function(req, res) {
//   const response = baseData.create(req, res);
//   return response;
// };

// let update = function(req, res) {
//   const response = baseData.update(req, res);
//   return response;
// };

// let remove = function(req, res) {
//   const response = baseData.remove(req, res);
//   return response;
// };

module.exports = {
//   create: create,
  get: get,
//   getById: getById,
//   update: update,
//   remove: remove
};
