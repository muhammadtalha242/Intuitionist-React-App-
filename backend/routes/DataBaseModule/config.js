// const mysql = require('mysql');
const Sequelize = require('sequelize')
module.exports = new Sequelize("intuitionist_dev", "root", "Liverpool1", {
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
