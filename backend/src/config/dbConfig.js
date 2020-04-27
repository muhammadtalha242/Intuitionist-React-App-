const mapper = require('../config/mapperConfig');
const Sequelize = require("sequelize");
const logger = require("../util/logger");

const sequelize = new Sequelize("development_database", "root", "root", {
  
// const sequelize = new Sequelize("intuitionist_dev", "root", "Liverpool1", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  dialectOptions: {
    multipleStatements: true
  },
  pool: {
    max: 36,
    min: 0,
    // require: 3,
    acquire: 300000,
    idle: 100000,
  },
});
sequelize
  .authenticate()
  .then(() => logger.success("DB Connected", "YAYYY!!!"))
  .catch((err) => logger.fail("DB Connection Failed", err));


const db = {};

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