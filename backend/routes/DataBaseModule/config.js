// const mysql = require('mysql');
const Sequelize = require('sequelize')
module.exports = new Sequelize("development_database", "root", "root", {
	host: "localhost",
	dialect: "mysql",
	operatorsAliases: false,

	pool: {
		max: 5,
		min: 0,
		require: 3,
		acquire: 30000,
		idle: 10000
	}
})
