const mapper = require('../config/mapperConfig');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("intuitionist_dev", "root", "Liverpool1", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 36,
    min: 0,
    // require: 3,
    acquire: 300000,
    idle: 100000,
  },
});


const db = {};


// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.powerplant = require('../../models/powerplant')(sequelize, Sequelize);
// db.commercialparameters = require('../../models/commercialparameters')(sequelize, Sequelize);

 db.getModel = function(path){
   var modelName = mapper.mapPath(path);
   var model = require(`../../models/${modelName}`)(sequelize, Sequelize);
   return model;
 }
function getModel(path){
   var modelName = mapper.mapPath(path);
   var model = require(`../../models/${modelName}`)(sequelize, Sequelize);
   return model;
 }


module.exports = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  getModel: getModel
};