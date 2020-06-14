const mapper = require('../config/mapperConfig');
const Sequelize = require("sequelize");
const logger = require("../util/logger");
//mysql://b7fa20857068cd:be8f54bf@us-cdbr-east-05.cleardb.net/heroku_baa5a0ae220b548?reconnect=true
//db : development_database
//db : intuitionist

const { CLEARDB_DATABASE_URL, NODE_ENV } = process.env;
let sequelize;
if (NODE_ENV === "production") {
    sequelize = new Sequelize(CLEARDB_DATABASE_URL);
} else {
    sequelize = new Sequelize("intuitionist", "root", "1234", {
        host: "localhost",
        dialect: "mysql",
        dialectOptions: {
            multipleStatements: true
        },
        pool: {
            max: 36,
            min: 0,
            acquire: 300000,
            idle: 100000,
        },
    });
}

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

// const mapper = require('../config/mapperConfig');
// const Sequelize = require("sequelize");
// const logger = require("../util/logger");
// //mysql://b7fa20857068cd:be8f54bf@us-cdbr-east-05.cleardb.net/heroku_baa5a0ae220b548?reconnect=true
// const sequelize = new Sequelize("heroku_baa5a0ae220b548", "b7fa20857068cd", "be8f54bf", {
   
// // const sequelize = new Sequelize("intuitionist_dev", "root", "Liverpool1", {
//   host: "us-cdbr-east-05.cleardb.net",
//   dialect: "mysql",
//   operatorsAliases: false,
//   dialectOptions: {
//     multipleStatements: true
//   },
//   pool: {
//     max: 36,
//     min: 0,
//     // require: 3,
//     acquire: 300000,
//     idle: 100000,
//   },
// });
// sequelize
//   .authenticate()
//   .then(() => logger.success("DB Connected", "YAYYY!!!"))
//   .catch((err) => logger.fail("DB Connection Failed", err));


// const db = {};

//  db.getModel = function(path){
//    var modelName = mapper.mapPath(path);
//    var model = require(`../../models/${modelName}`)(sequelize, Sequelize);
//    return model;
//  }
// function getModel(path){
//    var modelName = mapper.mapPath(path);
//    var model = require(`../../models/${modelName}`)(sequelize, Sequelize);
//    return model;
//  }


// module.exports = {
//   sequelize: sequelize,
//   Sequelize: Sequelize,
//   getModel: getModel
// };