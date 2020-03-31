const Sequelize = require('sequelize')
const db = require("../routes/DataBaseModule/config")

module.exports = db.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
