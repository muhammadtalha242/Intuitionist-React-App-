// const mysql = require('mysql');
const Sequelize = require('sequelize')
module.exports = new Sequelize("heroku_baa5a0ae220b548", "b7fa20857068cd", "be8f54bf", {
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
