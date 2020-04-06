
const Sequelize = require('sequelize')
const db = require("../routes/DataBaseModule/config")

module.exports = db.define(
  'bus',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bus_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bus_code: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
