
module.exports = class CalculationService {
  constructor() {
  }

  calculateA(parity, libor) {
    return parity * libor;
  }
  calculateB(parity, libor) {
    return parseFloat(parity) + parseFloat(libor);
  }
  calculateC(parity, libor) {
    return parity / libor;
  }
  getRefYear = (date_1, date_2) => {
    const difference = ((date_2.getFullYear() - date_1.getFullYear()) * 12) + (date_2.getMonth() - date_1.getMonth());
    var refYear =0
    if (difference < 0) {
      refYear = 0
    }
    else if ((difference => 0) && (difference < 12)) {
      refYear = 1
    }
    else if (difference => 12) {
      if (difference % 12 > 0) {
        refYear = Math.floor(difference / 12) + 1
      }
      else if (difference % 12 == 0) {
        refYear = Math.floor(difference / 12) + 1
      }
    }
    return refYear


  }

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

// let create = function(req, res) {
//   const response = BaseRepository.create(req, res);
//   return response;
// };

// let update = function(req, res) {
//   const response = BaseRepository.update(req, res);
//   return response;
// };

// let remove = function(req, res) {
//   const response = BaseRepository.remove(req, res);
//   return response;
// };

// module.exports = {
//   //   create: create,
//   get: get,
//   //   getById: getById,
//   //   update: update,
//   //   remove: remove
// };
